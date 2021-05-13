import { useEffect, useState } from "react";
import styles from "@/styles/dashboard.module.css";
import useSWR from "swr";
import Router from "next/router";
import useUser from "@/hooks/useUser";
import Cards from "@/components/Cards";
import Layout from "@/components/Layout";
import { Nav } from "react-bootstrap";
import makeSecuredRequest from "@/utils/makeSecuredRequest";

const links = () => {
  const { user } = useUser();
  const fetchCards = async (url: string) =>
    await makeSecuredRequest(url, "GET");
  const { data, error, isValidating } = useSWR(
    `/api/cards/user/${user?._id}`,
    fetchCards
  );
  const { isAuthenticated, authenticating } = useUser();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!authenticating && !isAuthenticated) {
      // if we're done loading and user isn't authenticated
      Router.replace("/login");
    }
  }, [isAuthenticated, authenticating]); // add authenticating to dependencies

  const categories = new Map(data?.cards.map((card) => [card.category]));
  return (
    <Layout>
      <div className={styles.wrapper}>
        {console.log(categories)}
        <Cards />
      </div>
    </Layout>
  );
};

export default links;
