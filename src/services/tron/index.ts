import { toast } from 'react-toastify';
import { routes, TronStatus } from 'appConstants';
import { tronChainNode } from 'config';
import { userApi } from 'services';
import { rootStore } from 'store';
import { TronState } from 'typings/tron';
import { History } from 'history';

/* eslint-disable no-await-in-loop */
const MS_RETRY_TRON = 2000;
const MAX_ATTEMPT_GET_BALANCE = 5;
const MS_RETRY_GET_BALANCE = 1500;

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export async function getTronBalance(address: string) {
  for (let i = 0; i < MAX_ATTEMPT_GET_BALANCE; i += 1) {
    try {
      if (address) {
        const balance = await window.tronWeb.trx.getBalance(address);
        return Number(await window.tronWeb.fromSun(balance));
      }

      return 0;
    } catch (err: any) {
      if (i < MAX_ATTEMPT_GET_BALANCE - 1) {
        if (err.message === 'Network Error') {
          await delay(MS_RETRY_GET_BALANCE);
        } else {
          throw new Error('Get Balance failed');
        }
      }
    }
  }

  throw new Error('Get Balance failed');
}

async function setConnect(history: History<unknown>) {
  if (window.tronWeb) {
    const address = (await window.tronWeb.defaultAddress?.base58) || '';
    if (window.tronWeb.fullNode.host !== tronChainNode.chainUrl) {
      toast.error(`Please connect to ${tronChainNode.chainName}`);
      return;
    }

    const payload: TronState = {
      address,
      status: address ? TronStatus.ADDRESS_SELECTED : TronStatus.AVAILABLE,
      // balance: await getTronBalance(address),
    };
    if (!localStorage.nftcrowd_nft_token) {
      const { data }: any = await userApi.getMsg();

      const hexData = window.tronWeb.toHex(data);

      const signedMsg = await window.tronWeb.trx.sign(hexData);

      const {
        data: { key },
      }: any = await userApi.login({
        address: payload.address,
        msg: data,
        signedMsg,
      });

      localStorage.nftcrowd_nft_token = key;
    }
    localStorage.nftcrowd_nft_chainName = 'Tron';
    localStorage.nftcrowd_nft_providerName = 'TronLink';
    rootStore.user.setAddress(payload.address);
    rootStore.user.getMe();

    const disconnect = () => {
      delete localStorage.nftcrowd_nft_chainName;
      delete localStorage.nftcrowd_nft_providerName;
      delete localStorage.walletconnect;
      delete localStorage.nftcrowd_nft_token;
      rootStore.user.disconnect();

      history.push(routes.home.root);
    };
    window.addEventListener('message', function (e) {
      if (e.data.message && e.data.message.action === 'setNode') {
        if (e.data.message.data.node.fullNode !== tronChainNode.chainUrl) {
          toast.error(`Please connect to ${tronChainNode.chainName}`);
          disconnect();
        }
      }
      if (e.data.message && e.data.message.action === 'setAccount') {
        if (e.data.message.data.address !== rootStore.user.address) {
          disconnect();
        }
      }
    });
  } else {
    const payload: TronState = {
      address: '',
      status: TronStatus.NOT_AVAILABLE,
      balance: 0,
    };

    console.error('cant find tron', payload);
  }
}

export async function connectTron(history: History<unknown>) {
  try {
    if (!window.tronWeb?.defaultAddress?.base58) {
      await delay(MS_RETRY_TRON);
    }
    await setConnect(history);
  } catch (err) {
    console.error(err);
  }
}
