export type NativeEnv = {
  [key: string]: string;
};

declare global {
  interface Window {
    env: NodeJS.ProcessEnv;
  }
}

export interface Env {
  SERVER_NAME?: string;
  DOMAIN_NAME?: string;
  ENV_NAME?: string;

  RELEASE_VERSION?: string;

  NODE_APP_INSTANCE?: number;
  DEFAULT_TIME_ZONE?: string;
  DEFAULT_LOCALE?: string;
  DEFAULT_REGION_CODE?: string;
  DEFAULT_CURRENCY?: string;

  API_HOST?: string;
  API_KEY?: string;
}

function parseEnv(): Env {
  if (typeof global === 'undefined' || !global?.process?.env) {
    return {};
  }

  const processEnv: NodeJS.ProcessEnv = global.process.env;
  const env: Env = {};

  if (processEnv.SERVER_NAME !== undefined) {
    env.SERVER_NAME = processEnv.SERVER_NAME;
  } else if (processEnv.NEXT_PUBLIC_SERVER_NAME !== undefined) {
    env.SERVER_NAME = processEnv.NEXT_PUBLIC_SERVER_NAME;
  }

  if (processEnv.DOMAIN_NAME !== undefined) {
    env.DOMAIN_NAME = processEnv.DOMAIN_NAME;
  } else if (processEnv.NEXT_PUBLIC_DOMAIN_NAME !== undefined) {
    env.DOMAIN_NAME = processEnv.NEXT_PUBLIC_DOMAIN_NAME;
  }

  if (processEnv.ENV_NAME !== undefined) {
    env.ENV_NAME = processEnv.ENV_NAME;
  } else if (processEnv.NODE_ENV !== undefined) {
    env.ENV_NAME = processEnv.NODE_ENV;
  }

  if (processEnv.RELEASE_VERSION !== undefined) {
    env.RELEASE_VERSION = processEnv.RELEASE_VERSION;
  } else if (processEnv.NEXT_PUBLIC_RELEASE_VERSION !== undefined) {
    env.RELEASE_VERSION = processEnv.NEXT_PUBLIC_RELEASE_VERSION;
  }

  if (processEnv.NODE_APP_INSTANCE !== undefined) {
    env.NODE_APP_INSTANCE = parseInt(processEnv.NODE_APP_INSTANCE, 10);
  } else if (processEnv.NEXT_PUBLIC_NODE_APP_INSTANCE !== undefined) {
    env.NODE_APP_INSTANCE = parseInt(processEnv.NEXT_PUBLIC_NODE_APP_INSTANCE, 10);
  }

  if (processEnv.DEFAULT_TIME_ZONE !== undefined) {
    env.DEFAULT_TIME_ZONE = processEnv.DEFAULT_TIME_ZONE;
  } else if (processEnv.NEXT_PUBLIC_DEFAULT_TIME_ZONE !== undefined) {
    env.DEFAULT_TIME_ZONE = processEnv.NEXT_PUBLIC_DEFAULT_TIME_ZONE;
  }

  if (processEnv.DEFAULT_LOCALE !== undefined) {
    env.DEFAULT_LOCALE = processEnv.DEFAULT_LOCALE;
  } else if (processEnv.NEXT_PUBLIC_DEFAULT_LOCALE !== undefined) {
    env.DEFAULT_LOCALE = processEnv.NEXT_PUBLIC_DEFAULT_LOCALE;
  }

  if (processEnv.DEFAULT_REGION_CODE !== undefined) {
    env.DEFAULT_REGION_CODE = processEnv.DEFAULT_REGION_CODE;
  } else if (processEnv.NEXT_PUBLIC_DEFAULT_REGION_CODE !== undefined) {
    env.DEFAULT_REGION_CODE = processEnv.NEXT_PUBLIC_DEFAULT_REGION_CODE;
  }

  if (processEnv.DEFAULT_CURRENCY !== undefined) {
    env.DEFAULT_CURRENCY = processEnv.DEFAULT_CURRENCY;
  } else if (processEnv.NEXT_PUBLIC_DEFAULT_CURRENCY !== undefined) {
    env.DEFAULT_CURRENCY = processEnv.NEXT_PUBLIC_DEFAULT_CURRENCY;
  }

  if (processEnv.API_HOST !== undefined) {
    env.API_HOST = processEnv.API_HOST;
  } else if (processEnv.NEXT_PUBLIC_API_HOST !== undefined) {
    env.API_HOST = processEnv.NEXT_PUBLIC_API_HOST;
  }

  if (processEnv.API_KEY !== undefined) {
    env.API_KEY = processEnv.API_KEY;
  } else if (processEnv.NEXT_PUBLIC_API_KEY !== undefined) {
    env.API_KEY = processEnv.NEXT_PUBLIC_API_KEY;
  }

  return env;
}

export const env: Env = parseEnv();
