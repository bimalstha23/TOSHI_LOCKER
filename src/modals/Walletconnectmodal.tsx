import {
    Avatar,
    Box,
    Dialog,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    Typography,
} from "@mui/material";

// import strings from "../../utils/strings";
import { connectMetaMask, connectWallet, defiConnect } from "../wallet";
import { defiWallet, metaMask, walletConnect } from "../wallet/provider";

import { AiOutlineClose } from "react-icons/ai";
// import { useWeb3React } from "@web3-react/core";
import { NetworkContextType } from "../provider/NetworkProvider";
import useNetwork from "../hooks/useNetwork";
import metamaskicon from '../assets/icons/wallet/meta.svg'
import walletconnecticon from '../assets/icons/wallet/walletconnect.svg'

const WalletConnectModal = ({
    openModal,
    handleCloseModal,
}: {
    openModal: boolean;
    handleCloseModal: () => void;
}) => {
    const { setWalletType, network, setChain } =
        useNetwork() as NetworkContextType;
    // const { provider, account } = useWeb3React();

    const handleChooseWallet = async (type: string) => {
        if (!network?.chainId) return;
        try {
            switch (type) {
                case "metamask":
                    await connectMetaMask(
                        metaMask,
                        setWalletType,
                        setChain,
                        undefined,
                        network.chainId
                    );

                    break;
                case "defi wallet":
                    await defiConnect(
                        defiWallet,
                        setWalletType,
                        setChain,
                        undefined,
                        network.chainId
                    );
                    break;

                case "wallet connect":
                    await connectWallet(
                        walletConnect,
                        setWalletType,
                        setChain,
                        undefined,
                        network.chainId
                    );
                    break;

                default:
                    console.log("default case");
            }
        } catch (e) {
            console.log({ error: e });
        } finally {
            handleCloseModal();
        }
    };

    return (
        <Dialog open={openModal} className="!font-outfit" onClose={handleCloseModal}
            sx={{
                fontFamily: "Outfit, sans-serif",
            }}

        >
            <DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleCloseModal}
                    sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    {/*<CloseIcon/>*/}
                    <AiOutlineClose />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <Typography
                    variant="h3"
                    component="div"
                    sx={{ color: "text.primary" }}
                    align="center"
                >
                    Connect your wallet
                </Typography>
                <Box component="div" sx={{ maxWidth: 350, m: "auto" }}>
                    <Grid container spacing={2} sx={{ my: 4 }}>
                        <Grid item xs={12} sx={{ pt: "8px !important" }}>
                            <button
                                className="primary-button-2-copy  w-full flex justify-center items-center gap-7"
                                onClick={() => {
                                    handleChooseWallet("metamask");
                                }}
                            >
                                <Avatar
                                    alt="metamask"
                                    src={metamaskicon}
                                    sx={{
                                        width: 24,
                                        height: 24,
                                        backgroundColor: "white",
                                        p: "5px",
                                    }}
                                />
                                MetaMask
                            </button>
                        </Grid>

                        <Grid item xs={12} sx={{ pt: "8px !important" }}>
                            <button
                                className="primary-button-2-copy  w-full flex justify-center items-center gap-7"

                                onClick={() => {
                                    handleChooseWallet("wallet connect");
                                }}
                            >
                                <Avatar
                                    alt="walletconnect"
                                    src={walletconnecticon}
                                    sx={{
                                        width: 24,
                                        height: 24,
                                        backgroundColor: "white",
                                        p: "5px",
                                    }}
                                />
                                Wallet Connect
                            </button>
                        </Grid>
                    </Grid>
                </Box>

                {/* <Typography
                    variant="caption"
                    display="block"
                    sx={{ color: "text.secondary" }}
                    gutterBottom
                    align="center"
                >
                    {strings.connect_dialog_note}
                </Typography> */}
            </DialogContent>
        </Dialog>
    );
};

export default WalletConnectModal;
