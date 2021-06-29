import CardContextProvider from "@/components/CardContext";
import "../styles/bootstrap.min.css";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <CardContextProvider>
      <Component {...pageProps} />
    </CardContextProvider>
  );
}

export default MyApp;
