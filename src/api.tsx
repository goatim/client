import {
  createContext,
  ReactElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  RawAxiosRequestHeaders,
} from 'axios';
import { io, Socket } from 'socket.io-client';
import httpStatus from 'http-status';
import cookie from 'cookie';
import { FormErrors } from '@cezembre/forms';
import { ManagerOptions } from 'socket.io-client/build/esm/manager';
import { SocketOptions } from 'socket.io-client/build/esm/socket';
import { DateTime } from 'luxon';
import { DurationLike } from 'luxon/src/duration';
import { hashQueryKey, QueryKey } from '@tanstack/react-query';
import { ModelName } from './utils';

export interface Model<N extends ModelName = ModelName> {
  __name__?: N;
  id: string;
  creation?: string;
  last_update?: string;
}

export type PaginatedList<N extends string, D = unknown> = {
  [key in N]: D[];
} & {
  total: number;
  page?: number;
  limit?: number;
  next_page?: number;
  previous_page?: number;
};

export interface ApiErrorData<FE extends FormErrors = FormErrors> {
  status?: number;
  code?: string;
  form_errors?: FE;
  state?: Record<string, unknown>;
  message?: string;
}

export class ApiError<FE extends FormErrors = FormErrors> extends Error implements ApiErrorData {
  readonly __FLAG__ = 'ApiError';

  status?: number;

  code?: string;

  form_errors?: FE;

  state?: Record<string, unknown>;

  constructor(error: Error | ApiErrorData<FE> | string) {
    if (error instanceof Error) {
      super(error.message);
    } else if (typeof error === 'object') {
      super(error.message);

      this.status = error.status;
      this.code = error.code;
      this.form_errors = error.form_errors;
      this.state = error.state;
    } else {
      super(error);

      this.status = httpStatus.BAD_REQUEST;
    }
  }
}

export function isApiError(error: unknown): boolean {
  return !!(
    error &&
    typeof error === 'object' &&
    '__FLAG__' in error &&
    error instanceof ApiError &&
    error.__FLAG__ &&
    error.__FLAG__ === 'ApiError'
  );
}

export interface RequestBody {
  [key: string]: unknown;
}

export function buildRequestBody<B extends RequestBody = RequestBody>(body: B): FormData {
  const formData = new FormData();

  Object.entries(body).forEach(([param, value]) => {
    if (value === null) {
      formData.append(param, '');
    } else if (typeof value === 'string') {
      formData.append(param, value);
    } else if (typeof value === 'number') {
      formData.append(param, value.toString(10));
    } else if (typeof value === 'boolean') {
      formData.append(param, value.toString());
    } else if (typeof value === 'object') {
      if (value instanceof Blob) {
        formData.append(param, value);
      } else if ('toString' in value && value.toString && typeof value.toString === 'function') {
        formData.append(param, value.toString());
      } else {
        formData.append(param, JSON.stringify(value));
      }
    }
  });

  return formData;
}

export interface ApiConfig {
  host?: string | null;
  api_key?: string | null;
  locale?: string | null;
  bearer_token?: string | null;
}

export interface RequestQuery {
  expand?: string[] | string;
  required_permissions?: string[] | string;
  required_permissions_mode?: string;
}

export interface ListRequestQuery extends RequestQuery {
  order?: string;
  limit?: number;
  page?: number;
}

export function buildRequestConfig<Q extends RequestQuery = RequestQuery>(
  apiConfig?: ApiConfig,
  query?: Q,
): AxiosRequestConfig {
  const headers: RawAxiosRequestHeaders = {};

  if (apiConfig?.api_key) {
    headers['X-Api-Key'] = apiConfig.api_key;
  }

  if (apiConfig?.bearer_token) {
    headers.Authorization = `Bearer ${apiConfig.bearer_token}`;
  }

  if (apiConfig?.locale) {
    headers['X-locale'] = apiConfig.locale;
  }

  return {
    headers,
    params: query,
  };
}

function parseError(error: unknown): ApiError {
  if (!error) {
    return new ApiError('Unknown error');
  }
  if (typeof error === 'object') {
    if ('response' in error && (error as AxiosError).response) {
      const { response } = error as AxiosError<ApiErrorData>;
      if (response?.data) {
        return new ApiError({ ...response.data, status: response.status });
      }
    }
    return new ApiError(error as Error);
  }
  if (typeof error === 'string') {
    return new ApiError(error);
  }
  return new ApiError('Unknown error');
}

export async function apiGet<D = unknown, Q extends RequestQuery = RequestQuery>(
  url: string,
  apiConfig?: ApiConfig,
  query?: Q,
): Promise<AxiosResponse<D>> {
  const config = buildRequestConfig<Q>(apiConfig, query);

  try {
    return await axios.get<D>((apiConfig?.host || '') + url, config);
  } catch (error: unknown) {
    throw parseError(error);
  }
}

export async function apiPost<
  D = unknown,
  B extends RequestBody = RequestBody,
  Q extends RequestQuery = RequestQuery,
