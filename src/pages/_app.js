import "@/styles/globals.css";
import "@/styles/custom.css";
import { useEffect } from "react";

export default function App({ Component, pageProps }) {
  useEffect(function () {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);

    window.addEventListener("resize", function () {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    });

    console.log(vh);
  }, []);

  return <Component {...pageProps} />;
}
