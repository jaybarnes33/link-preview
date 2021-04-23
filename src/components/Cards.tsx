import useSWR from "swr";
import useUser from "@/hooks/useUser";
import makeSecuredRequest from "@/utils/makeSecuredRequest";
import Card from "./Card";
import styles from "@/styles/cards.module.css";
import Message from "./Message";

const fetchCards = async (url: string) => await makeSecuredRequest(url, "GET");

const Cards = () => {
  const { user } = useUser();
  const { data: cards, error } = useSWR(
    `/api/cards/user/${user?._id}`,
    fetchCards
  ); // useSWR for caching and realtime mutations

  return (
    <div className={styles.cardWrapper}>
      {cards?.length === 0 && (
        <Message variant="success">No link previews to show</Message>
      )}
      {cards?.map(card => (
        <Card key={card._id} data={card} />
      ))}
    </div>
  );
};

export default Cards;
