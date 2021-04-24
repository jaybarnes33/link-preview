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
    `/api/cards/user/${user?._id}?page=${pageIndex}&limit=10`,
    fetchCards
  ); // useSWR for caching and realtime mutations
  const nextPage = () => data?.hasMore && setPageIndex(pageIndex + 1);
  const prevPage = () => pageIndex > 1 && setPageIndex(pageIndex - 1);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [nextPage, prevPage]);

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
      {data?.cards.length > 0 && navs != false && (
        <div className="pagination-buttons">
          {pageIndex != 1 && (
            <Button
              variant="light"
              className={styles.paginationbtn}
              onClick={prevPage}
            >
              <i className="bi bi-chevron-left"></i>
            </Button>
          )}

          {data?.hasMore && (
            <Button
              variant="light"
              className={styles.paginationbtn}
              onClick={nextPage}
            >
              <i className="bi bi-chevron-right"></i>
            </Button>
          )}
        </div>
      )}
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
