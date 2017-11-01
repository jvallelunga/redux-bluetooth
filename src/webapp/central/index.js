/* global window */
import { CENTRAL_CONFIG } from '../../common/config';
import Encoder from '../../common/encoder';

import Central from './central';

const { navigator, TextDecoder, TextEncoder } = window;

export default new Central(
  `${Date.now()}`.slice(4, 13), // Client ID
  navigator.bluetooth,
  Encoder({ TextEncoder, TextDecoder }),
  CENTRAL_CONFIG,
);
