import { BsFillPeopleFill } from 'react-icons/bs';
import { FaGraduationCap } from 'react-icons/fa';
import { IoSettingsSharp } from 'react-icons/io5';
import logo from '../../assets/images/Logo.png';
import { Fragment, useState } from 'react';
import { reduceHexAddress } from '../../helper/reduceHexAddress';
import { useWeb3React } from '@web3-react/core';
import { NetworkContextType } from '../../provider/NetworkProvider';
import useNetwork from '../../hooks/useNetwork';
import { handleDisconnect } from '../../wallet';
import { metaMask } from '../../wallet/provider';
import WalletConnectModal from '../../modals/Walletconnectmodal';
import basechain from '../../assets/images/basechain.svg';
import { HiHome } from 'react-icons/hi'
import { Link, NavLink } from 'react-router-dom';
import { RiNftFill } from 'react-icons/ri'

const Sidebar = () => {
    const [openModal, setOpenModal] = useState(false)
    const { account } = useWeb3React();
    const { setWalletType, setChain } =
        useNetwork() as NetworkContextType;


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
        <div data-w-id="45f30cd3-187c-0cd5-4882-08cb4ae2bda4" className="nav">
            <a href="#" className="logo-link w-inline-block">
                <img src={logo} loading="lazy" width="104"
                    // sizes="(max-width: 991px) 100vw, 104px"
                    // srcSet="src/assets/images/Logo-p-500.png 500w, src/assets/images/Logo-p-800.png 800w, src/assets/images/Logo-p-1080.png 1080w, src/assets/images/Logo.png 1563w"
                    alt="" className="logo-img" />
            </a>
            <div className="nav-mid">


                <div className="links-wrap">
                    <NavLink to='/' className={({ isActive }) => `${isActive && 'w--current'} menu-link `}>
                        <HiHome />
                        <p className="menu-link_text">Home</p>
                    </NavLink>

                    <NavLink to="/mint" className={({ isActive }) => `${isActive && 'w--current'} menu-link `}>
                        <RiNftFill />
                        <p className="menu-link_text">Mint</p>
                    </NavLink>
                    <NavLink to="liquidity-locker" className={({ isActive }) => `${isActive && 'w--current'} menu-link `}>
                        <BsFillPeopleFill />
                        <p className="menu-link_text">Token Locker</p>
                    </NavLink>
                    <NavLink to="/" className={({ isActive }) => `${isActive && 'w--current'} menu-link `}>
                        <FaGraduationCap />
                        <p className="menu-link_text">Documents</p>
                    </NavLink>
                    <NavLink to="/" className={({ isActive }) => `${isActive && 'w--current'} menu-link `}>
                        <IoSettingsSharp />
                        <p className="menu-link_text">Settings</p>
                    </NavLink>
                    {!account ? <Fragment>
                        <button className="wallet_btn-2 w-full" onClick={() => setOpenModal(true)} >
                            <h4 className="connect_text">Connect Wallet</h4>
                        </button>
                        {/* <div className="or-wrap">
                            <div className="gray-line"></div>
                            <div className="or-new">or</div>
                            <div className="gray-line"></div>
                        </div>
                        <div className="log-in__buttons">
                            <button className="social-btn google" onClick={handleWalletConnect} disabled={loading}>
                                <div id="btn-connect" className="wallet_btn-3">
                                    <h4 id="connect-text" className="connect_text-2 text-sm">Connect Metamask</h4>
                                </div>
                                <div className="social-content">
                                    <img loading="lazy" src={metamask} alt=""
                                        className="social-image w-full" />
                                </div>
                            </button>
                        </div> */}


                    </Fragment> : <button className="wallet_btn-2 w-full" onClick={() => DisconnectWallet()} >
                        <h4 className="connect_text">Disconnect</h4>
                    </button>
                    }
                    <div className="profile-wrap">
                        {account &&
                            <Fragment>
                                <h2 className="username">
                                    {reduceHexAddress(account)}
                                </h2>
                                <p className="qf">Connected</p>
                            </Fragment>
                        }
                    </div>
                </div>
            </div>

            <a href="#" className="exit-link  flex">
                <div className="social-content">
                    <img src={basechain} loading="lazy" alt="" className="social-image" />
                    <div data-ms-auth-connected-text="Disconnect Google" className="social-text-copy">BASE</div>
                </div>
            </a>
            {
                openModal && <WalletConnectModal openModal={openModal} handleCloseModal={() => setOpenModal(false)} />
            }
        </div>
    )
}

export default Sidebar