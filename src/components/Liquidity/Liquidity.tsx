import BottomContent from "../BottomContent/BottomContent"

const Liquidity = () => {
    return (
        <div className="content">
            <div className="content-top_wrap">
                <div className="statistic-wrap">
                    <div className="contact">
                        <h3 className="heading-form lg:text-5xl text-3xl">Enter Liquidity Pair Address</h3>
                        <p className="paragraph-form">
                            To Lock Liquidity, Search Your Liquidity Pairing Below By Importing The LP Pair Contract Address.
                        </p>
                        <div className="w-full flex justify-center items-center">
                            <form
                                id="email-form"
                                name="email-form"
                                data-name="Email Form"
                                method="get"
                                data-wf-page-id="64e85e9c8a2cfff2e3222895"
                                data-wf-element-id="cbd28934-7137-d1a0-27a0-c71a4e7bdd81"
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
                        <div className="w-layout-grid grid-2 max-md:flex flex-col max-md:w-full ">
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
                                data-wf-page-id="64e85e9c8a2cfff2e3222895"
                                data-wf-element-id="07783ce7-7e99-9a94-8f0e-27595eacbacd"
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

export default Liquidity