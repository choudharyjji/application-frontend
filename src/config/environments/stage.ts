import environment from './base';

const env = environment('https://api.fiestacredito.es');
export default {
  ...env,
  isDevelopment: true,
  locale: 'en',
};
