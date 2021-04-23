import useUser from "@/hooks/useUser";
import makeSecuredRequest from "@/utils/makeSecuredRequest";
import { useEffect, useState } from "react";
import Card from "./Card";
import styles from "@/styles/cards.module.css";
import Message from "./Message";

const Cards = () => {
  const [cards, setCards] = useState([]);

  const { user, isAuthenticated, authenticating } = useUser();

  const fetchCards = async () => {
    const data = await makeSecuredRequest(`/api/cards/user/${user._id}`, "GET");
    setCards(data);
  };

  // The useEffect hook runs once after component has been rendered (componentDidMount)
  // Then runs again if any of it's dependencies changes (componentDidUpdate)

  useEffect(() => {
    !authenticating && user && fetchCards(); // Therefore only run the fetchCards() when `user` has been updated to avoid errors
  }, [fetchCards, cards, user]);

  return (
    <div className={styles.cardWrapper}>
      {cards.length == 0 && (
        <Message variant="success">No link previews to show</Message>
      )}
      {cards.map((card) => (
        <Card key={card._id} data={card} />
      ))}
    </div>
  );
};

export default Cards;
