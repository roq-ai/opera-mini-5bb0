const mapping: Record<string, string> = {
  businesses: 'business',
  'crypto-assets': 'crypto_assets',
  'notification-settings': 'notification_settings',
  'security-settings': 'security_settings',
  'transaction-histories': 'transaction_history',
  users: 'user',
  'wallet-balances': 'wallet_balance',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
