import { useWeb3React } from '@web3-react/core';
import { BigNumber, ethers } from 'ethers';
import React, { createContext, useEffect, useState } from 'react';
import { connectMetaMask, connectWallet, defiConnect, } from '../wallet';
import { Network, networkConfig, NetworkType } from '../config/networkconfig';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { BASE, BASEGOERLI } from '../utils/constant';
import { defiWallet, metaMask, walletConnect } from '../wallet/provider';

type setType = (value: (string | ((val: (string | undefined)) => (string | undefined)) | undefined)) => void
export type NetworkContextType = {
    walletType: string | undefined,
    balance: string,
    getBalance: (account: string) => void,
    network: NetworkType | null | undefined,
    setNetwork: React.Dispatch<React.SetStateAction<NetworkType | null | undefined>>,
    handleWalletProvider: (walletType: string) => void,
    chain: string | undefined,
    setChain: setType,
    setWalletType: setType
};
export const NetworkContext = createContext<NetworkContextType | null>(null);


export const NetworkContextProvider = (props: any) => {
    const { account, chainId, provider } = useWeb3React();
    const [chain, setChain] = useLocalStorage<string | undefined>('chain', undefined);
    const initialNetwork = (): NetworkType | null | undefined => {
        if (!chain) {
            return networkConfig[BASE]; //default network
        } else if (chain == Network.BaseGoerli) {
            return networkConfig[BASEGOERLI]
        }
        else if (chain == Network.Base) {
            return networkConfig[BASE]
        }
    };

    const [balance, setBalance] = useState('');


    const [network, setNetwork] = useState(initialNetwork);

    const [walletType, setWalletType] = useLocalStorage<string | undefined>('walletType', undefined);

    const getBalance = (account: string) => {
        if (account) {
            // const provider_ = new ethers.providers.Web3Provider(
            //     provider?.provider??,
            //     'any'
            // );
            const provider = new ethers.providers.JsonRpcProvider(network?.rpcUrl)
            provider
                .getBalance(account)
                .then((balance: BigNumber) => {
                    const balaceFromAccount = parseFloat(
                        ethers.utils.formatEther(balance)
                    ).toFixed(2);
                    setBalance(balaceFromAccount);
                })
                .catch((e: any) => {
                    // await handleDisconnect(setWalletType, connector);
                    console.log({ error: e });
                });
        }
    }

    const setMetamaskProvider = async () => {
        try {
            if (!network) return
            await connectMetaMask(
                metaMask,
                setWalletType,
                setChain,
                undefined,
                network.chainId
            );
        } catch (e) {
            // toast({
            //     title: 'Error on Metamask wallet connection',
            //     description: e?.message ?? e.toString(),
            //     status: 'error',
            //     position: 'top-right',
            //     isClosable: true,
            //     duration: null,
            // });
            console.log({ error: e })
        }
    };
    const setDefiBrowserProvider = async () => {
        try {
            if (!network) return
            await defiConnect(defiWallet, setWalletType, setChain, undefined, network.chainId);
        } catch (e) {
            // toast({
            //     title: 'Error on Defi wallet connection',
            //     description: e?.message ?? e.toString(),
            //     status: 'error',
            //     position: 'top-right',
            //     isClosable: true,
            //     duration: null,
            // });
            console.log({ error: e });
        }
    };

    const setWalletConnectProvider = async () => {
        try {
            if (!network) return
            await connectWallet(
                walletConnect,
                setWalletType,
                setChain,
                undefined,
                network.chainId
            );
        } catch (e) {
            // toast({
            //     title: 'Error on Metamask wallet connection',
            //     description: e?.message ?? e.toString(),
            //     status: 'error',
            //     position: 'top-right',
            //     isClosable: true,
            //     duration: null,
            // });
            console.log({ error: e });
        }
    };

    const handleWalletProvider = async (walletType: string) => {
        switch (walletType) {
            case 'metamask':
                await setMetamaskProvider();
                break;
            case 'defi-browser':
                await setDefiBrowserProvider();
                break;
            case 'wallet-connect':
                await setWalletConnectProvider();
                break;
            default:
                console.log('default')
        }
    };

    useEffect(() => {
        if (network) {
            if (network.chainId === BASE) {
                localStorage.setItem('chain', Network.Base);
                setChain(Network.Base)
            } else if (network.chainId === BASEGOERLI) {
                localStorage.setItem('chain', Network.BaseGoerli);
                setChain(Network.BaseGoerli)
            }
        } else {
            localStorage.setItem('chain', Network.unsupportedChain);
        }
    }, [network]);

    useEffect(() => {
        if (chainId) {
            setNetwork(networkConfig[chainId]);
        }
    }, [chainId]);

    useEffect(() => {
        if (account && network && provider) {
            getBalance(account);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [account, network, provider]);

    useEffect(() => {
        if (walletType) {
            handleWalletProvider(walletType);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [walletType, network]);

    return (
        <NetworkContext.Provider
            value={{
                walletType,
                balance,
                getBalance,
                network,
                setNetwork,
                handleWalletProvider,
                chain,
                setChain,
                setWalletType,

            }}
        >
            {props.children}
        </NetworkContext.Provider>
    );
};
