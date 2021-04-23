import makeSecuredRequest from "@/utils/makeSecuredRequest";
import styles from "@/styles/cards.module.css";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import Card from "./Card";
import Loader from "./Loader";
import Message from "./Message";
import scrapeData from "@/utils/scrapeData";
import Router from "next/router";

const AddLink = () => {
  const [link, setLink] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [isDone, setisDone] = useState(false);
  const [data, setData] = useState({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);

      const data = await makeSecuredRequest("/api/cards/", "POST", {
        url: link,
      });

      setData(data);

      setLoading(false);
      setisDone(true);
      setLink("");
      Router.replace("/");
    } catch (error) {
      setLoading(false);
      setMessage(error.message);
    }
  };

  const handleClear = () => {
    setLink("");
    setLoading(false);
    setisDone(false);
    setShow(!show);
  };

  const handleShow = () => {
    setShow(!show);
    setLink("");
    setisDone(false);
    setMessage("");
  };
  const handleForm = (value: string) => {
    setisDone(false);
    setLink(value);
  };
  return (
    <section className={styles.formContainer}>
      <Button variant="light" className={styles.addLink} onClick={handleShow}>
        Post a link
      </Button>

      {show && (
        <div>
          <Form className={styles.form} onSubmit={handleSubmit}>
            {loading && <Loader />}
            {message && <Message variant="danger" children={message} />}
            <h1 className={styles.heading}>Post a Link</h1>
            {isDone && !loading && <Card data={data} />}
            <Form.Control
              id="input"
              className={styles.input}
              type="url"
              value={link}
              placeholder="Enter a link to preview"
              onChange={(e) => handleForm(e.target.value)}
            />
            <div className={styles.buttons}>
              <Button
                onClick={handleSubmit}
                className={`my-2 px-4 ${styles.previewButton}`}
              >
                Get link Preview
              </Button>
              <Button
                onClick={handleClear}
                className={`my-2 px-4 `}
                variant="light"
              >
                Cancel
              </Button>
            </div>
          </Form>
        </div>
      )}
    </section>
  );
};

export default AddLink;
