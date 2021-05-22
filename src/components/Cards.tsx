import useSWR from "swr";
import useUser from "@/hooks/useUser";
import makeSecuredRequest from "@/utils/makeSecuredRequest";
import Card from "./Card";
import styles from "@/styles/cards.module.css";
import Message from "./Message";

import { Container } from "react-bootstrap";

const fetchCards = async (url: string) => await makeSecuredRequest(url, "GET");

const Cards = ({ category }) => {
  const { user } = useUser();
  const { data, error, isValidating } = useSWR(
    [`/api/cards/user/${user?._id}?category=${category}`, category],
    fetchCards
  ); // useSWR for caching and realtime mutations

  return (
    <>
      {data?.cards?.length === 0 && (
        <Message variant="success">No link previews to show</Message>
      )}
      <Container>
        <div className={styles.cardsWrapper}>
          {data?.cards?.map((card) => (
            <Card key={card._id} data={card} />
          ))}
          {!isValidating && error && (
            <Message variant="danger">Failed to fetch cards</Message>
          )}
        </div>
      </Container>
    </>
  );
};

export default Cards;
