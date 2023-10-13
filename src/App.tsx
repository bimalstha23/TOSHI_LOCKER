import './App.css'
import './normalize.css'
import './component.css'
import { RouterProvider } from 'react-router';
import { routes } from './routes';
import { createBrowserRouter } from 'react-router-dom';
import { NetworkContextProvider } from './provider/NetworkProvider';
import { Web3ReactProvider } from '@web3-react/core';
import { defiWallet, defiWalletHook, metaMask, metaMaskHooks, walletConnect, walletConnectHooks } from './wallet/provider';
import { SnackbarProvider } from 'notistack';

function App() {
  // const projectId = '0ba045da55528a1aad80d05b755c39a6'

  const router = createBrowserRouter(routes);


  return (
    <div className='font-outfit'>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <SnackbarProvider >
        <Web3ReactProvider
          connectors={[
            [metaMask, metaMaskHooks],
            [walletConnect, walletConnectHooks],
            [defiWallet, defiWalletHook],
          ]}
          lookupENS={false}
        >
          <NetworkContextProvider>
            <RouterProvider router={router} />
          </NetworkContextProvider>
        </Web3ReactProvider>
      </SnackbarProvider>
    </div>
  )
}

export default App

