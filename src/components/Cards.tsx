import useSWR from "swr";
import useUser from "@/hooks/useUser";
import makeSecuredRequest from "@/utils/makeSecuredRequest";
import Card from "./Card";
import styles from "@/styles/cards.module.css";
import Message from "./Message";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

const fetchCards = async (url: string) => await makeSecuredRequest(url, "GET");

const Cards = ({ navs }) => {
  const [pageIndex, setPageIndex] = useState(1);

  const { user } = useUser();
  const { data, error, isValidating } = useSWR(
    `/api/cards/user/${user?._id}`,
    fetchCards
  ); // useSWR for caching and realtime mutations

  return (
    <>
      <div className={styles.cardsWrapper}>
        {data?.cards?.length === 0 && (
          <Message variant="success">No link previews to show</Message>
        )}
        {data?.cards?.map((card) => (
          <Card key={card._id} data={card} />
        ))}
        {!isValidating && error && (
          <Message variant="danger">Failed to fetch cards</Message>
        )}
      </div>

      <style>{`
      .pagination-buttons {
        position: relative;
        margin: 16px 0;
        display: inline-flex;
        gap: 16px;
      }

      .pagination-buttons button {
        z-index:3;
      }
      `}</style>
    </>
  );
};

export default Cards;
