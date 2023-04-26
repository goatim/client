import { createContext, ReactElement, useContext, useMemo, useState } from 'react';
import { QueryClient, QueryClientProvider, Hydrate } from 'react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ApiConfig, ApiProvider } from './api';

export interface GoatimClientContext extends ApiConfig {
  wallet: string;
  setWallet(wallet: string): void;
}

const goatimClientContext = createContext<GoatimClientContext | undefined>(undefined);

export function useGoatimClient(): GoatimClientContext {
  const context = useContext<GoatimClientContext | undefined>(goatimClientContext);
  if (!context) {
    throw new Error('Goatim context not found');
  }
  return context;
}

export interface GoatimClientProps {
  apiKey: string;
  host?: string;
  locale?: string;
  children: ReactElement;
  state?: unknown;
}

export function GoatimClient({
  children,
  host = 'https://api.goatim.com',
  apiKey,
  locale = 'fr',
  state,
}: GoatimClientProps): ReactElement {
  const [wallet, setWallet] = useState<string>('default');

  const value = useMemo<GoatimClientContext>(
    () => ({
      wallet,
      setWallet,
    }),
    [wallet],
  );

  const apiConfig = useMemo<ApiConfig>(() => {
    return {
      host,
      api_key: apiKey,
      locale,
    };
  }, [apiKey, host, locale]);

  const [queryClient] = useState(() => new QueryClient());

  return (
    <goatimClientContext.Provider value={value}>
      <ApiProvider config={apiConfig}>
        <QueryClientProvider client={queryClient} contextSharing>
          <Hydrate state={state}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
          </Hydrate>
        </QueryClientProvider>
      </ApiProvider>
    </goatimClientContext.Provider>
  );
}
