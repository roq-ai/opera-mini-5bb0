interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
  ownerAbilities: string[];
  customerAbilities: string[];
  getQuoteUrl: string;
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Owner'],
  customerRoles: [],
  tenantRoles: ['Owner', 'Team Member'],
  tenantName: 'Business',
  applicationName: 'Opera mini',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
  customerAbilities: [],
  ownerAbilities: [
    'Manage transaction history',
    'Manage notification settings',
    'Manage security settings',
    'Manage wallet balance',
  ],
  getQuoteUrl: 'https://app.roq.ai/proposal/ebea735b-bf4b-4413-85a3-2392dc462e80',
};
