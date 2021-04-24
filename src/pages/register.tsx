import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Form, Button } from "react-bootstrap";
import Head from "next/head";
import styles from "../styles/forms.module.css";
import countries from "@/data/countries";
import axios from "axios";
import useUser from "../hooks/useUser";
import Link from "next/link";
import Loader from "@/components/Loader";
import Message from "@/components/Message";
const Register = () => {
  // Props
  const { replace } = useRouter();
  const { user, authenticating, isAuthenticated } = useUser();

  useEffect(() => {
    if (isAuthenticated) {
      replace("/");
    }
  }, [isAuthenticated]);

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fName: "",
    lName: "",
    email: "",
    username: "",
    password: "",
    country: "",
    confirmPassword: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { fName, lName, password, username, email, country } = formData;
    if (formData.confirmPassword === formData.password) {
      try {
        setLoading(true);
        const { data } = await axios.post("/api/users/register", {
          fName,
          lName,
          country,
          password,
          username,
          email,
        });

        replace("/login");
      } catch (e) {
        setMessage(e.response.data.error);
      } finally {
        setLoading(false);
      }
    } else {
      setMessage("Passwords don't Match");
    }
  };
  return (
    <div className={styles.formWrapper}>
      <Head>
        <title>Register</title>
      </Head>
      {loading && <Loader />}
      {message && <Message variant="danger">{message}</Message>}
      <Form className={styles.formContainer} onSubmit={handleSubmit}>
        <div className={styles.formHeading}>
          <h1 className={styles.heading}>Sign up</h1>
          <p>Please fill this form to create an account.</p>
          <hr />
        </div>

        <div className={styles.formContent}>
          <Form.Group className={styles.name}>
            <Form.Control
              type="text"
              name="fName"
              value={formData.fName}
              onChange={handleChange}
              required
              placeholder="First Name"
            />
            <Form.Control
              type="text"
              name="lName"
              value={formData.lName}
              onChange={handleChange}
              required
              placeholder="Last Name"
            />
          </Form.Group>
          <Form.Control
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            placeholder="Username"
          />
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Email"
          />
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Password"
          />
          <Form.Control
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            placeholder="Confirm Password"
          />

          <Form.Control
            name="country"
            as="select"
            onChange={handleChange}
            required
          >
            <option value="">Select a country</option>
            {countries.map((country) => (
              <option value={country.name} key={country.name}>
                {country.emoji} {country.name}
              </option>
            ))}
          </Form.Control>
        </div>
        <Button type="submit" variant="warning" className="my-2 px-5">
          Sign Up
        </Button>
        <div className={styles.small}>
          <small>
            Already have an account? <Link href="/login">Login</Link>
          </small>
        </div>
      </Form>
    </div>
  );
};

export default Register;
