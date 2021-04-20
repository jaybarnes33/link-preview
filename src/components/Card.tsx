const Card = ({ image, title, description, link }) => {
  return (
    <>
      <div className="cardWrapper">
        <img className="cardImage" src={image} alt={title} />

        <div className="cardText">
          <h1 className="cardTitle">{title}</h1>
          <p>{description}</p>
        </div>
      </div>
      <style jsx>{``}</style>
    </>
  );
};

export default Card;
