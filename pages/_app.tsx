import { AppProps } from 'next/app'
import Head from 'next/head'
import React from 'react'
import { RecoilRoot } from 'recoil'




const App = ({ Component, pageProps }: AppProps) => (
  <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <title>Home Status Dashboard</title>
        <meta property="og:title" content="Home Environment Dashboard" />
        <meta
          property="og:description"
          content="Let's visualize the environment of your home acquired by Netatmo."
        />
        <meta name="keywords" content="" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://netatmo-graph.vercel.app/" />
        <meta property="og:image" content="https://i.imgur.com/bnJMK70.png" />
        <meta property="og:site_name" content="Home Environment Dashboard" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@meitante1conan" />
        <meta name="twitter:url" content="https://netatmo-graph.vercel.app/" />
        <meta name="twitter:title" content="Home Environment Dashboard" />
        <meta
          name="twitter:description"
          content="Let's visualize the environment of your home acquired by Netatmo."
        />
        <meta name="twitter:image" content="https://i.imgur.com/bnJMK70.png" />
        <meta property="fb:app_id" content="280941406476272" />
        <link rel="canonical" href="https://netatmo-graph.vercel.app/" />
        <link rel="apple-touch-icon" href="https://i.imgur.com/bnJMK70.png" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
  </>
)

export default App
