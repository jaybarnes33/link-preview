import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Head from "next/head";
const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        {/* <link
          href="https://fonts.googleapis.com/css2?family=Sen:wght@400;700;800&display=swap"
          rel="stylesheet"
        /> */}
      </Head>
      <main className="app">{children}</main>

      <Footer />
    </div>
  );
};

export default Layout;
