import { AppProps } from 'next/app'
import { Provider as AuthProvider } from 'next-auth/client';

// HACK using precompiled default carbon css while not customizing styling to speed up build
// switch '...carbon-components.min.css' with '..._app.scss' for applying styles 
//import './_app.scss';
import 'carbon-components/css/carbon-components.min.css';

export default function HEDIApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider session={pageProps.session}>
      <Component {...pageProps} />
    </AuthProvider>
  );
}