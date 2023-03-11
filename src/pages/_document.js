import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta
          name="theme-color"
          content="#221b31"
          media="(prefers-color-scheme: light)"
        />
        <meta
          name="theme-color"
          content="#221b31"
          media="(prefers-color-scheme: dark)"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
