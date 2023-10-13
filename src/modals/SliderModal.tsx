import { Dialog, Slide, Slider, styled } from "@mui/material"
import { TransitionProps } from "@mui/material/transitions";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { FC, forwardRef, useState } from "react"
import abi from "../config/abi";
import { enqueueSnackbar } from "notistack";

interface SliderModalProps {
    open: boolean
    onClose: () => void
}
const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const PrettoSlider = styled(Slider)({
    color: '#EEF1F4',
    height: 8,
    '& .MuiSlider-track': {
        border: 'none',
    },
    '& .MuiSlider-thumb': {
        height: 24,
        width: 24,
        backgroundColor: 'fff',
        border: '4px solid #545F71',
        '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
            boxShadow: 'inherit',
        },
        '&:before': {
            display: 'none',
        },
    },
    '& .MuiSlider-valueLabel': {
        lineHeight: 1.2,
        fontSize: 12,
        background: 'unset',
        padding: 0,
        width: 32,
        height: 32,
        borderRadius: '50% 50% 50% 0',
        backgroundColor: '#545F71',
        transformOrigin: 'bottom left',
        transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
        '&:before': { display: 'none' },
        '&.MuiSlider-valueLabelOpen': {
            transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
        },
        '& > *': {
            transform: 'rotate(45deg)',
        },
    },
});


const SliderModal: FC<SliderModalProps> = ({ open, onClose }) => {
    const [amount, setAmount] = useState(1)
    const [loading, setLoading] = useState(false)
    const { account, provider } = useWeb3React();

    const handleMint = async () => {
        setLoading(true)
        if (account && provider && amount > 0) {
            try {
                const signer = provider.getSigner()
                const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS
                if (!contractAddress) return
                const contract = new ethers.Contract(contractAddress, abi, signer)
                const amountBigNumber = ethers.BigNumber.from(amount)
                const tx = await contract.mint(amountBigNumber)
                await tx.wait()
                enqueueSnackbar('Minted Successfully', { variant: 'success' })
            } catch (e: any) {
                enqueueSnackbar(e.reason, { variant: 'error' })
                console.log({ error: e.reason }, 'error minting ')
            }
        }
        setLoading(false)
    }
    return (
        <Dialog
            open={open}
            onClose={() => {
                if (!loading) {
                    onClose()
                }
            }}
            TransitionComponent={Transition}
            keepMounted
            fullWidth
            sx={{
                padding: '15px !important',
                width: '100%',
                '& .MuiDialog-paper': {
                    width: '100%',
                    border: '10px solid #121212',
                    borderRadius: '16px',
                }
            }}
        >
            <div className="flex flex-col p-5 w-full gap-5">
                <div className="flex flex-col gap-3">
                    <h1 className="text-black text-3xl font-extrabold">{"Select Number Of NFTOSHIS"}</h1>
                    <h1 className="text-[#545F71] text-xl">
                        Please Select The Number Of NFTs.
                    </h1>
                </div>
                <div className="flex flex-row justify-center items-center gap-6 w-full">
                    <PrettoSlider
                        valueLabelFormat={(x) => x}
                        onChange={(_e, value) => setAmount(value as number)}
                        valueLabelDisplay="auto"
                        aria-label="pretto slider"
                        defaultValue={1}
                        min={0}
                        max={3}
                    />
                    <h1 className="font-extrabold text-3xl text-[#545F71]">{amount}</h1>
                </div>
                <div className="flex flex-row justify-center items-center gap-[16px]">
                    <button onClick={() => onClose()} className="w-full bg-[#0050FE] p-[16px] text-white text-2xl font-bold rounded-[6px]">
                        Cancel
                    </button>
                    <button onClick={() => handleMint()} className="w-full bg-[#FE4C24] p-[16px] text-white text-2xl font-bold rounded-[6px]">
                        Looks Good ✔
                    </button>
                </div>
            </div>
        </Dialog >
    )
}

export default SliderModal