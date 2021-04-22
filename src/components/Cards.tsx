import useUser from "@/hooks/useUser";
import getUserID from "@/utils/get-userID";
import makeSecuredRequest from "@/utils/makeSecuredRequest";
import { getAccessToken } from "misc/token";
import { useEffect, useState } from "react";
import Card from "./Card";
import styles from "@/styles/cards.module.css";

const Cards = () => {
  const [cards, setCards] = useState([]);
  let token = getAccessToken();
  const userID = getUserID(token);

  const fetchCards = async () => {
    const data = await makeSecuredRequest(`/api/cards/user/${userID}`, "GET");
    setCards(data);
  };

  useEffect(() => {
    fetchCards();
  }, [fetchCards, cards, token]);

  return (
    <div className={styles.cardWrapper}>
      {cards.map((card) => (
        <Card key={card._id} data={card} />
      ))}
    </div>
  );
};

export default Cards;
