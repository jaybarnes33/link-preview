import { useEffect } from "react";
import styles from "@/styles/dashboard.module.css";

import Router, { useRouter } from "next/router";
import useUser from "@/hooks/useUser";
import Cards from "@/components/Cards";
import Layout from "@/components/Layout";

import Head from "next/head";

const Reactions = () => {
  const router = useRouter();
  const { isAuthenticated, authenticating } = useUser();

  const { reaction } = router.query;
  useEffect(() => {
    if (!authenticating && !isAuthenticated) {
      // if we're done loading and user isn't authenticated
      Router.replace("/login");
    }
  }, [isAuthenticated, authenticating]); // add authenticating to dependencies

  return (
    <Layout>
      <Head>
        <title>Cards || {reaction}</title>
      </Head>

      <div className={styles.wrapper}>
     
        <Cards reaction={reaction} category="" />
      </div>
    </Layout>
  );
};

export default Reactions;
