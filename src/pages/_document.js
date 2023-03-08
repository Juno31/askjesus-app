import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";
export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>Ask Jesus</title>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-T3LCKS2W46"
        ></Script>
        <Script
          id="google-analytics"
          dangerouslySetInnerHTML={{
            __html: `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-T3LCKS2W46');
  `,
          }}
        ></Script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
