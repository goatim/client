import { ReactElement, useState, createContext, useMemo, useContext } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ApiConfig, ApiProvider } from './api';

const queryClient = new QueryClient();

export interface FridayClientContext extends ApiConfig {
  wallet: string;
  setWallet(wallet: string): void;
}

const fridayClientContext = createContext<FridayClientContext | undefined>(undefined);

export function useFridayClient(): FridayClientContext {
  const context = useContext<FridayClientContext | undefined>(fridayClientContext);
  if (!context) {
    throw new Error('Friday context not found');
  }
  return context;
}

export interface Props {
  apiKey: string;
  host?: string;
  locale?: string;
  children: ReactElement;
}

export default function FridayClient({
  children,
  host = 'https://api.fridaygame.fr',
  apiKey,
  locale = 'fr',
}: Props): ReactElement {
  const [wallet, setWallet] = useState<string>('default');

  const value = useMemo<FridayClientContext>(
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
    <fridayClientContext.Provider value={value}>
      <ApiProvider config={apiConfig}>
        <QueryClientProvider client={queryClient}>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ApiProvider>
    </fridayClientContext.Provider>
  );
}
