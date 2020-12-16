import { useQuery } from "@apollo/client";
import { useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import {
  useAppDispatchContext,
  useAppStateContext,
} from "../../context/app.context";
import { GetPokemon, GetPokemons } from "../../graph-query/pokemons";
import { useFetchMore } from "../../hooks/use-fetch-more";

const LIMIT = 10;

function usePokemonDetail() {
  const { pokemonName } = useParams();

  const [pokemon, setPokemon] = useState({});

  const dispatch = useAppDispatchContext();
  const { pokemons: collectedPokemons } = useAppStateContext();

  const { loading, data, error } = useQuery(GetPokemon, {
    variables: { name: pokemonName },
    onCompleted: (data) => {
      setPokemon(data.pokemon);
    },
    fetchPolicy: "no-cache",
  });

  const acquirePokemon = useCallback(() => {}, [pokemonName, pokemon]);

  return [{ pokemon, loading, data, error }, { acquirePokemon }];
}

export default usePokemonDetail;
