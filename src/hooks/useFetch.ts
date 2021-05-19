import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import useLocalStorage from "./useLocalStorage";

export default (url: string) => {
  const baseUrl: string = "https://conduit.productionready.io/api";
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState({});
  const [token] = useLocalStorage("token");

  const doFetch = useCallback((options: any = {}): void => {
    setOptions(options);
    setIsLoading(true);
  }, []);

  useEffect(() => {
    let skipGetResponseAfterUnmount = false;
    if (!isLoading) {
      return;
    }
    const requestOptions = {
      ...options,
      ...{
        headers: {
          authorization: token ? `Token ${token}` : "",
        },
      },
    };

    axios(baseUrl + url, requestOptions)
      .then((res) => {
        if (!skipGetResponseAfterUnmount) {
					setIsLoading(false);
          setResponse(res.data);
        }
      })
      .catch((error) => {
        if (!skipGetResponseAfterUnmount) {
          setIsLoading(false);
          setError(error.response.data);
        }
      });

    return () => {
      skipGetResponseAfterUnmount = true;
    };
  }, [isLoading, options, url, token]);
  return [{ response, isLoading, error }, doFetch];
};
