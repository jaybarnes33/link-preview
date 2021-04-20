import { useState } from "react";
import { Form, Button } from "react-bootstrap";

const AddLink = () => {
  const [link, setLink] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {};
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Control
        type="url"
        value={link}
        onChange={(e) => setLink(e.target.value)}
      />
      <Button className="my-2 btn-sm" variant="primary">
        Post
      </Button>
    </Form>
  );
};

export default AddLink;
