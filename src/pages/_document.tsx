import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          rel="icon"
          href="https://samehadaku.vin/wp-content/uploads/2020/04/cropped-download-1-32x32.jpg"
          sizes="32x32"
        />
        <link
          rel="icon"
          href="https://samehadaku.vin/wp-content/uploads/2020/04/cropped-download-1-192x192.jpg"
          sizes="192x192"
        />
        <link
          rel="apple-touch-icon"
          href="https://samehadaku.vin/wp-content/uploads/2020/04/cropped-download-1-180x180.jpg"
        />

        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css"
          integrity="sha512-5A8nwdMOWrSz20fDsjczgUidUBR8liPYU+WymTZP1lmY9G6Oc7HlZv156XqnsgNUzTyMefFTcsFH/tnJE/+xBg=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <link
          rel="stylesheet"
          id="dashicons-css"
          href="https://samehadaku.vin/wp-includes/css/dashicons.min.css?ver=6.3.2"
          type="text/css"
          media="all"
        />
        <link
          rel="preload"
          as="style"
          href="https://fonts.googleapis.com/css?family=Roboto%3A300%2C400%2C500%2C700&#038;display=swap"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
