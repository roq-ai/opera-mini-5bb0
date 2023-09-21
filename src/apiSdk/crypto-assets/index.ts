import axios from 'axios';
import queryString from 'query-string';
import { CryptoAssetsInterface, CryptoAssetsGetQueryInterface } from 'interfaces/crypto-assets';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getCryptoAssets = async (
  query?: CryptoAssetsGetQueryInterface,
): Promise<PaginatedInterface<CryptoAssetsInterface>> => {
  const response = await axios.get('/api/crypto-assets', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createCryptoAssets = async (cryptoAssets: CryptoAssetsInterface) => {
  const response = await axios.post('/api/crypto-assets', cryptoAssets);
  return response.data;
};

export const updateCryptoAssetsById = async (id: string, cryptoAssets: CryptoAssetsInterface) => {
  const response = await axios.put(`/api/crypto-assets/${id}`, cryptoAssets);
  return response.data;
};

export const getCryptoAssetsById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/crypto-assets/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteCryptoAssetsById = async (id: string) => {
  const response = await axios.delete(`/api/crypto-assets/${id}`);
  return response.data;
};
