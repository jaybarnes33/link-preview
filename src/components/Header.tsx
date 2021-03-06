import { useEffect, useState } from "react";
import { Navbar, Container, Nav, NavDropdown, Button } from "react-bootstrap";
import Link from "next/link";
import useSWR from "swr";
import Router from "next/router";
import useUser from "@/hooks/useUser";
import makeSecuredRequest from "@/utils/makeSecuredRequest";
const Header = () => {
  const handleLogout = () => {
    const { sessionStorage } = window;
    sessionStorage.removeItem("token");
    Router.replace("/");
  };
  const [clicked, setClicked] = useState(false);
  const { user } = useUser();
  const [name, setName] = useState("");
  const [reactions, setReactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const fetchCategories = async () =>
    await makeSecuredRequest("/api/cards/categories", "GET");
  const { data: categoriesData } = useSWR(
    `/api/cards/categories`,
    fetchCategories
  );

  const fetchReactions = async () =>
    await makeSecuredRequest("/api/cards/reactions", "GET");
  const { data: reactionsData } = useSWR(
    `/api/cards/reactions`,
    fetchReactions
  );

  useEffect(() => {
    reactionsData && setReactions(["all", ...reactionsData]);

    categoriesData && setCategories(["all", ...categoriesData]);
    user && setName(user.username);
  }, [user, reactionsData, categoriesData]);
  const handleClick = () => {
    setClicked(!clicked);
  };

  const setTheme = (e) => {
    Array.from(document.getElementById("theme-colors").children).forEach(
      (element) => {
        element.classList.contains("active-color")
          ? element.classList.remove("active-color")
          : null;
      }
    );
    document.documentElement.style.setProperty("--main-color", e.target.id);
    document.getElementById(e.target.id).classList.add("active-color");
    document.documentElement.style.setProperty(
      "--text",
      e.target.id === "#f4f4f4" ? "#101010" : "#f4f4f4"
    );
  };

  return (
    <header>
      <Navbar expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand>
            <Link href="/">Cardsforchange</Link>
          </Navbar.Brand>
          <div id="theme-colors" onClick={setTheme}>
            <Button
              id="#1a1a1a"
              style={{ backgroundColor: "#101010", border: "#101010" }}
            ></Button>
            <Button
              id="#f4f4f4"
              style={{ backgroundColor: "#f4f4f4", border: "#f4f4f4" }}
            ></Button>
            <Button id="#c82333" variant="danger"></Button>
            <Button
              id="#28a745"
              variant="success"
              style={{ backgroundColor: "#218838" }}
            ></Button>
            <Button
              id="#21094e"
              style={{ backgroundColor: "indigo", border: "indigo" }}
            ></Button>
          </div>
          {user && (
            <>
              {" "}
              <Navbar.Toggle
                // className="form-control"
                style={{ maxWidth: "50px" }}
                aria-controls="navbar-nav"
                onClick={handleClick}
              >
                {!clicked ? (
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    className="bi bi-filter-right"
                    fill="white"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M14 10.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 .5-.5zm0-3a.5.5 0 0 0-.5-.5h-7a.5.5 0 0 0 0 1h7a.5.5 0 0 0 .5-.5zm0-3a.5.5 0 0 0-.5-.5h-11a.5.5 0 0 0 0 1h11a.5.5 0 0 0 .5-.5z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    fill="white"
                    className="bi bi-backspace"
                    viewBox="0 0 16 16"
                  >
                    <path d="M5.83 5.146a.5.5 0 0 0 0 .708L7.975 8l-2.147 2.146a.5.5 0 0 0 .707.708l2.147-2.147 2.146 2.147a.5.5 0 0 0 .707-.708L9.39 8l2.146-2.146a.5.5 0 0 0-.707-.708L8.683 7.293 6.536 5.146a.5.5 0 0 0-.707 0z" />
                    <path d="M13.683 1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-7.08a2 2 0 0 1-1.519-.698L.241 8.65a1 1 0 0 1 0-1.302L5.084 1.7A2 2 0 0 1 6.603 1h7.08zm-7.08 1a1 1 0 0 0-.76.35L1 8l4.844 5.65a1 1 0 0 0 .759.35h7.08a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1h-7.08z" />
                  </svg>
                )}
              </Navbar.Toggle>{" "}
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto py-2">
                  <Nav.Item>
                    <Nav.Link as={Link} href="/cards/all ">
                      <a>Cards</a>
                    </Nav.Link>
                  </Nav.Item>
                  <NavDropdown
                    className="drop"
                    id="categories"
                    title="Categories"
                  >
                    {categories?.map((category) => (
                      <NavDropdown.Item>
                        <Link href={`/cards/${category}`}>{category}</Link>
                      </NavDropdown.Item>
                    ))}
                  </NavDropdown>
                  <NavDropdown
                    className="drop"
                    id="reactions"
                    title="Reactions"
                  >
                    {reactions?.map((reaction) => (
                      <NavDropdown.Item>
                        <Link href={`/cards/reaction/${reaction}`}>
                          {reaction}
                        </Link>
                      </NavDropdown.Item>
                    ))}
                  </NavDropdown>
                  <Nav.Item>
                    <Nav.Link as={Link} href="/profile">
                      <a>Profile</a>
                    </Nav.Link>
                  </Nav.Item>
                  <NavDropdown
                    id="profile"
                    title={
                      user?.image ? (
                        <img src={`${user.image}`} className="profile" />
                      ) : (
                        <div className="profiletext">{`${user.fName[0]}${user.lName[0]}`}</div>
                      )
                    }
                  >
                    <NavDropdown.Item onClick={handleLogout}>
                      Log out
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
            </>
          )}
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
