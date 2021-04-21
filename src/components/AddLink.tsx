import axios from "axios";
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
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      };
      const { data } = await axios.post(
        "/api/cards/",
        JSON.stringify({ url: link }),
        config
      );

      setData(data);
      console.log(data);
      setLoading(false);
      setisDone(true);
    } catch (error) {
      setLoading(false);
      setMessage(error.message);
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
      {loading && <Loader />}
      {message && <Message variant="danger" children={message} />}
      {isDone && !loading && <Card data={data} />}
      <Form.Control
        type="url"
        value={link}
        onChange={(e) => setLink(e.target.value)}
      />
      <Button type="submit" className="my-2 btn-sm" variant="primary">
        Post
      </Button>
    </Form>
  );
};

export default AddLink;
