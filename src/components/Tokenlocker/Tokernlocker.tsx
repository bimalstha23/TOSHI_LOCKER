import BottomContent from "../BottomContent/BottomContent"

const Tokernlocker = () => {
    return (
        <div className='content'>
            <div className="content-top_wrap">
                <div className="statistic-wrap">
                    <div className="contact">
                        <h3 className="heading-form lg:text-5xl text-3xl">Enter Token Address</h3>
                        <p className="paragraph-form">
                            To Lock Tokens, Search Your Token Below By Importing The Token Contract Address.
                        </p>
                        <div className="w-full flex justify-center items-center">
                            <form
                                id="email-form"
                                name="email-form"
                                data-name="Email Form"
                                method="get"
                                data-wf-page-id="64e85250c3e5fe1806a6620c"
                                data-wf-element-id="e8298875-6e2c-07be-a2c7-2317ef0863d1"
                                className="lg:w-1/2 w-full"

                            >
                                <input
                                    type="text"
                                    className="form-field  w-full"

                                    maxLength={256}
                                    name="name"
                                    data-name="Name"
                                    placeholder="Token Address"
                                    id="search-general"
                                />
                            </form>
                            <div className="w-form-done">
                                <div>Thank you! Your submission has been received!</div>
                            </div>
                            <div className="w-form-fail">
                                <div>Oops! Something went wrong while submitting the form.</div>
                            </div>
                        </div>
                        <div className="w-layout-grid grid-2 max-md:flex flex-col max-md:w-full">
                            <a href="#" className="button-2 flex w-inline-block">
                                <p className="paragraph">Name</p>
                                <div className="number-circle">
                                    <p className="paragraph-2">TOSHI</p>
                                </div>
                            </a>
                            <a href="#" className="button-2-copy flex w-inline-block">
                                <p className="paragraph">Pair</p>
                                <div className="number-circle">
                                    <p className="paragraph-2">TOSHI/ETH</p>
                                </div>
                            </a>
                            <a href="#" className="copy flex w-inline-block">
                                <p className="paragraph">Decimals</p>
                                <div className="number-circle">
                                    <p className="paragraph-2">18.0</p>
                                </div>
                            </a>
                            <a href="#" className="button-2-copy2 flex w-inline-block">
                                <p className="paragraph">Balance</p>
                                <div className="number-circle">
                                    <p className="paragraph-2">1.2345</p>
                                </div>
                            </a>
                        </div>
                        <div className="form-block w-form">
                            <form
                                id="wf-form-Email-Form-Contact"
                                name="wf-form-Email-Form-Contact"
                                data-name="Email Form Contact"
                                method="get"
                                className="form"
                                data-wf-page-id="64e85250c3e5fe1806a6620c"
                                data-wf-element-id="e8298875-6e2c-07be-a2c7-2317ef0863f3"
                            >
                                <input
                                    type="submit"
                                    value="Configure Lock"
                                    data-wait="Please wait..."
                                    className="submit-button bg-black"
                                />
                            </form>
                            <div className="success-message w-form-done">
                                <div className="success-text">Thank you! Your submission has been received!</div>
                            </div>
                            <div className="error-message w-form-fail">
                                <div className="error-text">Oops! Something went wrong while submitting the form.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <BottomContent />
        </div>
    )
}

export default Tokernlocker