import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import useUser from "../hooks/useUser";
import { useEffect } from "react";
import Layout from "@/components/Layout";
import Link from "next/link";
import { Button } from "react-bootstrap";
export default function Home() {
  const { replace } = useRouter();

  const { user, authenticating, isAuthenticated } = useUser();

  useEffect(() => {
    // Check if loading is completed then if user is authenticated
    if (!authenticating && isAuthenticated) {
      replace("/dashboard");
    }
  }, [isAuthenticated, authenticating]);

  return (
    <Layout>
      <Head>
        <title>Pin Links</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div>
          <p className={styles.hero}> Save all your links</p>
          <Link href="/login">
            <Button className={`mr-2 ${styles.login}`}>Login</Button>
          </Link>
          <Link href="/register">
            <Button className={`mr-2 ${styles.register}`}>Register</Button>
          </Link>
        </div>
      </main>
    </Layout>
  );
}
