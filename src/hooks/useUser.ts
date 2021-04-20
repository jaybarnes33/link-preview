import useSWR from "swr";
import { useEffect, useState } from "react";
import makeSecuredRequest, { getNewToken } from "../utils/makeSecuredRequest";

const useUser = () => {
  const { data: user, error } = useSWR("/api/users/user", makeSecuredRequest);

  const [authenticating, setAuthenticating] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setAuthenticating(true);

        await getNewToken();
        setIsAuthenticated(true);
      } catch (error) {
        console.log(error.response);
      } finally {
        setAuthenticating(false);
      }
    })();
  }, []);

  return {
    user,
    error,
    fetchingUser: !error && !user,
    authenticating,
    isAuthenticated
  };
};

export default useUser;