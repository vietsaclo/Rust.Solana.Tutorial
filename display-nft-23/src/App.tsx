import { FC, useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
  GlowWalletAdapter,
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
  SolletExtensionWalletAdapter,
  SolletWalletAdapter,
  TorusWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import {
  WalletModalProvider,
  WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import ListNFTsComponent from "./components/ListNFTs";

// Default styles that can be overridden by your app
require('@solana/wallet-adapter-react-ui/styles.css');

const App: FC = () => {
  const network = WalletAdapterNetwork.Devnet;

  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  console.log(network, endpoint);

  const wallets = useMemo(() => {
    return [
      new PhantomWalletAdapter(),
      new GlowWalletAdapter(),
      new SlopeWalletAdapter(),
      new SolflareWalletAdapter({ network }),
      new TorusWalletAdapter(),
      new SolletExtensionWalletAdapter(),
      new SolletWalletAdapter(),
    ];
  }, [network]);

  console.log(wallets);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <WalletMultiButton />
          
          <ListNFTsComponent />

        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;
