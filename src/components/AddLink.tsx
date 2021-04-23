import makeSecuredRequest from "@/utils/makeSecuredRequest";
import styles from "@/styles/cards.module.css";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import Card from "./Card";
import Loader from "./Loader";
import Message from "./Message";
import scrapeData from "@/utils/scrapeData";

const AddLink = () => {
  const [link, setLink] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDone, setisDone] = useState(false);
  const [data, setData] = useState({});

  const showPreview = async () => {
    const preview = await scrapeData(link);
    console.log(preview);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);

      const data = await makeSecuredRequest("/api/cards/", "POST", {
        url: link,
      });

      setData(data);
      console.log(data);
      setLoading(false);
      setisDone(true);
      setLink("");
    } catch (error) {
      setLoading(false);
      setMessage(error.message);
    }
  };

  const handleClear = () => {
    setLink("");
    setLoading(false);
    setisDone(false);
    const form = document.getElementById("form");
    form?.classList.remove("show");
  };
  return (
    <div className={styles.form} style={{ display: "none" }} id="form">
      <h1 className={styles.heading}>Post a Link</h1>
      <Form onSubmit={handleSubmit}>
        {loading && <Loader />}
        {message && <Message variant="danger" children={message} />}
        {isDone && !loading && <Card data={data} />}
        <Form.Control
          id="input"
          className={styles.input}
          type="url"
          value={link}
          placeholder="Enter a link to preview"
          onChange={(e) => setLink(e.target.value)}
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
  );
};

export default AddLink;
