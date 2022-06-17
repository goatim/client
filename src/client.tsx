import { ReactElement, useState, createContext, useMemo, useContext } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ApiConfig, ApiProvider } from './api';

const queryClient = new QueryClient();

export interface FridayClientContext extends ApiConfig {
  wallet: string | null;
  setWallet(wallet: string | null): void;
}

const fridayClientContext = createContext<FridayClientContext | undefined>(undefined);

export function useFridayClient(): FridayClientContext {
  const context = useContext<FridayClientContext | undefined>(fridayClientContext);
  if (!context) {
    throw new Error('Friday context not found');
  }
  return context;
}

export interface Props
  extends Omit<ApiConfig, 'apiKey' | 'bearerToken'>,
    Required<Pick<ApiConfig, 'apiKey'>> {
  children: ReactElement;
}

export default function FridayClient({
  children,
  host = 'https://api.fridaygame.fr',
  apiKey,
  locale = 'fr',
}: Props): ReactElement {
  const [wallet, setWallet] = useState<string | null>('default');

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
      apiKey,
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
