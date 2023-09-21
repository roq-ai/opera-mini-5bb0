import axios from 'axios';
import queryString from 'query-string';
import { WalletBalanceInterface, WalletBalanceGetQueryInterface } from 'interfaces/wallet-balance';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getWalletBalances = async (
  query?: WalletBalanceGetQueryInterface,
): Promise<PaginatedInterface<WalletBalanceInterface>> => {
  const response = await axios.get('/api/wallet-balances', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createWalletBalance = async (walletBalance: WalletBalanceInterface) => {
  const response = await axios.post('/api/wallet-balances', walletBalance);
  return response.data;
};

export const updateWalletBalanceById = async (id: string, walletBalance: WalletBalanceInterface) => {
  const response = await axios.put(`/api/wallet-balances/${id}`, walletBalance);
  return response.data;
};

export const getWalletBalanceById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/wallet-balances/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteWalletBalanceById = async (id: string) => {
  const response = await axios.delete(`/api/wallet-balances/${id}`);
  return response.data;
};