>(url: string, body?: B, apiConfig?: ApiConfig, query?: Q): Promise<AxiosResponse<D>> {
  const config = buildRequestConfig<Q>(apiConfig, query);

  try {
    return await axios.post<D>(
      (apiConfig?.host || '') + url,
      body ? buildRequestBody<B>(body) : undefined,
      config,
    );
  } catch (error: unknown) {
    throw parseError(error);
  }
}

export async function apiPut<
  D = unknown,
  B extends RequestBody = RequestBody,
  Q extends RequestQuery = RequestQuery,
>(url: string, body?: B, apiConfig?: ApiConfig, query?: Q): Promise<AxiosResponse<D>> {
  const config = buildRequestConfig<Q>(apiConfig, query);

  try {
    return await axios.put<D>(
      (apiConfig?.host || '') + url,
      body ? buildRequestBody<B>(body) : undefined,
      config,
    );
  } catch (error: unknown) {
    throw parseError(error);
  }
}

export async function apiDelete<D = unknown, Q extends RequestQuery = RequestQuery>(
  url: string,
  apiConfig?: ApiConfig,
  query?: Q,
): Promise<AxiosResponse<D>> {
  const config = buildRequestConfig<Q>(apiConfig, query);

  try {
    return await axios.delete<D>((apiConfig?.host || '') + url, config);
  } catch (error: unknown) {
    throw parseError(error);
  }
}

export interface ApiContext {
  config?: ApiConfig;

  setConfig(config: ApiConfig): void;

  setHost(host?: string | null, duration?: DurationLike): void;
  setApiKey(apiKey?: string | null, duration?: DurationLike): void;
  setLocale(locale?: string | null, duration?: DurationLike): void;
  setBearerToken(bearerToken?: string | null, duration?: DurationLike): void;

  get<D = unknown, Q extends RequestQuery = RequestQuery>(
    route: string,
    query?: Q,
  ): Promise<AxiosResponse<D>>;
  post<D = unknown, B extends RequestBody = RequestBody, Q extends RequestQuery = RequestQuery>(
    route: string,
    body?: B,
    query?: Q,
  ): Promise<AxiosResponse<D>>;
  put<D = unknown, B extends RequestBody = RequestBody, Q extends RequestQuery = RequestQuery>(
    route: string,
    body?: B,
    query?: Q,
  ): Promise<AxiosResponse<D>>;
  delete<D = unknown, Q extends RequestQuery = RequestQuery>(
    route: string,
    query?: Q,
  ): Promise<AxiosResponse<D>>;

  sockets: Record<string, Socket>;
  openSocket: (
    namespace: string,
    queryKey: QueryKey,
    opts?: Partial<ManagerOptions & SocketOptions>,
  ) => Socket;
  closeSocket: (queryKey: QueryKey) => void;
  closeAllSockets: () => void;
}

const apiContext = createContext<ApiContext | undefined>(undefined);

export function useApi(): ApiContext {
  const context = useContext<ApiContext | undefined>(apiContext);
  if (!context) {
    throw new Error('Missing api context');
  }
  return context;
}

function storeHost(host: string | null, duration: DurationLike = { year: 1 }): string | null {
  if (typeof document !== 'undefined') {
    document.cookie = cookie.serialize('host', host || '', {
      expires: host ? DateTime.now().plus(duration).toJSDate() : new Date(0),
    });
  }
  return host;
}

function storeApiKey(apiKey: string | null, duration: DurationLike = { year: 1 }): string | null {
  if (typeof document !== 'undefined') {
    document.cookie = cookie.serialize('api_key', apiKey || '', {
      expires: apiKey ? DateTime.now().plus(duration).toJSDate() : new Date(0),
    });
  }
  return apiKey;
}

function storeLocale(locale: string | null, duration: DurationLike = { year: 1 }): string | null {
  if (typeof document !== 'undefined') {
    document.cookie = cookie.serialize('locale', locale || '', {
      expires: locale ? DateTime.now().plus(duration).toJSDate() : new Date(0),
    });
  }
  return locale;
}

function storeBearerToken(
  bearerToken: string | null,
  duration: DurationLike = { year: 1 },
): string | null {
  if (typeof document !== 'undefined') {
    document.cookie = cookie.serialize('bearer_token', bearerToken || '', {
      expires: bearerToken ? DateTime.now().plus(duration).toJSDate() : new Date(0),
    });
  }
  return bearerToken;
}

function storeConfig(config?: ApiConfig, duration?: DurationLike): void {
  if (config?.host !== undefined) {
    storeHost(config.host, duration);
  }

  if (config?.api_key !== undefined) {
    storeApiKey(config.api_key, duration);
  }

  if (config?.locale !== undefined) {
    storeLocale(config.locale, duration);
  }

  if (config?.bearer_token !== undefined) {
    storeBearerToken(config.bearer_token, duration);
  }
}

