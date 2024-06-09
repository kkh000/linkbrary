import '@/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ToastContainer position='bottom-right' autoClose={3000} />
      <Component {...pageProps} />
    </>
  );
}
