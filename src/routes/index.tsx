import Dashboard from "../Pages/Dashboard";
import DashboardMain from "../components/Dashboardmain/DashboardMain";
import Liquidity from "../components/Liquidity/Liquidity";
// import DashboardMain from "../components/Dashboardmain/DashboardMain";
import Mint from "../components/Mint";
import Tokernlocker from "../components/Tokenlocker/Tokernlocker";
import { createRoutes } from "./createRoutes";
// import Liquidity from "../components/Liquidity/Liquidity";
// import Tokernlocker from "../components/Tokenlocker/Tokernlocker";

export const routes = [
    createRoutes({
        path: "/",
        element: Dashboard,
        children: [
            createRoutes({
                path: "/",
                element: DashboardMain,
            }),
            createRoutes({
                path: "/mint",
                element: Mint
            }),
            createRoutes({
                path: "liquidity-locker",
                element: Liquidity
            }),
            createRoutes({
                path: "token-locker",
                element: Tokernlocker,
            })
        ]
    })
]

