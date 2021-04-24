import makeSecuredRequest from "@/utils/makeSecuredRequest";
import { Button } from "react-bootstrap";

const Card = ({ data }) => {
  const handleDelete = async () => {
    const response = await makeSecuredRequest(
      `/api/cards/${data._id}`,
      "DELETE"
    );
    console.log(response);
    alert(response);
  };
  return (
    <>
      <div className="cardContainer">
        <div className="cardWrapper">
          <button
            className="deleteButton btn btn-warning"
            onClick={handleDelete}
          >
            {" "}
            <i className="bi  bi-trash"></i>
          </button>
          {data.image?.length > 3 && (
            <img className="cardImage" src={data.image} alt={data.title} />
          )}
          <div className="cardText">
            <h1 className="cardTitle">{data.title}</h1>
            {data.description && <p>{data.description.substring(0, 91)} ...</p>}

            <a className="cardButton btn btn-warning" href={data.link}>
              <i className="bi bi-chevron-right"></i>
            </a>
          </div>
        </div>
      </div>
      <style jsx>{`
        .cardContainer {
          display: flex;
          justify-content: center;
          position: relative;
          z-index: 3;
        }

        .deleteButton {
          position: absolute;
          left: -3px;
          top: -1px;

          border: none;
          border-radius: 10px 0 10px 0;
          padding: 10px 20px;
        }

        .cardWrapper {
          box-shadow: 0 0px 5px 0 rgba(0, 0, 0, 0.3);
          padding: 50px 30px;
          border-radius: 10px;
          background-color: #ffffff;
          width: 280px;
          height: 470px;
          margin: 20px;
          position: relative;
        }

        .cardImage {
          display: flex;
          margin: auto;
          width: 100%;
          height: 160px;
          object-fit: cover;

          border: 1px solid #2978b5;
          padding: 5px;
          border-radius: 20px;
          margin-bottom: 10px;
        }

        .cardTitle {
          font-size: 1.3rem;
          color: #2978b5;

          font-weight: bold;
        }

        .cardText {
          padding: 20px 0;
        }
        .cardButton {
          position: absolute;
          right: -1px;

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
