const Card = ({ data }) => {
  return (
    <>
      <div className="cardContainer">
        <div className="cardWrapper">
          {data.image?.length > 3 && (
            <img className="cardImage" src={data.image} alt={data.title} />
          )}
          <div className="cardText">
            <h1 className="cardTitle">{data.title}</h1>
            <p>{data.description}</p>
          </div>
        </div>
      </div>
      <style jsx>{`
        .cardContainer {
          display: grid;
          place-items: center;
        }

        .cardWrapper {
          width: 300px;
        }

        .cardImage {
          display: flex;
          margin: auto;
          width: 100%;
          height: 150px;
          object-fit: contain;
          border-radius: 20px;
        }

        .cardTitle {
          font-size: 1.2rem;
        }
      `}</style>
    </>
  );
};

export default Card;
