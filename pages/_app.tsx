import { AppProps } from 'next/app'
import { Provider as AuthProvider } from 'next-auth/client';
import './_app.scss';

export default function HEDIApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider session={pageProps.session}>
      <Component {...pageProps} />
    </AuthProvider>
  );
}