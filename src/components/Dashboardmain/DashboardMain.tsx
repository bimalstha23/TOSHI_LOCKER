import { Link } from 'react-router-dom';
import base from '../../assets/images/basechain.svg';
import metamask from '../../assets/images/MetaMask_Fox.svg';
import BottomContent from '../BottomContent/BottomContent';
import { Fragment, useState } from 'react';
import WalletConnectModal from '../../modals/Walletconnectmodal';
import { connectMetaMask, handleDisconnect } from '../../wallet';
import { metaMask } from '../../wallet/provider';
import useNetwork from '../../hooks/useNetwork';
import { NetworkContextType } from '../../provider/NetworkProvider';
import { useWeb3React } from '@web3-react/core';


const DashboardMain = () => {
    const [openModal, setOpenModal] = useState(false)
    const [loading, setisLoading] = useState(false)
    const { account } = useWeb3React();
    const { setWalletType, network, setChain } =
        useNetwork() as NetworkContextType;

    const handleWalletConnect = async () => {
        if (!network?.chainId) return;
        setisLoading(true)
        try {
            await connectMetaMask(
                metaMask,
                setWalletType,
                setChain,
                undefined,
                network.chainId
            );
        } catch (e) {
            console.log({ error: e });
        } finally {
            setisLoading(false)
        }
    };

    const DisconnectWallet = () => {
        if (account) {
            handleDisconnect(
                setWalletType,
                metaMask,
                setChain,
            );
        }
    }

    return (
        <div className='content'>
            <div className="content-top_wrap">
                <div className="performance-wrap">
                    <div className="form-block-2 w-form">
                        <h1 className="log-in__h">Welcome To<br />Toshi Locker!</h1>
                        <p className="qf-copy">Select Your Lock Type And Connect<br />Your Wallet Below To Get Started.</p>
                        <div className="input-wrapper">
                            <label htmlFor="TokenLockType" className="form-label">Select Token Lock Type</label>
                        </div>
                        <Link to={"liquidity-locker"} className="w-inline-block">
                            <div
                                data-w-id="6423e81b-bed9-0b63-0096-ff6100d8daea"
                                className="contact-information underline"
                            >
                                <div className="icon-contact-bg">
                                    <img width="35" loading="lazy" src={base} alt="basechain" className="icon-contact" />
                                </div>
                                <div className="info-contact">
                                    <div className="text-info-contact">Liquidity Tokens</div>
                                    <h6 className="heading-info-contact font-bold">Lock Your LP Tokens From Various<br />DEXs.</h6>
                                </div>
                            </div>
                        </Link>
                        <Link to="token-locker" className="w-inline-block">
                            <div
                                data-w-id="7ea66e13-70ed-213b-67c6-7264e433db5b"
                                className="contact-information underline"
                            >
                                <div className="icon-contact-bg">
                                    <img width="35" loading="lazy" src={base} alt="" className="icon-contact" />
                                </div>
                                <div className="info-contact">
                                    <div className="text-info-contact">Project Tokens</div>
                                    <h6 className="heading-info-contact font-bold">Lock Your ERC-20 Tokens On Base!</h6>
                                </div>
                            </div>
                        </Link>

                        {!account ? <Fragment>
                            <button className="wallet_btn-2 w-full" onClick={() => setOpenModal(true)} disabled={loading}>
                                <h4 className="connect_text">Connect Wallet</h4>
                            </button>
                            <div className="or-wrap">
                                <div className="gray-line"></div>
                                <div className="or-new">or</div>
                                <div className="gray-line"></div>
                            </div>
                            <div className="log-in__buttons">
                                <button className="social-btn google w-inline-block" onClick={handleWalletConnect} disabled={loading}>
                                    <div id="btn-connect" className="wallet_btn-3">
                                        <h4 id="connect-text" className="connect_text-2">Continue With Metamask</h4>
                                    </div>
                                    <div className="social-content">
                                        <img loading="lazy" src={metamask} alt=""
                                            className="social-image" />
                                    </div>
                                </button>
                            </div>
                        </Fragment> : <button className="wallet_btn-2 w-full" onClick={() => DisconnectWallet()} disabled={loading}>
                            <h4 className="connect_text">Disconnect Wallet</h4>
                        </button>
                        }


                    </div>
                </div>
                {/* charts */}
                <div className="statistic-wrap">
                    {/* <div className="tabs-wrap">
                        <div data-current="Activity" data-easing="ease" data-duration-in="300" data-duration-out="100"
                            className="tabs w-tabs">
                            <div className="tabs-menu w-tab-menu">
                                <a data-w-tab="Activity" className="tab-link w-inline-block w-tab-link w--current">
                                    <div className="text-block">ETH</div>
                                </a>
                                <a data-w-tab="Tab 2" className="tab-link w-inline-block w-tab-link">
                                    <div className="text-block-2">TOSHI</div>
                                </a>
                                <a data-w-tab="Tab 3" className="tab-link w-inline-block w-tab-link"></a>
                            </div>
                            <div className="tabs-content w-tab-content">
                                <div data-w-tab="Activity" className="tab-panel w-tab-pane w--tab-active">
                                    <div className="tab-content">
                                        <div className="mw-125 ml-30">
                                            <p className="p"><span className="semi-bold">Live Feed</span></p>
                                        </div><img loading="lazy" src="images/Frame-4.svg" alt="" className="graph"/>
                                            <div className="dates-wrap">
                                                <p className="date">8/1</p>
                                                <p className="date">8/2</p>
                                                <p className="date">8/3</p>
                                                <p className="date">8/4</p>
                                                <p className="date">8/5</p>
                                                <p className="date">8/6</p>
                                                <p className="date">8/7</p>
                                            </div>
                                    </div>
                                </div>
                                <div data-w-tab="Tab 2" className="tab-panel w-tab-pane">
                                    <div className="tab-content">
                                        <div className="mw-125 ml-30">
                                            <p className="p">Your data updates every <span className="semi-bold">3 hours</span></p>
                                        </div><img loading="lazy" src="images/Frame-4.svg" alt="" className="graph" />
                                        <div className="dates-wrap">
                                            <p className="date">Su</p>
                                            <p className="date">Mo</p>
                                            <p className="date">Tu</p>
                                            <p className="date">We</p>
                                            <p className="date">Tu</p>
                                            <p className="date">Fr</p>
                                            <p className="date">Sa</p>
                                        </div>
                                    </div>
                                </div>
                                <div data-w-tab="Tab 3" className="tab-panel w-tab-pane">
                                    <div className="tab-content">
                                        <div className="mw-125 ml-30">
                                            <p className="p">Your data updates every <span className="semi-bold">3 hours</span></p>
                                        </div><img loading="lazy" src="images/Frame-4.svg" alt="" className="graph" />
                                        <div className="dates-wrap">
                                            <p className="date">Su</p>
                                            <p className="date">Mo</p>
                                            <p className="date">Tu</p>
                                            <p className="date">We</p>
                                            <p className="date">Tu</p>
                                            <p className="date">Fr</p>
                                            <p className="date">Sa</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div data-hover="false" data-delay="0" data-w-id="d4078177-5f61-7624-22e9-0ba13af0fd9e"
                            className="dropdown w-dropdown">
                            <div className="dd-toggle w-dropdown-toggle">
                                <div className="dd-text">Daily</div><img src="images/dd-icon.svg" loading="lazy" alt=""
                                    className="dd-icon-copy" />
                            </div>
                            <nav className="dd-list w-dropdown-list">
                                <a href="#" className="dd-link w-dropdown-link">Day</a>
                                <a href="#" className="dd-link w-dropdown-link">Week</a>
                                <a href="#" className="dd-link w-dropdown-link">Month</a>
                                <a href="#" className="dd-link w-dropdown-link">Year</a>
                            </nav>
                        </div>
                    </div> */}
                </div>

            </div>
            {
                openModal && <WalletConnectModal openModal={openModal} handleCloseModal={() => setOpenModal(false)} />
            }
            <BottomContent />
        </div >
    )
}

export default DashboardMain