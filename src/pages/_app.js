import "@/styles/globals.css";
import "@/styles/custom.css";
import { useEffect } from "react";
import Script from "next/script";

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
      <Component {...pageProps} />
    </>
  );
}
