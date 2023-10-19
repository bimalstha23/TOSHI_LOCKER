import { Step, StepConnector, StepLabel, Stepper, stepConnectorClasses, styled } from "@mui/material"
import AceEditor from "react-ace";

import { ChangeEvent, Fragment, useRef, useState } from "react";
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

const MultiSenderForm = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [completed, setCompleted] = useState<{
        [k: number]: boolean;
    }>({});
    const [CsvFile, setCsvFile] = useState<File | null>(null);
    const [CsvData, setCsvData] = useState<string>('');

    const totalSteps = () => {
        return steps.length;
    };

    const completedSteps = () => {
        return Object.keys(completed).length;
    };

    const isLastStep = () => {
        return activeStep === totalSteps() - 1;
    };

    const allStepsCompleted = () => {
        return completedSteps() === totalSteps();
    };

    // const handleNext = () => {
    //     const newActiveStep =
    //         isLastStep() && !allStepsCompleted()
    //             ? // It's the last step, but not all steps have been completed,
    //             // find the first step that has been completed
    //             steps.findIndex((step, i) => !(i in completed))
    //             : activeStep + 1;
    //     setActiveStep(newActiveStep);
    // };

    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files && event.target.files[0];
        if (selectedFile) {
            setCsvFile(selectedFile);
            const reader = new FileReader();
            reader.onload = function (e) {
                const csv = e.target?.result;
                if (csv) {
                    console.log(csv, 'csvData')
                    setCsvData(csv);
                }
            }
            reader.readAsText(selectedFile);
        };
    };

    const handleDivClick = () => {
        if (fileInputRef?.current) {
            // Programmatically trigger a click event on the hidden input
            fileInputRef?.current.click();
        }
    };

    return (
        <div className=" rounded-toshi w-full shadow-lg h-[80%] bg-white flex flex-col justify-center items-center">
            <div className="w-full px-32">
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
                    {allStepsCompleted() ? (
                        <Fragment>
                            <h1>
                                All steps completed - you&apos;re finished
                            </h1>
                        </Fragment>
                    ) : activeStep === 0 ? (
                        <Fragment>
                            <div className="w-full mt-5 flex flex-col gap-5" >
                                <div>
                                    <label htmlFor="tokenaddress" className="text-black text-2xl font-bold">Token Address</label>
                                    <input type="text" className="form-field w-full" maxLength={256} name="tokenaddress" data-name="Tokenaddress" placeholder="Token Address" />
                                </div>
                                <div>
                                    <label htmlFor="csv" className="text-black text-2xl font-bold">
                                        List of Addresses in CSV
                                    </label>
                                    <AceEditor
                                        className="w-full rounded-toshi"
                                        width="100%"
                                        height="300px"
                                        mode="csv"
                                        theme="github"
                                        value={CsvData}
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
                                <button className="bg-toshimain text-white font-bold text-2xl py-3 rounded-toshi">
                                    Next
                                </button>
                            </div>
                        </Fragment>
                    ) : null}
                </div>
            </div>
        </div>
    )
}



export default MultiSenderForm