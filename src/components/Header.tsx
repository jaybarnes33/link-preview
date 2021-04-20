import { Image, Container, Navbar } from "react-bootstrap";

import Link from "next/link";
const Header = () => {
  return (
    <header>
      <Navbar expand="lg">
        <Link href="/">
          <a>
            <Navbar.Brand>Links</Navbar.Brand>
          </a>
        </Link>
      </Navbar>
    </header>
  );
};

export default Header;
