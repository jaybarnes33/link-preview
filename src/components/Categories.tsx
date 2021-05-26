import makeSecuredRequest from "@/utils/makeSecuredRequest";
import useSWR from "swr";
import { Nav, NavItem } from "react-bootstrap";
import Link from "next/link";
import { useEffect } from "react";

const Categories = () => {
  const fetchData = async () =>
    await makeSecuredRequest("/api/cards/categories", "GET");
  const { data } = useSWR(`/api/cards/categories`, fetchData); // useSWR for caching and realtime mutations

  return (
    <Nav className="category-nav">
      <ul className="nav-links mx-auto">
        {["all", ...data]?.map((category) => (
          <span className="ml-2 px-2">
            <i className="bi bi-pin mr-2"></i>
            <Nav.Item
              className="category-link"
              as={Link}
              href={`/cards/${category}`}
            >
              {category}
            </Nav.Item>
          </span>
        ))}
      </ul>

      <style jsx>
        {`
          .category-nav {
            display: inline-flex;
            width:100%
            justify-content: center;
            align-items: center;
          }

          span {
            color:red;
 
          }
         
       

    
        `}
      </style>
    </Nav>
  );
};

export default Categories;