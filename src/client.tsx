import { ReactElement, useState, createContext, useMemo, useContext } from 'react';
import { ApiContext, ApiParams, ApiProvider } from '@cezembre/fronts';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { persistQueryClient } from 'react-query/persistQueryClient-experimental';
import { createWebStoragePersistor } from 'react-query/createWebStoragePersistor-experimental';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
});

const localStoragePersistor = createWebStoragePersistor({ storage: window.localStorage });

persistQueryClient({
  queryClient,
  persistor: localStoragePersistor,
}).then();

export interface FridayClientContext {
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
  extends Omit<ApiParams, 'apiKey' | 'bearerToken'>,
    Required<Pick<ApiContext, 'apiKey'>> {
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

  return (
    <fridayClientContext.Provider value={value}>
      <ApiProvider host={host} apiKey={apiKey} locale={locale}>
        <QueryClientProvider client={queryClient}>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ApiProvider>
    </fridayClientContext.Provider>
  );
}
