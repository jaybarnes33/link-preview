import useUser from "@/hooks/useUser";
import makeSecuredRequest from "@/utils/makeSecuredRequest";
import { useRouter } from "next/router";
import { createContext, useContext } from "react";
import useSWR from "swr";

interface ICardContextProps {
  data: Partial<Record<string, any>>;
  error: any;
  isValidating: boolean;
  mutate: (data?: any, shouldRevalidate?: boolean) => Promise<any>;
}

const CardContext = createContext({} as ICardContextProps);

const fetchCards = (url: string) => makeSecuredRequest(url, "GET");

const CardContextProvider: React.FC = ({ children }) => {
  const { category = "all", reaction } = useRouter().query;
  const { user } = useUser();

  const { data, error, isValidating, mutate } = useSWR(
    category
      ? [`/api/cards/user/${user?._id}?category=${category}`, category]
      : [`/api/cards/user/${user?._id}?reaction=${reaction}`, reaction],
    fetchCards
  );

  return (
    <CardContext.Provider value={{ data, error, isValidating, mutate }}>
      {children}
    </CardContext.Provider>
  );
};

export const useCardContext = () => {
  return useContext(CardContext);
};

export default CardContextProvider;
