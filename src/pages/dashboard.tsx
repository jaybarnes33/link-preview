import Layout from "@/components/Layout";
import { useEffect } from "react";
import styles from "@/styles/dashboard.module.css";
import AddLink from "@/components/AddLink";
import Router from "next/router";
import useUser from "@/hooks/useUser";
const dashboard = () => {
  const { isAuthenticated, authenticating } = useUser();

  useEffect(() => {
    if (!authenticating && !isAuthenticated) {
      // if we're done loading and user isn't authenticated
      Router.replace("/login");
    }
  }, [isAuthenticated, authenticating]); // add authenticating to dependencies
  return (
    <Layout>
      <div className={styles.wrapper}>
        <AddLink />
      </div>
    </Layout>
  );
};

export default dashboard;
