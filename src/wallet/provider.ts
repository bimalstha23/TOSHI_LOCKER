import {initializeConnector} from '@web3-react/core';
import {MetaMask} from '@web3-react/metamask';
import {WalletConnect} from '@web3-react/walletconnect';
import {DeFiWeb3Connector} from '@deficonnect/web3-connector';
import {EIP1193} from '@web3-react/eip1193';
import { networkConfig } from '../config/networkconfig';

export const [metaMask, metaMaskHooks] = initializeConnector(
    (actions) =>
        new MetaMask({
            actions,
            onError: (error) => {
                console.log({error});
            },
            options: {
                mustBeMetaMask: true,
            },
        })
);

export const [defiWallet, defiWalletHook] = initializeConnector((actions) => {
    return new EIP1193({
        actions,
        onError: (err) => console.log({err}),
        provider: new DeFiWeb3Connector({
            appName: 'Cronos Duels',
            chainType: 'cronos',
            chainId: '25',
            rpcUrls: {
                8453: networkConfig[8453].rpcUrl,
            },
        }).provider,
    });
});

export const [walletConnect, walletConnectHooks] = initializeConnector(
    (actions) =>
        new WalletConnect({
            actions,
            options: {
                rpc: {
                    8453: networkConfig[8453].rpcUrl,
                   
                }
            },
        })
);