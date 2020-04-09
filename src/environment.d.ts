declare module 'environment' {
  import baseEnv from 'config/environments/base';

  const value: ReturnType<typeof baseEnv>;

  export default value;
}
