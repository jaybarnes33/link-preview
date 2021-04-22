import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import styles from "../styles/forms.module.css";
import { setAccessToken } from "../misc/token";
import axios from "axios";
import useUser from "../hooks/useUser";
import Loader from "@/components/Loader";
import Message from "@/components/Message";
const Login = () => {
  // Props

  const Router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    remember: false,
  });

  const { user, authenticating, isAuthenticated } = useUser();

  useEffect(() => {
    if (isAuthenticated && !authenticating) {
      Router.replace("/dashboard");
    }
  }, [isAuthenticated, authenticating]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    name == "remember"
      ? setFormData((prevState) => ({
          ...prevState,
          remember: !prevState.remember,
        }))
      : setFormData((prevState) => ({
          ...prevState,
          [name]: value,
        }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    const { username, password, remember } = formData;
    event.preventDefault();

    try {
      setLoading(true);
      const { data } = await axios.post("/api/users/login", {
        username,
        password,
        remember,
      });

      if (data.refreshToken) {
        sessionStorage.setItem("token", data.refreshToken);
      }

      setAccessToken(data.accessToken);
      Router.replace("/dashboard");
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.formWrapper}>
      <Head>
        <title>Sign in</title>
      </Head>
      {loading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}
      <Form onSubmit={handleSubmit} className={styles.formContainer}>
        <div className={styles.formHeading}>
          <h1 className={styles.heading}>Log in</h1>
          <p>Please fill this form to login</p>
          <hr />
        </div>

        <div className={styles.formContent}>
          <Form.Control
            type="text"
            name="username"
            className="mb-4"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
          />

          <Form.Control
            type="password"
            name="password"
            className="mb-4"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
          />
          <Form.Group controlId="remember">
            <Form.Check
              label="Remember me"
              name="remember"
              checked={formData.remember}
              onChange={handleChange}
            />
          </Form.Group>
        </div>
        <Button type="submit" variant="primary" className="my-2 px-5">
          Log in
        </Button>
        <div className={styles.small}>
          <small>
            Don't have an account? <Link href="/register">Register</Link>
          </small>
        </div>
      </Form>
    </div>
  );
};

export default Login;
