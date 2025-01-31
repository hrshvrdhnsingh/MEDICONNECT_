import "@/styles/globals.css";
import { NextUIProvider } from "@nextui-org/react";

function MyApp({ Component, pageProps }) {
  return (
    <NextUIProvider>
      <div style={{ backgroundColor: "#182f5d", minHeight: "100vh", width: "100vw" }}>
        <Component {...pageProps} />
      </div>
    </NextUIProvider>
  );
}

export default MyApp;
