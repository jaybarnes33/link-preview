import makeSecuredRequest from "@/utils/makeSecuredRequest";
import styles from "@/styles/cards.module.css";
import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import Loader from "./Loader";
import Message from "./Message";
import useSWR from "swr";
import useUser from "@/hooks/useUser";

const AddLink = () => {
  const [link, setLink] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const { user } = useUser();
  const fetchCards = async (url: string) =>
    await makeSecuredRequest(url, "GET");
  const { data, error, isValidating, mutate } = useSWR(
    [`/api/cards/user/${user?._id}`],
    fetchCards
  );

  useEffect(() => {
    if (loading) {
      setShow(false);
    }
  }, [loading, show]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);

      await makeSecuredRequest("/api/cards/", "POST", {
        url: link,
      });

      mutate();
      setShow(false);
      setLoading(false);

      setLink("");
    } catch (error) {
      setLoading(false);
      setMessage(error.message);
    }
  };

  const handleClear = () => {
    setLink("");
    setLoading(false);
    setShow(!show);
  };

  const handleShow = () => {
    setShow(!show);
    setMessage("");
  };

  return (
    <section className={styles.section}>
      {!show && (
        <Button
          variant="warning"
          className={styles.addLink}
          onClick={handleShow}
        >
          Post a link
        </Button>
      )}

      {message && <Message variant="danger" children={message} />}
      {show && (
        <Form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formContainer}>
            {loading && <Loader />}
            <h1 className={styles.heading}>Post a Link</h1>
            <Form.Control
              id="input"
              className={styles.input}
              type="url"
              value={link}
              placeholder="Enter a link to preview"
              onChange={(e) => setLink(e.target.value)}
              autoFocus
            />
            <div className={styles.buttons}>
              <Button
                onClick={handleSubmit}
                variant="warning"
                className={`my-2 `}
              >
                Post
              </Button>
              <Button
                onClick={handleClear}
                className={`my-2 `}
                variant="outline-dark"
              >
                Close
              </Button>
            </div>
          </div>
        </Form>
      )}
    </section>
  );
};

export default AddLink;
