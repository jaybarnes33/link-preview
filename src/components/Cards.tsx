import useSWR from "swr";
import useUser from "@/hooks/useUser";
import makeSecuredRequest from "@/utils/makeSecuredRequest";
import Card from "./Card";
import styles from "@/styles/cards.module.css";
import Message from "./Message";
import { useState } from "react";
import { Button } from "react-bootstrap";

const fetchCards = async (url: string) => await makeSecuredRequest(url, "GET");

const Cards = () => {
  const [pageIndex, setPageIndex] = useState(1);

  const { user } = useUser();
  const { data, error, isValidating } = useSWR(
    `/api/cards/user/${user?._id}?page=${pageIndex}&limit=2`,
    fetchCards
  ); // useSWR for caching and realtime mutations

  const nextPage = () =>
    data?.totalCount < data?.cards.length && setPageIndex(pageIndex + 1);
  const prevPage = () => pageIndex > 1 && setPageIndex(pageIndex - 1);

  return (
    <>
      <div className={styles.cardWrapper}>
        {data?.cards?.length === 0 && (
          <Message variant="success">No link previews to show</Message>
        )}
        {data?.cards?.map(card => (
          <Card key={card._id} data={card} />
        ))}
        {!isValidating && error && (
          <Message variant="danger">Failed to fetch cards</Message>
        )}
      </div>
      <div className="pagination-buttons">
        <Button onClick={prevPage}>Prev Page</Button>
        <Button onClick={nextPage}>Next Page</Button>
      </div>
      <style>{`
      .pagination-buttons {
        margin: 16px 0;
        display: flex;
        gap: 16px;
      }
      `}</style>
    </>
  );
};

export default Cards;
