import { useState, useEffect } from "react";
// hooks are usually named exports rather than default
export function useData(url) {
  // state variable for holding fetched json data
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (url) {
      let ignore = false;
      setLoading(true);
      fetch(url)
        .then((response) => response.json())
        .then((json) => {
          if (!ignore) {
            setLoading(false);
            setData(json);
          }
        });
      // cleanup function, in case url changes before complete
      return () => {
        ignore = true;
      };
    }
  }, [url]); // re-run effect if url changes
  // return the data fetched from the given url
  return [data, loading];
}
// save as useData.jsx in the 'hooks' folder