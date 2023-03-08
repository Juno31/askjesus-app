import { Html, Head, Main, NextScript } from "next/document";
import { Script } from "next/script";
export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>Ask Jesus</title>
      </Head>
      <body>
        <Main />
        <NextScript />
        <Script
          id="beusable-script"
          dangerouslySetInnerHTML={{
            __html: `          
<script type="text/javascript">
(function(w, d, a){
    w.__beusablerumclient__ = {
        load : function(src){
            var b = d.createElement("script");
            b.src = src; b.async=true; b.type = "text/javascript";
            d.getElementsByTagName("head")[0].appendChild(b);
        }
    };w.__beusablerumclient__.load(a + "?url=" + encodeURIComponent(d.URL));
})(window, document, "//rum.beusable.net/load/b220608e154414u003");
</script>`,
          }}
        />
      </body>
    </Html>
  );
}
