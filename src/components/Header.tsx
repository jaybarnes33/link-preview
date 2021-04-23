import { useEffect, useState } from "react";
import { Navbar, Container, Nav, Button, Image } from "react-bootstrap";
import Link from "next/link";
import Router from "next/router";
import useUser from "@/hooks/useUser";
const Header = () => {
  const handleLogout = () => {
    const { sessionStorage } = window;
    sessionStorage.removeItem("token");
    Router.replace("/");
  };
  const [clicked, setClicked] = useState(false);
  const { user } = useUser();
  const [name, setName] = useState("");
  useEffect(() => {
    user && setName(user.username);
  }, [user]);
  const handleClick = () => {
    setClicked(!clicked);
  };

  const handleShow = () => {
    const form = document.getElementById("form");

    console.log(form);
    form?.classList.contains("show")
      ? form.classList.remove("show")
      : form.classList.add("show");
  };
  return (
    <header>
      <Navbar expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand>
            <Link href="/">Links</Link>
          </Navbar.Brand>

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
                    <Nav.Link as={Link} href="/links">
                      <a>Links</a>
                    </Nav.Link>
                  </Nav.Item>
                  {/* <Nav.Item>
                    <Nav.Link as={Link} href="/profile">
                      <a>Profile</a>
                    </Nav.Link>
                  </Nav.Item> */}
                  <Nav.Item>
                    <Nav.Link className="logout" onClick={handleLogout}>
                      Logout
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link className="addlink" onClick={handleShow}>
                      Post a link
                    </Nav.Link>
                  </Nav.Item>
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
