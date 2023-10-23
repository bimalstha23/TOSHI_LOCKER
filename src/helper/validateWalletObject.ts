// import { enqueueSnackbar } from "notistack";


export const valudateWalletObject = (walletObject: {
    address: string;
    amount: string;
}[]) => {
    if (walletObject.length <= 0) {
        // enqueueSnackbar(`please enter the csv or upload csv file from your computer`, { variant: 'error' });
        throw new Error(`please enter the csv or upload csv file from your computer`);
    }

    walletObject.forEach(element => {
        if (!element.hasOwnProperty("address") && !element.hasOwnProperty("amount")) {
            // enqueueSnackbar(`Invalid wallet object it should contain address and amount`, { variant: 'error' });
            throw new Error(`Invalid wallet object it should contain address and amount`);
        }

        if (!validateWalletAddress(element.address)) {
            // enqueueSnackbar(`Invalid wallet address: ${element.address}`, { variant: 'error' });
            throw new Error(`Invalid wallet address: ${element.address}`);
        }
        if (!validateAmount(element.amount)) {
            // enqueueSnackbar(`Invalid amount: ${element.amount}`, { variant: 'error' });
            throw new Error(`Invalid amount: ${element.amount}`);
        }
    });
}

const validateWalletAddress = (address: string): boolean => {
    // Implement your validation logic for a wallet address here
    const addressPattern = /^0x[0-9a-fA-F]{40}$/;
    return addressPattern.test(address);
};


const validateAmount = (amount: string): boolean => {
    // Check if the amount is a valid number
    return !isNaN(parseFloat(amount));
};