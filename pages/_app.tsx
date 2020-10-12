import { AppProps } from 'next/app'
import './_app.scss';

export default function HEDIApp({ Component, pageProps }: AppProps) {
  return (
    <Component {...pageProps} />
  );
}