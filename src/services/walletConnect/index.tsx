import React, { createContext, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import { is_production, tronChainNode } from 'config';
import { observer } from 'mobx-react';
import { connectTron, userApi } from 'services';
import { WalletConnect } from 'services/walletService';
import { rootStore } from 'store';
import { chainsEnum } from 'typings';
import { routes } from 'appConstants';

declare global {
  interface Window {
    ethereum: any;
    kardiachain: any;
  }
}

const walletConnectorContext = createContext<{
  connect: (chainName: chainsEnum, providerName: 'MetaMask' | 'WalletConnect') => void;
  disconnect: () => void;
  walletService: WalletConnect;
}>({
  connect: (): void => {},
  disconnect: (): void => {},
  walletService: new WalletConnect(),
});

@observer
class Connector extends React.Component<
  any,
  {
    provider: WalletConnect;
  }
> {
  constructor(props: any) {
    super(props);

    this.state = {
      provider: new WalletConnect(),
    };

    this.connect = this.connect.bind(this);
    this.disconnect = this.disconnect.bind(this);
  }

  componentDidMount() {
    const disconnect = this.disconnect.bind(this);
    if (window.ethereum || window.tronWeb) {
      if (localStorage.nftcrowd_nft_chainName && localStorage.nftcrowd_nft_providerName) {
        if (localStorage.nftcrowd_nft_chainName === chainsEnum.Tron) {
          connectTron();
          window.addEventListener('message', function (e) {
            if (e.data.message && e.data.message.action === 'setNode') {
              if (e.data.message.data.node.fullNode !== tronChainNode.chainUrl) {
                disconnect();
                toast.error(`Please connect to ${tronChainNode.chainName}`);
              }
            }
            if (e.data.message && e.data.message.action === 'setAccount') {
              if (e.data.message.data.address !== rootStore.user.address) {
                disconnect();
              }
            }
          });
        } else {
          this.connect(localStorage.nftcrowd_nft_chainName, localStorage.nftcrowd_nft_providerName);
        }
      }
    }
  }

  connect = async (chainName: chainsEnum, providerName: 'MetaMask' | 'WalletConnect') => {
    if (window.ethereum) {
      try {
        const isConnected = await this.state.provider.initWalletConnect(
          chainName,
          providerName as any,
        );
        if (isConnected) {
          this.state.provider.getAccount().then(
            async (userAccount: any) => {
              if (rootStore.user.address && userAccount.address !== rootStore.user.address) {
                this.disconnect();
              } else {
                this.state.provider.setAccountAddress(userAccount.address);
                if (!localStorage.nftcrowd_nft_token) {
                  const metMsg: any = await userApi.getMsg();
                  const signedMsg = await this.state.provider.connectWallet.signMsg(
                    userAccount.address,
                    metMsg.data,
                  );

                  const login: any = await userApi.login({
                    address: userAccount.address,
                    msg: metMsg.data,
                    signedMsg,
                  });

                  localStorage.nftcrowd_nft_token = login.data.key;
                  if (this.props.history.location.pathname === '/') {
                    document.location.reload();
                  }
                  if (this.props.history.location.pathname === routes.connectWallet.root) {
                    this.props.history.push('/');
                  }
                }
                localStorage.nftcrowd_nft_chainName = chainName;
                localStorage.nftcrowd_nft_providerName = providerName;
                rootStore.user.setAddress(userAccount.address);
                rootStore.user.getMe();
              }
            },
            (err: any) => {
              console.error('getAccount wallet connect - get user account err: ', err);
              if (!(err.code && err.code === 6)) {
                this.disconnect();
              }
              toast.error(
                `Wrong Network, please select ${chainName} ${
                  is_production ? 'mainnet' : 'testnet'
                } network in your wallet and try again`,
              );
            },
          );

          const eventSubs = this.state.provider.connectWallet.eventSubscriber().subscribe(
            (res: any) => {
              if (res.name === 'accountsChanged' && rootStore.user.address !== res.address) {
                this.disconnect();
              }
            },
            (err: any) => {
              console.log(err);
              eventSubs.unsubscribe();
              this.disconnect();
            },
          );
        }
      } catch (err) {
        console.error(err);
        this.disconnect();
      }
    }
  };

  disconnect() {
    delete localStorage.nftcrowd_nft_chainName;
    delete localStorage.nftcrowd_nft_providerName;
    delete localStorage.walletconnect;
    delete localStorage.nftcrowd_nft_token;
    rootStore.user.disconnect();

    this.props.history.push('/');
  }

  render() {
    return (
      <walletConnectorContext.Provider
        value={{
          walletService: this.state.provider,
          connect: this.connect,
          disconnect: this.disconnect,
        }}
      >
        {this.props.children}
      </walletConnectorContext.Provider>
    );
  }
}

export default withRouter(Connector);

export function useWalletConnectorContext() {
  return useContext(walletConnectorContext);
}
