import useSWR from "swr";
import useUser from "@/hooks/useUser";
import makeSecuredRequest from "@/utils/makeSecuredRequest";
import Card from "./Card";
import styles from "@/styles/cards.module.css";
import Message from "./Message";

const fetchCards = async (url: string) => await makeSecuredRequest(url, "GET");

const Cards: React.FC<{
  category?: string | string[];
  reaction?: string | string[];
}> = ({ category, reaction }) => {
  const { user } = useUser();

  const { data, error, isValidating, mutate } = useSWR(
    category
      ? [`/api/cards/user/${user?._id}?category=${category}`, category]
      : [`/api/cards/user/${user?._id}?reaction=${reaction}`, reaction],
    fetchCards
  ); // useSWR for caching and realtime mutations

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
