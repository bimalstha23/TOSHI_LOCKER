import { Step, StepConnector, StepLabel, Stepper, stepConnectorClasses, styled } from "@mui/material"
import AceEditor from "react-ace";
import { ChangeEvent, FC, Fragment, useEffect, useRef, useState } from "react";
import { valudateWalletObject } from "../../helper/validateWalletObject";
import { enqueueSnackbar } from "notistack";
import { ethers } from "ethers";
import useNetwork from "../../hooks/useNetwork";
import ERC20ABI from "../../config/ERC20ABI";
import { useWeb3React } from "@web3-react/core";
import ethicon from '../../assets/icons/wallet/ETH.svg'
import multisenderAbi, { multisendercontractAddress } from '../../config/multisenderAbi'
import { MdDone } from 'react-icons/md'
import Refresh from '../../assets/icons/Refresh.svg'

const steps = ['Prepare', 'Approve', 'Multisend'];
const QontoConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 10,
        left: 'calc(-50% + 16px)',
        right: 'calc(50% + 16px)',
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: '#784af4',
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: '#784af4',
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
        borderTopWidth: 3,
        borderRadius: 1,
    },
}));

interface MultiSenderFormProps {
    selectedChain: 'ETH' | 'ERC20';
}

const MultiSenderForm: FC<MultiSenderFormProps> = ({ selectedChain }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [CsvData, setCsvData] = useState<string>('');
    const [Data, setData] = useState<{
        address: string;
        amount: string;
    }[]>([]);
    const { network } = useNetwork();
    const { account, provider } = useWeb3React();
    const [Ethbalance, setEthBalance] = useState<any>(0);
    const [Tokenaddress, setTokenAddress] = useState<string>('');

    const [Tokenbalance, setTokenBalance] = useState<any>('');

    console.log('network', network)

    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files && event.target.files[0];
        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const csvcontent = e.target?.result as string;
                if (csvcontent) {
                    setCsvData(csvcontent);
                }
            }
            reader.readAsText(selectedFile);
        };
    };

    const handleDivClick = () => {
        if (fileInputRef?.current) {
            fileInputRef?.current.click();
        }
    };

    useEffect(() => {
        const lines = CsvData.split('\n');
        const headers = lines[0].split(',');
        const data: {
            address: string;
            amount: string;
        }[] = [];

        for (let i = 1; i < lines.length; i++) {
            const values = lines[i].split(',');
            const row: any = {};
            for (let j = 0; j < headers.length; j++) {
                row[headers[j]] = values[j];
            }
            data.push(row);
        }
        setData(data);
    }, [CsvData])

    const handleNextClicked = () => {
        try {
            if (selectedChain === 'ETH') {
                valudateWalletObject(Data);
                setActiveStep(1);
            } else {
                if (Tokenaddress !== '') {
                    valudateWalletObject(Data);
                    setActiveStep(1);
                } else {
                    enqueueSnackbar(`Please enter the token address`, { variant: 'error' });
                }
            }
        } catch (e: any) {
            console.log('error something went wrong ', e.message)
            enqueueSnackbar(e.message, { variant: 'error' });
        }

    }


    const getEthBalance = async () => {
        try {
            if (!network || !network.rpcUrl) {
                throw new Error("Network configuration is missing or invalid.");
            }
            if (account) {
                const provider = new ethers.providers.JsonRpcProvider(
                    network?.rpcUrl
                )
                const balance = await provider.getBalance(account);
                setEthBalance(Number(ethers.utils.formatEther(balance)).toFixed(5))
            }

        } catch (e: any) {
            console.log(e, 'error getting blc')
        }
    }


    const getERC20TokenBalance = async () => {
        try {
            if (!network || !network.rpcUrl) {
                throw new Error("Network configuration is missing or invalid.");
            }
            if (!Tokenaddress) {
                throw new Error("Please enter the token address");
            }
            if (account) {
                const provider = new ethers.providers.JsonRpcProvider(
                    network?.rpcUrl
                )
                const contract = new ethers.Contract(
                    Tokenaddress,
                    ERC20ABI,
                    provider
                )
                const balance = await contract.balanceOf(account)
                setTokenBalance(ethers.utils.formatEther(balance))
            }

        } catch (e: any) {
            console.log(e, 'error getting blc')
        }
    }


    useEffect(() => {
        if (account) {
            getEthBalance()
        }
    }, [account])
    useEffect(() => {
        if (account && Tokenaddress) {
            getERC20TokenBalance()
        }
    }, [account, Tokenaddress])

    const TotalAmountofToken = Data.reduce((acc, item) => {
        return acc + Number(item.amount)
    }, 0)


    const handlemultisendEth = async () => {
        try {
            if (!network || !network.rpcUrl) {
                throw new Error("Network configuration is missing or invalid.");
            }
            if (network.multisendercontractAddress === undefined) {
                throw new Error("Multisender contract address is missing or invalid.");
            }
            const signer = provider?.getSigner();
            const contract = new ethers.Contract(
                network.multisendercontractAddress,
                multisenderAbi,
                signer
            )
            const address = Data.map((item) => item.address)
            const amount = Data.map((item) => ethers.utils.parseEther(item.amount.toString()))
            const fees = await getFeesInETH('0x0000000000000000000000000000000000000000')
            const transaction = await contract.multisendETH(address, amount, {
                value: fees,
                gasLimit: 500000 // Set a higher gas limit
            })

            await transaction.wait()
            enqueueSnackbar(`Transaction has been sent successfully`, { variant: 'success' });
            setActiveStep(2)
        } catch (e: any) {
            enqueueSnackbar(e, { variant: 'error' });
            console.log(e, 'error')
        }
    }

    const handleMultiSendToken = async () => {
        try {
            if (!network || !network.rpcUrl || !account) {
                throw new Error("Network configuration is missing or invalid.");
            }
            if (!Tokenaddress) {
                throw new Error("Please enter the token address");
            }
            if (network.multisendercontractAddress === undefined) {
                throw new Error("Multisender contract address is missing or invalid.");
            }
            const signer = provider?.getSigner();
            const contract = new ethers.Contract(
                network.multisendercontractAddress,
                multisenderAbi,
                signer
            )
            const address = Data.map((item) => item.address)
            const amount = Data.map((item) => ethers.utils.parseEther(item.amount.toString()))
            const fees = await getFeesInETH(Tokenaddress)
            const transaction = await contract.multisendToken(Tokenaddress, address, amount, {
                value: fees,
                gasLimit: 500000 // Set a higher gas limit

            })
            await transaction.wait()
            enqueueSnackbar(`Transaction has been sent successfully`, { variant: 'success' });
            setActiveStep(2)
        } catch (e: any) {
            enqueueSnackbar(e, { variant: 'error' });
            console.log(e, 'error   ')
        }
    }



    const getFeesInETH = async (tokenad: string) => {
        try {
            if (!network || !network.rpcUrl) {
                throw new Error("Network configuration is missing or invalid.");
            }
            if (!account || !provider) {
                throw new Error("Please connect your wallet");
            }

            const signer = provider?.getSigner();
            const contract = new ethers.Contract(
                multisendercontractAddress,
                multisenderAbi,
                signer
            )
            const feeInEther = await contract.getFeesInETH(tokenad);
            console.log(feeInEther, 'feeInEther')
            return feeInEther
        } catch (e: any) {
            enqueueSnackbar(e, { variant: 'error' });
            console.log(e, 'error getting Fees')
        }
    }

    const handleSubmit = async () => {
        try {
            valudateWalletObject(Data);
            if (selectedChain === 'ETH') {
                await handlemultisendEth()
            } else {
                if (Tokenaddress) {
                    await handleMultiSendToken()
                } else {
                    enqueueSnackbar(`Please enter the token address`, { variant: 'error' });
                }
            }
        } catch (e: any) {
            enqueueSnackbar(e, { variant: 'error' });
            console.log(e, 'error')
        }
    }

    return (
        <div className=" rounded-toshi w-full shadow-lg h-[80%] bg-white flex flex-col justify-start items-start pt-20">
            <div className="w-full lg:px-32 px-1">
                <Stepper activeStep={activeStep} connector={<QontoConnector />}>
                    {steps.map((label) => (
                        <Step
                            sx={{
                                '& .MuiStepLabel-root .Mui-completed': {
                                    color: '#0050FF', // circle color (COMPLETED)
                                },
                                '& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel':
                                {
                                    color: '#0050FF', // Just text label (COMPLETED)
                                },
                                '& .MuiStepLabel-root .Mui-active': {
                                    color: '#0050FF', // circle color (ACTIVE)
                                },
                                '& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel':
                                {
                                    color: '#0050FF', // Just text label (ACTIVE)
                                },
                                '& .MuiStepLabel-root .Mui-active .MuiStepIcon-text': {
                                    fill: '#FFFFFF', // circle's number (ACTIVE)
                                },
                            }}
                            key={label}>
                            <StepLabel >{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <div>
                    {activeStep === 0 ? (
                        <Fragment>
                            <div className="w-full mt-5 flex flex-col gap-5" >

                                {selectedChain === 'ERC20' ?
                                    <div>
                                        <label htmlFor="tokenaddress" className="text-black text-2xl font-bold">Token Address</label>
                                        <input onChange={(e) => setTokenAddress(e.target.value)} type="text" className="form-field w-full" maxLength={256} name="tokenaddress" data-name="Tokenaddress" placeholder="Token Address" />
                                    </div> : null
                                }

                                <div>
                                    <label htmlFor="csv" className="text-black text-2xl font-bold">
                                        List of Addresses in CSV
                                    </label>
                                    <AceEditor
                                        className="w-full lg:rounded-toshi"
                                        width="100%"
                                        height="300px"
                                        mode="csv"
                                        theme="github"
                                        value={CsvData as string}
                                        onChange={(value) => setCsvData(value)}
                                        name="csv"
                                        editorProps={{ $blockScrolling: true }}
                                    />
                                    <div>
                                        <div className="flex flex-row justify-center items-center cursor-pointer rounded-b-toshi bg-[#7A7978] ml-auto w-fit pl-4" onClick={handleDivClick}>
                                            Upload CSV
                                            <span className="bg-toshimain h-full py-3 px-3 ml-2 rounded-br-toshi">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M15.18 11.1093V13.4405C15.18 14.8212 14.0607 15.9405 12.68 15.9405C11.2993 15.9405 10.18 14.8212 10.18 13.4405V11.1093C9.27389 11.6334 8.54754 12.4338 8.11605 13.3952C7.95282 13.7589 7.8712 13.9407 7.81327 14.0218C7.63651 14.2691 7.49501 14.3607 7.19698 14.4207C7.09931 14.4404 6.95954 14.4404 6.67999 14.4404C5.02314 14.4404 3.67999 15.7835 3.67999 17.4404C3.67999 19.0972 5.02314 20.4404 6.67999 20.4404H12.68H18.68C20.3368 20.4404 21.68 19.0972 21.68 17.4404C21.68 15.7835 20.3368 14.4404 18.68 14.4404C18.4004 14.4404 18.2607 14.4404 18.163 14.4207C17.865 14.3607 17.7235 14.2691 17.5467 14.0218C17.4888 13.9407 17.4072 13.7589 17.2439 13.3952C16.8124 12.4338 16.0861 11.6334 15.18 11.1093Z" fill="white" />
                                                    <path d="M12.68 3.44002L11.9729 2.73291L12.68 2.0258L13.3871 2.73291L12.68 3.44002ZM13.68 13.44C13.68 13.9923 13.2323 14.44 12.68 14.44C12.1277 14.44 11.68 13.9923 11.68 13.44L13.68 13.44ZM7.97289 6.73291L11.9729 2.73291L13.3871 4.14712L9.3871 8.14712L7.97289 6.73291ZM13.3871 2.73291L17.3871 6.73291L15.9729 8.14712L11.9729 4.14712L13.3871 2.73291ZM13.68 3.44002L13.68 13.44L11.68 13.44L11.68 3.44002L13.68 3.44002Z" fill="white" />
                                                </svg>
                                            </span>
                                            <input
                                                type="file"
                                                ref={fileInputRef}
                                                style={{ display: 'none' }}
                                                onChange={handleFileChange}
                                                accept=".csv"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <button onClick={handleNextClicked} className="bg-toshimain text-white font-bold text-2xl py-3 rounded-toshi">
                                    Next
                                </button>
                            </div>
                        </Fragment>
                    ) : activeStep === 1 ? (
                        <Fragment>
                            <div className="w-full flex flex-col h-full rounded-toshi gap-4 mt-4">
                                <div className="flex flex-row justify-center items-center w-full gap-3">
                                    <div className="w-full flex flex-row justify-center items-center bg-[#22152F] gap-5 rounded-toshi py-3">
                                        <img className="rounded-full w-8" src={ethicon} alt="" />
                                        <div className="flex flex-col justify-center items-center">
                                            <h1 className="text-2xl font-bold">
                                                {Ethbalance} ETH
                                            </h1>
                                            <p className="text-[#908A8A] text-lg">
                                                Total Eth Balance
                                            </p>
                                        </div>
                                    </div>
                                    {selectedChain === 'ERC20' && <div className="w-full flex flex-row justify-center items-center bg-[#22152F] gap-5 rounded-toshi py-3">
                                        <img className="rounded-full w-8" src={ethicon} alt="" />
                                        <div className="flex flex-col justify-center items-center">
                                            <h1 className="text-2xl font-bold">
                                                {Tokenbalance} Token
                                            </h1>
                                            <p className="text-[#908A8A] text-lg">
                                                Total Token Balance
                                            </p>
                                        </div>
                                    </div>}
                                </div>

                                {<div className="border-2 border-toshimain rounded-toshi w-full flex flex-col justify-center items-center py-3">
                                    <h1 className="text-2xl font-bold text-toshimain">
                                        {TotalAmountofToken}
                                    </h1>
                                    <p className="text-black text-lg font-bold">
                                        Total of  Token Ready To send
                                    </p>
                                </div>}

                                <div className="flex flex-col w-full justify-start items-start h-[300px] overflow-y-scroll">
                                    <h1 className="text-base font-bold text-black text-start w-full">List of recipients</h1>
                                    {
                                        Data.map((item, index) => (
                                            <div key={index} className="w-full flex flex-row justify-between items-center text-black border-b-2 ">
                                                <h1 className="text-black font-bold lg:text-base text-[10px]">
                                                    {item.address}
                                                </h1>
                                                <h1 className="text-black font-bold lg:text-lg text-xs">
                                                    {item.amount} Token
                                                </h1>
                                            </div>
                                        ))
                                    }
                                </div>
                                <button onClick={handleSubmit} className="bg-toshimain text-white font-bold text-2xl py-3 rounded-toshi">
                                    Next
                                </button>
                            </div>
                        </Fragment>
                    ) : activeStep === 2 ? (
                        <Fragment>
                            <div className="w-full h-96 flex flex-col justify-center items-center shadow-2xl rounded-toshi mt-4">
                                <div className="rounded-full text-white bg-toshimain">
                                    <MdDone size={150} />
                                </div>
                                <h1 className="text-black font-bold text-5xl">
                                    Success
                                </h1>
                                <p className="text-toshimain ">
                                    Your token has been successfully sent to the given wallet addresses
                                </p>
                            </div>
                            <button onClick={() => setActiveStep(0)} className="bg-toshimain flex flex-row justify-center items-center gap-5  text-white font-bold text-2xl py-3 w-full   mt-3 rounded-toshi">
                                <span>
                                    Send Again
                                </span>
                                <img src={Refresh} alt="" />
                            </button>
                        </Fragment>
                    ) : null}
                </div>
            </div>
        </div>
    )
}

export default MultiSenderForm