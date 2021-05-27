import { AppProps } from 'next/app';
import { Provider } from 'next-auth/client';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import React, { useContext, useEffect } from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import Layout from '../components/layout'

import theme from '../lib/theme';
import CustomThemeProvider, { CustomThemeContext } from '../lib/themes/CustomThemeProvider'

export const client = new ApolloClient({
    uri: '/api/graphql',
    cache: new InMemoryCache(),
});

// Determines if we are running on server or in client.
const isServerSideRendered = () => {
    return typeof window === 'undefined';
};

/**
 * Accessibility tool - outputs to devtools console on dev only and client-side only.
 * @see https://github.com/dequelabs/axe-core-npm
 */
if (process.env.NODE_ENV !== 'production' && !isServerSideRendered()) {
    import('react-dom').then((ReactDOM) => {
        import('@axe-core/react').then((axe) => {
            axe.default(React, ReactDOM, 1000, {});
        });
    });
}

const App = ({ Component, pageProps }: AppProps) => {

    useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement?.removeChild(jssStyles);
        }
    }, []);

    return (
        <Provider session={pageProps.session}>
            <ApolloProvider client={client}>
                <CustomThemeProvider>
                    <Layout title="Next.js example">

                        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                        <CssBaseline />
                        <Component {...pageProps} />
                    </Layout>
                </CustomThemeProvider>
            </ApolloProvider>
        </Provider>
    );
};

export default App;