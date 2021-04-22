import useUser from "@/hooks/useUser";
import makeSecuredRequest from "@/utils/makeSecuredRequest";
import { getAccessToken } from "misc/token";
import { useEffect, useState } from "react";
import Card from "./Card";
import styles from "@/styles/cards.module.css";

const Cards = () => {
  const [cards, setCards] = useState([]);
  let token = getAccessToken();

  const { user } = useUser();

  const fetchCards = async () => {
    const data = await makeSecuredRequest(`/api/cards/user/${user._id}`, "GET");
    setCards(data);
  };

  // The useEffect hook runs once after component has been rendered (componentDidMount)
  // Then runs again if any of it's dependencies changes (componentDidUpdate)

  useEffect(() => {
    user && fetchCards(); // Therefore only run the fetchCards() when `user` has been updated to avoid errors
  }, [fetchCards, cards, user]);

  return (
    <div className={styles.cardWrapper}>
      {cards.map(card => (
        <Card key={card._id} data={card} />
      ))}
    </div>
  );
};

export default Cards;
