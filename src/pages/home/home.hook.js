import { useQuery } from "@apollo/client";
import { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAppStateContext } from "../../context/app.context";
import { GetPokemons } from "../../graph-query/pokemons";

function useHome() {
  const [pokemons, setPokemons] = useState([]);
  const [cursor, setCursor] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const { pokemons: collectedPokemons } = useAppStateContext();
  const history = useHistory();
  const { loading, error, fetchMore } = useQuery(GetPokemons, {
    onCompleted: (data) => {
      setCursor(data.pokemons.next);
      setPokemons(data.pokemons.results);
    },
    fetchPolicy: "no-cache", // circumventing fetchMore of undefined error
  });

  const goToPokemonDetailPage = (name) => () => {
    history.push(`/detail/${name}`);
  };

  const goToMyPokemonPage = useCallback(() => {
    history.push(`/my-pokemons`);
  }, [history]);

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
  }, [cursor, pokemons, hasMore, fetchMore]);

  return [
    { pokemons, cursor, hasMore, collectedPokemons, loading, error },
    { fetchData, goToPokemonDetailPage, goToMyPokemonPage },
  ];
}

export default useHome;
