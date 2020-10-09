import { AppProps } from 'next/app'

export default function HEDIApp({ Component, pageProps }: AppProps) {
  return (
    <Component {...pageProps} />
  );
}