import "@/styles/globals.css";
import "@/styles/custom.css";
import { useEffect } from "react";
import Script from "next/script";
import Head from "next/head";
import { DefaultSeo } from "next-seo";

const DEFAULT_SEO = {
  title: "AskJesus | AI Jesus Chatbot",
  description: "Hi, I'm Jesus. Ask me anything.",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://askjesus.me",
    title: "AskJesus | AI Jesus Chatbot",
    site_name: "AskJesus",
    images: [
      {
        url: "https://askjesus.me/ogimage-v01.png",
        width: 285,
        height: 167,
        alt: "AskJesus openGraph Image",
      },
    ],
  },
};

export default function App({ Component, pageProps }) {
  useEffect(function () {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);

    window.addEventListener("resize", function () {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    });
  }, []);

  return (
    <>
      <Head>
        <title>AskJesus</title>
        <meta name="description" content="Hi, I'm Jesus. Ask me anything." />
        <meta property="og:type" content="website" />
        <meta
          id="og:image"
          property="og:image"
          content="https://askjesus.me/ogimage-v01.png"
        />
        <meta property="og:title" content="AskJesus | AI Jesus Chatbot" />
        <meta
          property="og:description"
          content="Hi, I'm Jesus. Ask me anything."
        />
      </Head>
      {process?.env?.NODE_ENV === "production" && (
        <>
          <Script
            id="beusable-script"
            dangerouslySetInnerHTML={{
              __html: `          
(function(w, d, a){
    w.__beusablerumclient__ = {
        load : function(src){
            var b = d.createElement("script");
            b.src = src; b.async=true; b.type = "text/javascript";
            d.getElementsByTagName("head")[0].appendChild(b);
        }
    };w.__beusablerumclient__.load(a + "?url=" + encodeURIComponent(d.URL));
})(window, document, "//rum.beusable.net/load/b220608e154414u003");
`,
            }}
          />
          <Script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-T3LCKS2W46"
          />
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
          />
        </>
      )}

      <Component {...pageProps} />
    </>
  );
}
