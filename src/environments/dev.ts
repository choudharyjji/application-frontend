import environment, { Environment } from './base';

const env = environment('http://localhost:7575/');

export default {
  ...env,
  isDevelopment: true,
} as Environment;
