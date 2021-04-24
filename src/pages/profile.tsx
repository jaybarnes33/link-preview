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
import makeSecuredRequest from "@/utils/makeSecuredRequest";
import useSWR from "swr";
import { isResSent } from "next/dist/next-server/lib/utils";
import Layout from "@/components/Layout";
const Profile = () => {
  // Props
  const { replace } = useRouter();
  const { user, authenticating, isAuthenticated } = useUser();

  useEffect(() => {
    if (!authenticating && !isAuthenticated && user?._id) {
      // if we're done loading and user isn't authenticated
      replace("/login");
    } else {
      setFormData((prevState) => ({
        ...prevState,
        fName: String(user.fName),
        lName: String(user.lName),
        username: String(user.username),
        email: String(user.email),
        country: String(user.country),
      }));
    }
  }, [authenticating, isAuthenticated]);

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
    console.log(user);
    e.preventDefault();
    const { fName, lName, password, username, email, country } = formData;
    if (formData.confirmPassword === formData.password) {
      try {
        setLoading(true);
        const data = await makeSecuredRequest(
          `/api/users/${user?._id}`,
          "PUT",
          {
            fName,
            lName,
            country,
            password,
            username,
            email,
          }
        );
        setMessage("Profile updated");
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
    <Layout>
      <div className={styles.formWrapper}>
        <Head>
          <title>{user?.fName + " " + user?.lName} Profile</title>
        </Head>
        {loading && <Loader />}
        {message && <Message variant="danger">{message}</Message>}
        <Form className={styles.formContainer} onSubmit={handleSubmit}>
          <div className={styles.formHeading}>
            <h1 className={styles.heading}>My Profile</h1>
            <p>Please fill this form to update your profile.</p>
            <hr />
          </div>

          <div className={styles.formContent}>
            <Form.Group className={styles.name}>
              <Form.Control
                type="text"
                name="fName"
                value={formData.fName}
                onChange={handleChange}
                placeholder="First Name"
              />
              <Form.Control
                type="text"
                name="lName"
                value={formData.lName}
                onChange={handleChange}
                placeholder="Last Name"
              />
            </Form.Group>
            <Form.Control
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
            />
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
            />
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
            />
            <Form.Control
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
            />

            <Form.Control
              name="country"
              as="select"
              value={formData.country}
              onChange={handleChange}
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
            Update
          </Button>
        </Form>
      </div>
    </Layout>
  );
};

export default Profile;
