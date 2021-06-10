import makeSecuredRequest from "@/utils/makeSecuredRequest";
import useSWR from "swr";
import { Nav } from "react-bootstrap";
import Link from "next/link";

const Reactions = () => {
  const fetchData = async () =>
    await makeSecuredRequest("/api/cards/reactions", "GET");
  const { data } = useSWR(`/api/cards/reactions`, fetchData); // useSWR for caching and realtime mutations

  return (
    <Nav className="category-nav">
      <ul className="nav-links mx-auto">
        {["all", ...(data || [])]?.map((reaction) => (
          <Nav.Item
            className="category-link"
            as={Link}
            href={`/cards/reaction/${reaction}`}
          >
            <span className="ml-2 px-2">
              <i className="bi bi-pin mr-2"></i> {reaction}
            </span>
          </Nav.Item>
        ))}
      </ul>

      <style jsx>
        {`
           .category-nav {
            display: flex;
            width:100%
            justify-content: center;
            align-items: center;
            position: fixed;    
          }

          .nav-links{
            display: flex;
            flex-wrap: wrap;
          }

          span {
            color:white;
 
          }
         
       

    
        `}
      </style>
    </Nav>
  );
};

export default Reactions;
