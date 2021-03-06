import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Head from "next/head";
import useUser from "@/hooks/useUser";
const Layout = ({ children }) => {
  const { user } = useUser();
  return (
    <div>
      <Head>
        <meta
          name="description"
          content="Bookmark links to your favorite sites"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        {/* <link
          href="https://fonts.googleapis.com/css2?family=Sen:wght@400;700;800&display=swap"
          rel="stylesheet"
        /> */}
      </Head>

      <main className="app">
        <Header />
        {children}
      </main>

      <Footer />

      <style jsx>
        {`
          .app {
            background-color: var(--main-color);
            ${user && `background-image: url(${user.background}); `}
            background-size: cover;
            background-blend-mode: overlay;
          }
        `}
      </style>
    </div>
  );
};

export default Layout;
