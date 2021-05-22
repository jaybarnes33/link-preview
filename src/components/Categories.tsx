import makeSecuredRequest from "@/utils/makeSecuredRequest";
import useSWR from "swr";
import { Nav } from "react-bootstrap";
import Link from "next/link";

const Categories = () => {
  const fetchData = async () =>
    await makeSecuredRequest("/api/cards/categories", "GET");
  const { data } = useSWR(`/api/cards/categories`, fetchData); // useSWR for caching and realtime mutations

  console.log(data);
  return (
    <nav className="category-nav">
      <ul className="nav-links">
        {data?.map((category: string) => (
          <span className="ml-2">
            <Link href={`/cards/${category}`}>{category}</Link>
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

          .nav-links span >a{
            color: red!important;
          }
        `}
      </style>
    </nav>
  );
};

export default Categories;
