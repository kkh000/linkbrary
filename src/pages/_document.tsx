import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='en'>
      <Head />
      <body id='top'>
        <Main />
        <NextScript />
        <div id='portal' />
        <div id='spinner' />
      </body>
    </Html>
  );
}
