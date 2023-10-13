import arrowdown from '../../assets/images/arrow-down-4.svg';
import arrowup from '../../assets/images/arrow-up-3.svg';
import flash from '../../assets/images/flash.svg';
import halfcircle from '../../assets/images/half-circle.svg';
import dolar from '../../assets/images/dolar.svg';
import arrowright from '../../assets/images/arrow-right.svg';

const BottomContent = () => {
    return (
        <div className="content-bottom_wrap">
            <div className="cont-bot-_text_wrap">
                <h2 className="h1 mb-25">The Rundown</h2>
                <p className="p">
                    General statistic of user <span className="semi-bold">engagement</span> process.
                </p>
            </div>
            <div className="scroll-wrap">
                <div className="scroll-measure"></div>
                <div className="scroll">
                    <div className="cont-bot_card_wrap">
                        <a
                            data-w-id="06f245a9-ba07-54fe-4ce0-539e2a031a35"
                            href="#"
                            className="cont-bot_card w-inline-block"
                        >
                            <div className="cont-card-emoji">
                                <img src={flash} loading="lazy" alt="" className="card-emoji_img" />
                            </div>
                            <p className="card-label">This Week</p>
                            <div className="cont-bot_card_num">
                                <h4 className="card-number">133</h4>
                                <img src={arrowup} loading="lazy" alt="" className="arrow-icon" />
                            </div>
                        </a>
                        <a
                            data-w-id="67ac9f6f-2223-daef-1c82-d967fa9e8023"
                            href="#"
                            className="cont-bot_card w-inline-block"
                        >
                            <div className="cont-card-emoji">
                                <img src={halfcircle} loading="lazy" alt="" className="card-emoji_img" />
                            </div>
                            <p className="card-label">Total ETH Locked</p>
                            <div className="cont-bot_card_num">
                                <h4 className="card-number">471</h4>
                                <img
                                    src={arrowdown}
                                    loading="lazy"
                                    width="12"
                                    alt=""
                                    className="arrow-icon"
                                />
                            </div>
                        </a>
                        <a
                            data-w-id="73595157-0560-4477-1190-b31963b0257a"
                            href="#"
                            className="cont-bot_card w-inline-block"
                        >
                            <div className="cont-card-emoji">
                                <img src={dolar} loading="lazy" alt="" className="card-emoji_img" />
                            </div>
                            <p className="card-label">On Going Locks</p>
                            <div className="cont-bot_card_num">
                                <h4 className="card-number">1529</h4>
                                <img
                                    src={arrowdown}
                                    loading="lazy"
                                    alt=""
                                    className="arrow-icon"
                                />
                            </div>
                        </a>
                        <a
                            data-w-id="3e95cf50-a0ab-f899-b755-0ab1843a8044"
                            href="#"
                            className="cont-bot_card_blue w-inline-block"
                        >
                            <p className="card-label">Our Telegram</p>
                            <div className="arrow-button">
                                <img src={arrowright} loading="lazy" alt="" />
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BottomContent