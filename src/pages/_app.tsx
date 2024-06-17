import '@/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CookiesProvider } from 'react-cookie';
import { ToastContainer } from 'react-toastify';

import type { AppProps } from 'next/app';

export const queryClient = new QueryClient({});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <CookiesProvider>
        <ToastContainer position='bottom-right' autoClose={3000} />
        <Component {...pageProps} />
      </CookiesProvider>
    </QueryClientProvider>
  );
}
