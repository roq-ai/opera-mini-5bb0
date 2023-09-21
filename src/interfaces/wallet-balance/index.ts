import { GetQueryInterface } from 'interfaces';

export interface WalletBalanceInterface {
  id?: string;
  created_at?: any;
  updated_at?: any;

  _count?: {};
}

export interface WalletBalanceGetQueryInterface extends GetQueryInterface {
  id?: string;
}
