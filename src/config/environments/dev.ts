import environment, { Environment } from './base';

const env = environment('http://api.localhost:7515');
export default {
  ...env,
  isDevelopment: true,
  locale: 'en',
} as Environment;
