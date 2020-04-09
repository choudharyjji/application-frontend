import environment from './base';

const env = environment('https://api.stage.fiestacredito.es');
export default {
  ...env,
  isDevelopment: true,
  locale: 'en',
};
