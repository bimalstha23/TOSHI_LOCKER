// import { checkBlacklist } from '../../utils/checkBlacklist';
type setType = (value: (string | ((val: (string | undefined)) => (string | undefined)) | undefined)) => void
export const handleDisconnect = async (setWalletType: setType, connector: any, setChain: setType) => {
    try {
        setWalletType(undefined);
        setChain(undefined);
        if (connector) {
            await connector.resetState();
        }
    } catch (error) {
        console.log({ error });
    }
};

export const connectMetaMask = async (
    metaMask: any,
    setWalletType: setType,
    setChain: setType,
    _navigate: any,
    chainId: number
) => {
    try {
        await metaMask.activate(chainId);
        setWalletType('metamask');
    } catch (e) {
        await handleDisconnect(setWalletType, metaMask, setChain);
        throw e;
    }
};

export const connectWallet = async (
    walletConnect: any,
    setWalletType: setType,
    setChain: setType,
    _navigate: any,
    chainId: number
) => {
    try {
        await walletConnect.activate(chainId);
        setWalletType('wallet-connect');
    } catch (e) {
        await handleDisconnect(setWalletType, walletConnect, setChain);
        throw e;
    }
};

export const defiConnect = async (
    defiWallet: any,
    setWalletType: setType,
    setChain: setType,
    _navigate: any,
    chainId: number
) => {
    try {
        await defiWallet.activate(chainId);
        setWalletType('defi-browser');
    } catch (e) {
        console.log('defi error', { e });
        await handleDisconnect(setWalletType, defiWallet, setChain);
        throw e;
    }
};
