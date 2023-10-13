import { useWeb3React } from '@web3-react/core';
import image from '../../assets/images/2023-08-25-05.33.53.jpg';
import { useEffect, useState } from 'react';
import WalletConnectModal from '../../modals/Walletconnectmodal';
import SliderModal from '../../modals/SliderModal';
import { ethers } from 'ethers';
import useNetwork from '../../hooks/useNetwork';
import abi from '../../config/abi';
// import ERC721ABI from '../../config/ERC721ABI';
import ERC20ABI from '../../config/ERC20ABI';

const Mint = () => {
    const { account } = useWeb3React();
    const [openModal, setOpenModal] = useState(false);
    const [openSliderModal, setOpenSliderModal] = useState(false);
    const [minted, setMinted] = useState(0);
    const [balance, setBalance] = useState<number | string>(0);

    const { network } = useNetwork();

    const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS

    // useEffect(() => {
    //     const listenerProvider = new ethers.providers.JsonRpcProvider(
    //         network?.rpcUrl
    //     )
    //     const contract = new ethers.Contract(
    //         contractAddress,
    //         ERC721ABI,
    //         listenerProvider
    //     )
    //     const transferFilter = contract.filters.Transfer('0x0000000000000000000000000000000000000000', null, null)
    //     contract.on(transferFilter, () => {
    //         setMinted((minted) => minted + 1)
    //     })
    // }, [])

    const getBalance = async () => {
        try {
            const provider = new ethers.providers.JsonRpcProvider(
                network?.rpcUrl
            )
            const contract = new ethers.Contract(
                '0x8544FE9D190fD7EC52860abBf45088E81Ee24a8c',
                ERC20ABI,
                provider
            )
            const balance = await contract.balanceOf(account)
            console.log(balance, 'balance')
            setBalance(ethers.utils.formatEther(balance))

        } catch (e: any) {
            console.log(e, 'error getting blc')
        }
    }

    useEffect(() => {
        if (account) {
            getBalance()
        }
    }, [account])


    const getTotalSupply = async () => {
        try {
            const provider = new ethers.providers.JsonRpcProvider(
                network?.rpcUrl
            )
            const contract = new ethers.Contract(
                contractAddress,
                abi,
                provider
            )
            const totalSupply = await contract.totalSupply()
            setMinted(totalSupply.toNumber())
        } catch (e: any) {
            console.log(e.error.reason)
        }
    }

    useEffect(() => {
        getTotalSupply()
    }, [])

    return (
        <div className="content">
            <div className="section-home_hero">
                <div className="minting-container-2 w-container">
                    <img
                        src={image}
                        loading="lazy"
                        width="240"
                        // sizes="(max-width: 767px) 123.98896026611328px, 199.99998474121094px"
                        // srcSet="src/assets/images/2023-08-25-05.33.53-p-500.jpg 500w, src/assets/images/2023-08-25-05.33.53-p-800.jpg 800w, src/assets/images/2023-08-25-05.33.53-p-1080.jpg 1080w, src/assets/images/2023-08-25-05.33.53.jpg 1280w"
                        alt=""
                        className="mint-card-image"
                    />
                    <h2 className="heading-2">Mint NFTOSHIS</h2>
                    <p className="paragraph-3">
                        Discover NFToshis, a collection of extraordinary NFTs inspired by Brian Armstrong's Pet Cat. Own a piece of Toshi and be part of the adventure.
                    </p>
                    {account ?
                        <button onClick={() => setOpenSliderModal(true)} className="primary-button-2 ">
                            Mint Now
                        </button> : <button className="primary-button-2 w-full max-w-md" onClick={() => setOpenModal(true)} >
                            <h4 className="connect_text">Connect Wallet </h4>
                        </button>
                    }

                    <a href="https://opensea.io/collection/nftoshis-official" target='_blank' className="primary-button-2-copy ">
                        Trade On OpenSea
                    </a>

                    {account && <div className='price'>
                        <strong>Token Balance: {balance} $TOSHI</strong>
                    </div>}

                    <div className="price">
                        {!(minted === 3000) ? <strong>{minted}/3000 Minted</strong> :
                            <strong>OMG. Sold Out!</strong>
                        }
                    </div>

                </div>
            </div>
            {openModal && <WalletConnectModal openModal={openModal} handleCloseModal={() => setOpenModal(false)} />}
            {openSliderModal && <SliderModal open={openSliderModal} onClose={() => setOpenSliderModal(false)} />}
        </div>
    )
}

export default Mint;
