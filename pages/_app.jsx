import { Layout } from '../components'
import NProgress from 'nprogress'
import Head from "next/head";
import '../styles/nprogress.css'

import '../styles/globals.scss'
import Router from 'next/router'
NProgress.configure({
  minimum: 0.3,
  easing: 'ease',
  speed: 800,
  showSpinner: false,
  });

function MyApp({ Component, pageProps }) {
  Router.events.on("routeChangeStart", (url) => {
    console.log('change ...')

    NProgress.start()
    
  });
  Router.events.on("routeChangeComplete", (url) => {
    console.log('change ... complete')
    NProgress.done()
  });
  return (
    <Layout>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css" integrity="sha512-42kB9yDlYiCEfx2xVwq0q7hT4uf26FUgSIZBK8uiaEnTdShXjwr8Ip1V4xGJMg3mHkUt9nNuTDxunHF0/EgxLQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />
      </Head>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
