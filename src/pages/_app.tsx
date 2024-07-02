import '@/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { CookiesProvider } from 'react-cookie';
import { ToastContainer } from 'react-toastify';

import type { AppProps } from 'next/app';

export const queryClient = new QueryClient({});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <CookiesProvider>
        <ThemeProvider attribute='class'>
          <ToastContainer position='bottom-right' autoClose={300} hideProgressBar={true} />
          <Component {...pageProps} />
        </ThemeProvider>
      </CookiesProvider>
    </QueryClientProvider>
  );
}
