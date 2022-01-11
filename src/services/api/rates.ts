import axios from '../../core/axios';

export default {
  getRates: (network?: string) => axios.get(`/rates/?network=${network || localStorage.lessnft_nft_chainName}`),
};
