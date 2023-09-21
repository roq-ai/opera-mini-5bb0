import { GetQueryInterface } from 'interfaces';

export interface CryptoAssetsInterface {
  id?: string;
  created_at?: any;
  updated_at?: any;

  _count?: {};
}

export interface CryptoAssetsGetQueryInterface extends GetQueryInterface {
  id?: string;
}
