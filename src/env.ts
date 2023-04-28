import dotenv from 'dotenv';

dotenv.config();

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
  if (typeof process === 'undefined' || !process?.env) {
    return {};
  }

  const env: Env = {};

  if (process.env.SERVER_NAME !== undefined) {
    env.SERVER_NAME = process.env.SERVER_NAME;
  } else if (process.env.NEXT_PUBLIC_SERVER_NAME !== undefined) {
    env.SERVER_NAME = process.env.NEXT_PUBLIC_SERVER_NAME;
  }

  if (process.env.DOMAIN_NAME !== undefined) {
    env.DOMAIN_NAME = process.env.DOMAIN_NAME;
  } else if (process.env.NEXT_PUBLIC_DOMAIN_NAME !== undefined) {
    env.DOMAIN_NAME = process.env.NEXT_PUBLIC_DOMAIN_NAME;
  }

  if (process.env.ENV_NAME !== undefined) {
    env.ENV_NAME = process.env.ENV_NAME;
  } else if (process.env.NODE_ENV !== undefined) {
    env.ENV_NAME = process.env.NODE_ENV;
  }

  if (process.env.RELEASE_VERSION !== undefined) {
    env.RELEASE_VERSION = process.env.RELEASE_VERSION;
  } else if (process.env.NEXT_PUBLIC_RELEASE_VERSION !== undefined) {
    env.RELEASE_VERSION = process.env.NEXT_PUBLIC_RELEASE_VERSION;
  }

  if (process.env.NODE_APP_INSTANCE !== undefined) {
    env.NODE_APP_INSTANCE = parseInt(process.env.NODE_APP_INSTANCE, 10);
  } else if (process.env.NEXT_PUBLIC_NODE_APP_INSTANCE !== undefined) {
    env.NODE_APP_INSTANCE = parseInt(process.env.NEXT_PUBLIC_NODE_APP_INSTANCE, 10);
  }

  if (process.env.DEFAULT_TIME_ZONE !== undefined) {
    env.DEFAULT_TIME_ZONE = process.env.DEFAULT_TIME_ZONE;
  } else if (process.env.NEXT_PUBLIC_DEFAULT_TIME_ZONE !== undefined) {
    env.DEFAULT_TIME_ZONE = process.env.NEXT_PUBLIC_DEFAULT_TIME_ZONE;
  }

  if (process.env.DEFAULT_LOCALE !== undefined) {
    env.DEFAULT_LOCALE = process.env.DEFAULT_LOCALE;
  } else if (process.env.NEXT_PUBLIC_DEFAULT_LOCALE !== undefined) {
    env.DEFAULT_LOCALE = process.env.NEXT_PUBLIC_DEFAULT_LOCALE;
  }

  if (process.env.DEFAULT_REGION_CODE !== undefined) {
    env.DEFAULT_REGION_CODE = process.env.DEFAULT_REGION_CODE;
  } else if (process.env.NEXT_PUBLIC_DEFAULT_REGION_CODE !== undefined) {
    env.DEFAULT_REGION_CODE = process.env.NEXT_PUBLIC_DEFAULT_REGION_CODE;
  }

  if (process.env.DEFAULT_CURRENCY !== undefined) {
    env.DEFAULT_CURRENCY = process.env.DEFAULT_CURRENCY;
  } else if (process.env.NEXT_PUBLIC_DEFAULT_CURRENCY !== undefined) {
    env.DEFAULT_CURRENCY = process.env.NEXT_PUBLIC_DEFAULT_CURRENCY;
  }

  if (process.env.API_HOST !== undefined) {
    env.API_HOST = process.env.API_HOST;
  } else if (process.env.NEXT_PUBLIC_API_HOST !== undefined) {
    env.API_HOST = process.env.NEXT_PUBLIC_API_HOST;
  }

  if (process.env.API_KEY !== undefined) {
    env.API_KEY = process.env.API_KEY;
  } else if (process.env.NEXT_PUBLIC_API_KEY !== undefined) {
    env.API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  }

  return env;
}

export const env: Env = parseEnv();
