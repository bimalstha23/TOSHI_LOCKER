export interface NetworkType {
    chainId: number;
    rpcUrl: string;
    baseApiUrl: string;
    baseExplorerUrl: string;
    connectInfo: {
        chainId: string;
        chainName: string;
        rpcUrls: string[];
        blockExplorerUrls: string[];
        nativeCurrency: {
            symbol: string; // 2-6 characters long
            decimals: number;
        };
    };
    multisendercontractAddress?: string;
    lockercontractAddress?: string;
}

export const networkConfig: { [key: string]: NetworkType } = {
    8453: {
        chainId: 8453,
        rpcUrl: 'https://base.meowrpc.com	',
        baseApiUrl: 'https://base.meowrpc.com',
        baseExplorerUrl: 'https://base.meowrpc.com',
        connectInfo: {
            chainId: '0x2103',
            chainName: 'Base',
            rpcUrls: ['https://base.meowrpc.com'],
            blockExplorerUrls: ['https://base.meowrpc.com'],
            nativeCurrency: {
                symbol: 'BASE',
                decimals: 18,
            },
        },
    },
    84531: {
        chainId: 84531,
        rpcUrl: 'https://base-goerli.blockpi.network/v1/rpc/public',
        baseApiUrl: 'https://moonbase.unitedbloc.com',
        baseExplorerUrl: 'https://moonbase.unitedbloc.com',
        connectInfo: {
            chainId: '0x2103',
            chainName: 'GOERLI',
            rpcUrls: ['https://base-goerli.blockpi.network/v1/rpc/public, https://goerli.base.org	'],
            blockExplorerUrls: ['https://moonbase.unitedbloc.com'],
            nativeCurrency: {
                symbol: 'BASE GOERLI',
                decimals: 18,
            },
        },
        multisendercontractAddress: "0xB8b1da5249da164982805E21CC8cCD27C98Ae36C",
        lockercontractAddress: "0x1eBbfE6248c81AbCCAAE93980Df1d5DD3a305324"
    }

};


export const Network = {
    Base: 'Base',
    unsupportedChain: "Unsupported Chain",
    BaseGoerli: 'Base Goerli',
};
