import { useWeb3React } from '@web3-react/core';
import Eth from '../../assets/icons/wallet/ETH.svg'
import useNetwork from '../../hooks/useNetwork';
import { NetworkContextType } from '../../provider/NetworkProvider';
import { connectMetaMask, handleDisconnect } from '../../wallet';
import { metaMask } from '../../wallet/provider';
import { Fragment, useState } from 'react';
import metamask from '../../assets/images/MetaMask_Fox.svg';
import WalletConnectModal from '../../modals/Walletconnectmodal';
import toshicoin from '../../assets/images/Toshicoins.svg'
import cointoshi from '../../assets/images/Cointoshi.svg'
import MultiSenderForm from '../../components/MultiSender/MultiSenderForm';

const Multisender = () => {
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
    <div className="content">
      <div className="content-top_wrap">
        <div className="performance-wrap">
          <h1 className="log-in__h">Choose The<br />Network</h1>
          {/* <p className="qf-copy">Select Your Lock Type And Connect<br />Your Wallet Below To Get Started.</p> */}
          <p className='text-sm text-black pb-5'>Available Networks</p>

          <div className="flex flex-col w-full gap-3">
            <div className=" flex flex-row justify-start items-center w-full gap-5 px-5 py-2 cursor-pointer">
              <img className='rounded-full w-8 h-8' src={Eth} alt="" />
              <p className="paragraph">Ethereum</p>
            </div>
            <div className=" flex flex-row justify-start items-center w-full gap-5 px-5 py-2 cursor-pointer">
              <div className='rounded-full w-8 h-8 bg-toshimain' />
              <p className="paragraph">ERC-20</p>
            </div>
          </div>

          {!account ? <Fragment >
            <button className="wallet_btn-2 w-full mt-40" onClick={() => setOpenModal(true)} disabled={loading}>
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
                  <img loading="lazy" src={metamask} alt="metamask"
                    className="social-image" />
                </div>
              </button>
            </div>
          </Fragment> : <button className="wallet_btn-2 w-full" onClick={() => DisconnectWallet()} disabled={loading}>
            <h4 className="connect_text">Disconnect Wallet</h4>
          </button>
          }
        </div>
        <div className="w-full rounded-toshi h-full flex flex-col gap-6">
          <div className='w-full bg-toshimain h-[20%] rounded-toshi flex flex-row justify-center items-center'>
            <img src={cointoshi} alt="" />
            <div>
              <h1 className="log-in__h text-white p-0 m-0">Welcome To<br />Toshi Multisender</h1>
              <p className='text-[#FFBD45]'>Select A Token Address And Add CSV To Get Started.</p>
            </div>
            <img className='transform -translate-y-4' src={toshicoin} alt="" />
          </div>
          <MultiSenderForm />
        </div>
      </div>
      {
        openModal && <WalletConnectModal openModal={openModal} handleCloseModal={() => setOpenModal(false)} />
      }
    </div>
  )
}

export default Multisender