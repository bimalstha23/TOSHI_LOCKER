export const reduceHexAddress = (strAddress:string) => {
    if (!strAddress) return "";
    if (strAddress.length < 10) return strAddress;
    return `${strAddress.substring(0, 5)}...${strAddress.substring(
        strAddress.length - 4,
        strAddress.length
    )}`;
};