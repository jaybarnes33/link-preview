import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Form, Button } from "react-bootstrap";
import Head from "next/head";
import styles from "../styles/forms.module.css";
import countries from "@/data/countries";
import axios from "axios";
import useUser from "../hooks/useUser";
import Loader from "@/components/Loader";
import Message from "@/components/Message";
import makeSecuredRequest from "@/utils/makeSecuredRequest";
import Layout from "@/components/Layout";

const Profile = () => {
  // Props
  const { replace } = useRouter();
  const { user, authenticating, isAuthenticated, mutate } = useUser();
  const [message, setMessage] = useState("");
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fName: "",
    lName: "",
    email: "",
    username: "",
    password: "",
    country: "",
    confirmPassword: ""
  });

  useEffect(() => {
    if (!authenticating && !isAuthenticated) {
      // if we're done loading and user isn't authenticated
      replace("/login");
    }

    if (user) {
      setFormData(prevState => ({
        ...prevState,
        fName: user.fName,
        lName: user.lName,
        username: user.username,
        email: user.email,
        country: user.country
      }));

      setImage(user.image);
    }
  }, [user, authenticating, isAuthenticated]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const uploadFileHandler = async e => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "/multipart/form-data"
        }
      };

      const { data } = await axios.post("/api/uploads", formData, config);
      setImage(data);
      setUploading(false);
    } catch (error) {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
            image
          }
        );

        mutate(data);
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
          <title>Profile {user && `| ${user.fName} ${user.lName}`}</title>
        </Head>
        {loading && <Loader />}
        {message && <Message>{message}</Message>}
        <Form className={styles.formContainer} onSubmit={handleSubmit}>
          <div className={styles.formHeading}>
            <h1 className={styles.heading}>My Profile</h1>
            <p>Please fill this form to update your profile.</p>
            <hr />
          </div>
          {user?.image ? (
            <img className={styles.profileImage} src={user?.image} />
          ) : (
            <div className="profiletext">{`${user?.fName[0]}${user?.lName[0]}`}</div>
          )}

          <div className={styles.formContent}>
            <Form.Group controlId="image">
              <Form.Control
                type="text"
                placeholder="Enter Image URL"
                value={image}
                onChange={e => setImage(e.target.value)}
              ></Form.Control>
              <Form.File
                type="text"
                label="Choose file"
                custom
                onChange={uploadFileHandler}
              ></Form.File>
              {uploading && <Loader />}
            </Form.Group>
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
              {countries.map(country => (
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