function retrieveConfig(cookieString?: string): ApiConfig | undefined {
  let resolvedCookie: string | undefined;
  if (cookieString) {
    resolvedCookie = cookieString;
  } else if (typeof document !== 'undefined') {
    resolvedCookie = document.cookie;
  }

  if (!resolvedCookie) {
    return undefined;
  }

  const { host, api_key: apiKey, locale, bearer_token: bearerToken } = cookie.parse(resolvedCookie);

  if (host || apiKey || locale || bearerToken) {
    return { host, api_key: apiKey, locale, bearer_token: bearerToken };
  }

  return undefined;
}

function hydrateConfig(config?: ApiConfig, cookieString?: string): ApiConfig | undefined {
  const storedConfig = retrieveConfig(cookieString);

  if (storedConfig) {
    return storedConfig;
  }

  storeConfig(config);

  return config;
}

export interface ApiProviderProps {
  children?: ReactElement;
  config?: ApiConfig;
  persistConfig?: boolean;
  cookie?: string;
}

export function ApiProvider({
  children,
  config,
  persistConfig = true,
  cookie: cookieString,
}: ApiProviderProps): ReactElement {
  const [apiConfig, setApiConfig] = useState<ApiConfig | undefined>(
    persistConfig ? hydrateConfig(config, cookieString) : config,
  );

  const setConfig = useCallback(
    (_config: ApiConfig, duration?: DurationLike) => {
      if (persistConfig) {
        storeConfig(_config, duration);
      }
      setApiConfig(_config);
    },
    [persistConfig],
  );

  const setHost = useCallback(
    (host: string | null, duration?: DurationLike) => {
      if (persistConfig) {
        storeHost(host, duration);
      }
      setApiConfig((oldConfig) => ({ ...oldConfig, host: host || undefined }));
    },
    [persistConfig],
  );

  const setApiKey = useCallback(
    (apiKey: string | null, duration?: DurationLike) => {
      if (persistConfig) {
        storeApiKey(apiKey, duration);
      }
      setApiConfig((oldConfig) => ({ ...oldConfig, api_key: apiKey || undefined }));
    },
    [persistConfig],
  );

  const setLocale = useCallback(
    (locale: string | null, duration?: DurationLike) => {
      if (persistConfig) {
        storeLocale(locale, duration);
      }
      setApiConfig((oldConfig) => ({ ...oldConfig, locale: locale || undefined }));
    },
    [persistConfig],
  );

  const setBearerToken = useCallback(
    (bearerToken: string | null, duration?: DurationLike) => {
      if (persistConfig) {
        storeBearerToken(bearerToken, duration);
      }
      setApiConfig((oldConfig) => ({ ...oldConfig, bearer_token: bearerToken || undefined }));
    },
    [persistConfig],
  );

  const [sockets, setSockets] = useState<Record<string, Socket>>({});

  const openSocket = useCallback(
    (
      namespace: string,
      queryKey: QueryKey,
      opts?: Partial<ManagerOptions & SocketOptions>,
    ): Socket => {
      const hash = hashQueryKey(queryKey);

      if (hash in sockets) {
        return sockets[hash];
      }

      const socket = io((apiConfig?.host || '') + namespace, {
        auth: {
          api_key: apiConfig?.api_key,
          bearer_token: apiConfig?.bearer_token,
        },
        ...opts,
      });

      setSockets((_sockets) => ({ ..._sockets, [hash]: socket }));

      return socket;
    },
    [apiConfig?.api_key, apiConfig?.bearer_token, apiConfig?.host, sockets],
  );

  const closeSocket = useCallback(
    (queryKey: QueryKey): void => {
      const hash = hashQueryKey(queryKey);

      if (hash in sockets && sockets[hash]) {
        sockets[hash].disconnect();
        setSockets(({ ..._sockets }) => {
          delete _sockets[hash];
          return _sockets;
        });
      }
    },
    [sockets],
  );

  const closeAllSockets = useCallback((): void => {
    Object.values(sockets).forEach((socket) => {
      socket.disconnect();
    });
    setSockets({});
  }, [sockets]);

  useEffect(() => {
    return () => {
      closeAllSockets();
    };
  }, [closeAllSockets]);

  const value = useMemo<ApiContext>(
    () => ({
      config: apiConfig,
      setConfig,
      setHost,
      setApiKey,
      setLocale,
      setBearerToken,
      get: (route: string, query?: RequestQuery) => apiGet(route, apiConfig, query),
      post: (route: string, body?: RequestBody, query?: RequestQuery) =>
        apiPost(route, body, apiConfig, query),
      put: (route: string, body?: RequestBody, query?: RequestQuery) =>
        apiPut(route, body, apiConfig, query),
      delete: (route: string, query?: RequestQuery) => apiDelete(route, apiConfig, query),
      sockets,
      openSocket,
      closeSocket,
      closeAllSockets,
    }),
    [
      apiConfig,
      closeAllSockets,
      closeSocket,
      openSocket,
      setApiKey,
      setBearerToken,
      setConfig,
      setHost,
      setLocale,
      sockets,
    ],
  );

  return <apiContext.Provider value={value}>{children}</apiContext.Provider>;
}
