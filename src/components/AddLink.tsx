import makeSecuredRequest from "@/utils/makeSecuredRequest";
import styles from "@/styles/cards.module.css";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import Card from "./Card";
import Loader from "./Loader";
import Message from "./Message";

const AddLink = () => {
  const [link, setLink] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDone, setisDone] = useState(false);
  const [data, setData] = useState({});
  const [cancel, setCancel] = useState({});
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (!cancel) {
        const data = await makeSecuredRequest("/api/cards/", "POST", {
          url: link,
        });

        setData(data);
        console.log(data);
        setLoading(false);
        setisDone(true);
      }
    } catch (error) {
      setLoading(false);
      setMessage(error.message);
    }
  };

  const handleClear = () => {
    setLink("");
    setLoading(false);
    setisDone(false);
    setCancel(true);
  };
  return (
    <Form onSubmit={handleSubmit}>
      {loading && <Loader />}
      {message && <Message variant="danger" children={message} />}
      {isDone && !loading && <Card data={data} />}
      <Form.Control
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
          Generate link Preview
        </Button>
        <Button onClick={handleClear} className={`my-2 px-4 `} variant="light">
          Cancel
        </Button>
      </div>
    </Form>
  );
};

export default AddLink;
