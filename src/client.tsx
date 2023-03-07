import { createContext, ReactElement, useContext, useMemo, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ApiConfig, ApiProvider } from './api';

const queryClient = new QueryClient();

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
}

export function GoatimClient({
  children,
  host = 'https://api.goatim.com',
  apiKey,
  locale = 'fr',
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

  return (
    <goatimClientContext.Provider value={value}>
      <ApiProvider config={apiConfig}>
        <QueryClientProvider client={queryClient}>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ApiProvider>
    </goatimClientContext.Provider>
  );
}
