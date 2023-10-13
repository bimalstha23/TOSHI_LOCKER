import logo from '../assets/images/Logo.png';

import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar/Sidebar';

const Dashboard = () => {
    return (
        <section className="section">
            <div className="mobile-nav">
                <a href="#" className="logo-link mobile w-inline-block">
                    <img src={logo} loading="lazy" width="55"
                        // sizes="(max-width: 991px) 55px, 100vw"
                        // srcSet="src/assets/images/Logo-p-500.png 500w, src/assets/images/Logo-p-800.png 800w, src/assets/images/Logo-p-1080.png 1080w, src/assets/images/Logo.png 1563w"
                        alt="" className="logo-img" /></a>
                <div data-w-id="9b938ca6-e1bd-8589-3c76-ed1f0daf7a56" className="hamburger">
                    <div className="hamburger-line top"></div>
                    <div className="hamburger-line mid"></div>
                    <div className="hamburger-line bot"></div>
                </div>
            </div>
            <Sidebar />
            <Outlet />
        </section>
    )
}

export default Dashboard
