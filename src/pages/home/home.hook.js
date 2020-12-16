import { useQuery } from "@apollo/client";
import { useCallback, useState } from "react";
import { useAppStateContext } from "../../context/app.context";
import { GetPokemons } from "../../graph-query/pokemons";

const LIMIT = 10;

function useHome() {
  const [pokemons, setPokemons] = useState([]);
  const [cursor, setCursor] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const { pokemons: collectedPokemons } = useAppStateContext();

  const { loading, data, error, fetchMore } = useQuery(GetPokemons, {
    onCompleted: (data) => {
      setCursor(data.pokemons.next);
      setPokemons(data.pokemons.results);
    },
    fetchPolicy: "no-cache",
    // skip: true,
  });

  const fetchData = useCallback(() => {
    if (cursor && hasMore) {
      const url = new URL(cursor);
      const urlParams = new URLSearchParams(url.search);
      const offset = urlParams.get("offset");
      const limit = urlParams.get("limit");

      if (fetchMore)
        fetchMore({
          variables: { offset: Number(offset) + 1, limit: Number(limit) },
          updateQuery: (
            previousResult,
            {
              fetchMoreResult: {
                pokemons: { next, results },
              },
            }
          ) => {
            if (!next) {
              setHasMore(false);
            }

            setCursor(next);
            setPokemons([...pokemons, ...results]);
          },
        });
    }
  }, [cursor]);

  return [
    { pokemons, cursor, hasMore, collectedPokemons, loading },
    { fetchData },
  ];
}

export default useHome;
