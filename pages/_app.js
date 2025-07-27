// pages/_app.js
import '../styles/globals.css';
import Head from 'next/head'; // Make sure Head is imported

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* Use the logo.png file as the favicon */}
        <link rel="icon" type="image/png" href="/logo.png" />
        {/* You can optionally specify a size if needed, though often not required for basic favicon usage */}
        {/* <link rel="icon" type="image/png" sizes="any" href="/logo.png" />  */}
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;