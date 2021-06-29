import useSWR from "swr";
import useUser from "@/hooks/useUser";
import makeSecuredRequest from "@/utils/makeSecuredRequest";
import Card from "./Card";
import styles from "@/styles/cards.module.css";
import Message from "./Message";
import { useCardContext } from "./CardContext";

const fetchCards = async (url: string) => await makeSecuredRequest(url, "GET");

const Cards: React.FC<{
  category?: string | string[];
  reaction?: string | string[];
}> = () => {
  const { data, error, mutate, isValidating } = useCardContext();

  return (
    <>
      {data?.cards?.length === 0 && (
        <Message variant="success">No link previews to show</Message>
      )}

      <div className={styles.cardsWrapper}>
        {data?.cards?.map((card) => (
          <Card key={card._id} data={card} mutate={mutate} />
        ))}
        {!isValidating && error && (
          <Message variant="danger">Failed to fetch cards</Message>
        )}
      </div>
    </>
  );
};

export default Cards;
