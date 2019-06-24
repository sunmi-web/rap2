import '@config/initializer';
import { AppProps, Container, DefaultAppIProps } from 'next/app';
import { PagePropsContext, composePageProps } from '@core/next-compose';
import ErrorBoundary from '@config/error';
import { NProgressContainer } from '@core/nprogress/component';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { enhancedCtx } from '@helpers/page-props';
import { lexTheme } from '@config/theme/lex-theme';

type Props = AppProps<any, any> & DefaultAppIProps & { statusCode: any };

const initialAppProps = enhancedCtx(async ({ Component, ctx }) => {
  // 初始化页面参数
  let pageProps = {};
  let statusCode = (ctx.res && ctx.res.statusCode) || 200;
  if (Component.getInitialProps) {
    try {
      pageProps = await Component.getInitialProps(ctx);
    } catch (error) {
      // FetchError
      statusCode = error.code || 500;
    }
  }
  return { pageProps, statusCode };
});

export default composePageProps(initialAppProps)((props: Props) => {
  const { Component, pageProps, statusCode } = props;
  return (
    <ErrorBoundary statusCode={statusCode}>
      <PagePropsContext.Provider value={pageProps}>
        <ThemeProvider theme={lexTheme}>
          <Container>
            <NProgressContainer />
            <Component />
          </Container>
        </ThemeProvider>
      </PagePropsContext.Provider>
    </ErrorBoundary>
  );
});
