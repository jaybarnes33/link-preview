import useUser from "@/hooks/useUser";
import makeSecuredRequest from "@/utils/makeSecuredRequest";
import { useState } from "react";
import { Button, Dropdown, Form } from "react-bootstrap";
import Message from "./Message";

const Card = ({ data, mutate }) => {
  const [showCategory, setShowCategory] = useState(false);
  const [showReaction, setShowReaction] = useState(false);
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");
  const { user } = useUser();

  const addCategory = async (e) => {
    e.preventDefault();
    try {
      await makeSecuredRequest(`/api/cards/${data._id}`, "PUT", {
        category: category,
      });
      mutate();
      setShowCategory(false);
    } catch (error) {
      setMessage(error.message);
    }
  };
  const handleDelete = async () => {
    try {
      const response = await makeSecuredRequest(
        `/api/cards/${data._id}`,
        "DELETE"
      );

      alert(response);
      mutate();
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleReactions = async (e) => {
    try {
      await makeSecuredRequest(`/api/cards/${data._id}`, "PUT", {
        reaction: e.target.id,
      });

      setShowReaction(false);
      mutate();
    } catch (error) {}
  };

  return (
    <>
      {message && <Message>{message}</Message>}
      {showCategory && (
        <dialog open>
          <Form onSubmit={addCategory}>
            <Form.Group>
              <Form.Label>Category</Form.Label>
              <Form.Control
                name="category"
                aria-label="Enter Category"
                type="text"
                onChange={(e) => setCategory(e.target.value.toLowerCase())}
                placeholder={data?.category ? data?.category : "Enter category"}
              />
            </Form.Group>

            <Button variant={"warning"} type="submit" className="mt-1 mr-2">
              Send
            </Button>
            <Button
              variant={"warning"}
              onClick={(e) => setShowCategory(false)}
              className="mt-1 "
            >
              Close
            </Button>
          </Form>
        </dialog>
      )}
      <div className="cardWrapper">
        <span className="reaction">
          {data.reaction == "like" && <span title="Like"> ❤️</span>}
          {data.reaction == "support" && (
            <span title="Support"> &#128079;</span>
          )}
          {data.reaction == "confused" && (
            <span title="Confused"> &#128533;</span>
          )}
          {data.reaction == "angry" && <span title="angry"> &#128545;</span>}
        </span>
        <Dropdown>
          <Dropdown.Toggle variant="dark" id="dropdown-basic">
            <i className="bi bi-three-dots-vertical"></i>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={handleDelete}>Delete</Dropdown.Item>
            <Dropdown.Item onClick={(e) => setShowReaction(!showReaction)}>
              Reaction
            </Dropdown.Item>
            <Dropdown.Item onClick={(e) => setShowCategory(!showCategory)}>
              Category
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        {data.image?.length > 3 && (
          <img className="cardImage" src={data.image} alt={data.title} />
        )}

        {data?.category && (
          <div className="category">
            {" "}
            <i className="bi bi-pin mr-1"></i>
            {data.category}
          </div>
        )}
        {showReaction && (
          <div className="reactions">
            <div>
              <span id="like" title="Like" onClick={(e) => handleReactions(e)}>
                ❤️
              </span>
            </div>
            <div>
              <span
                id="support"
                onClick={(e) => handleReactions(e)}
                title="Support"
              >
                &#128079;
              </span>
            </div>
            <div>
              <span
                id="confused"
                onClick={(e) => handleReactions(e)}
                title="Confused"
              >
                &#128533;
              </span>
            </div>
            <div>
              <span
                id="angry"
                onClick={(e) => handleReactions(e)}
                title="Angry"
              >
                &#128545;
              </span>
            </div>
          </div>
        )}
        <div className="cardText">
          <h1 className="cardTitle">{data.title}</h1>
          {data.description && <p>{data.description.substring(0, 91)} ...</p>}

          <a
            className="cardButton btn btn-warning"
            href={data.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="bi bi-chevron-right"></i>
          </a>
        </div>
      </div>
      <style jsx>{`
        .category {
          position: relative;
          right: 10px;
          font-weight: bold;
          text-align: right;
          font-size: 0.9rem;
          text-transform: capitalize;
        }
        dialog {
          position: fixed;
          z-index: 999;
          padding: 30px;
          border: 1px solid rgba(0, 0, 0, 0.3);
        }
        .cardWrapper {
          box-shadow: 0 0px 5px 0 rgba(0, 0, 0, 0.3);
          padding: 50px 30px;
          border-radius: 10px;
          background-color: #ffffff;
          width: 240px;
          height: 475px;
          margin: 20px;
          position: relative;
        }

        .emoji {
          background-color: yellow;
        }

        .cardImage {
          display: flex;
          margin: auto;
          width: 100%;
          height: 120px;
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

        .reactions {
          display: grid;
          grid-template-columns: repeat(4, 20%);
        }

        .reactions div {
          position: relative;
        }
        .reactions span {
          font-size: 1.2rem;
        }

        .reactions span:hover {
          cursor: pointer;
          transform: scale(1.3);
        }
        .reaction {
          display: flex;
          width: 100%;
          position: absolute;
          top: -1.6rem;

          left: -1rem;
        }

        .reaction span {
          font-size: 2rem;
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

        @media screen and (max-width: 700px) {
          .cardWrapper {
            width: 215px;
          }
        }

        @media screen and (min-width: 1500px) {
          .cardWrapper {
            width: 240px;
          }
        }
      `}</style>
    </>
  );
};

export default Card;
