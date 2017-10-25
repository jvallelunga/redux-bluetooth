const CONFIG = {
  SERVICE_UUID: '13333333-3333-3333-3333-333333333337',
  CHARACTERISTIC_UUID: '13333333-3333-3333-3333-333333330001',
};

export const CENTRAL_CONFIG = CONFIG;
export const BLENO_CONFIG = {
  SERVICE_UUID: CONFIG.SERVICE_UUID.replace(/-/g, ''),
  CHARACTERISTIC_UUID: CONFIG.CHARACTERISTIC_UUID.replace(/-/g, ''),
  DESCRIPTOR_UUID: '2901',
};

export const COMMON_TYPES = {
  BLUETOOTH_SYNC_REQUEST: '@@bluetooth/SYNC_REQUEST',
};
