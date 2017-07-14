/* global navigator TextEncoder TextDecoder */
import { CENTRAL_CONFIG } from '../../common/config';
import Encoder from '../../common/encoder';

import Central from './central';

export default new Central(
  navigator.bluetooth,
  Encoder({ TextEncoder, TextDecoder }),
  CENTRAL_CONFIG,
);
