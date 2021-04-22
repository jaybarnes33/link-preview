import { Button } from "react-bootstrap";

const Card = ({ data }) => {
  return (
    <>
      <div className="cardContainer">
        <div className="cardWrapper">
          {data.image && data.image.length > 3 && (
            <img className="cardImage" src={data.image} alt={data.title} />
          )}
          <div className="cardText">
            <h1 className="cardTitle">{data.title}</h1>
            {data.description && <p>{data.description.substring(0, 91)} ...</p>}

            <a className="cardButton" href={data.link}>
              <i className="bi bi-chevron-right"></i>
            </a>
          </div>
        </div>
      </div>
      <style jsx>{`
        .cardContainer {
          display: grid;
          place-items: center;
        }

        .cardWrapper {
          box-shadow: 0 0px 5px 0 rgba(0, 0, 0, 0.3);
          padding: 30px;
          border-radius: 10px;
          background-color: #ffffff;
          width: 250px;
          height: 450px;
          margin: 20px;
          position: relative;
        }

        .cardImage {
          display: flex;
          margin: auto;
          width: 100%;
          height: 160px;
          object-fit: cover;

          border: 1px solid #1597bb;
          padding: -5px;
          border-radius: 20px;
          margin-bottom: 10px;
        }

        .cardTitle {
          font-size: 1.3rem;
          color: #325288;

          font-weight: bold;
        }

        .cardText {
          padding: 20px 0;
        }
        .cardButton {
          position: absolute;
          right: -1px;
          background-color: #325288;
          color: #f4f4f4;
          padding: 15px 20px;
          bottom: -1px;
          border-radius: 10px 0 10px 0;
        }

        .cardButton i {
          font-size: 1.3rem;
        }
      `}</style>
    </>
  );
};

export default Card;
