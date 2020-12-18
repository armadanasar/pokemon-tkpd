import { useQuery } from "@apollo/client";
import { useCallback, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import { appType, useAppDispatchContext } from "../../context/app.context";
import { GetPokemon } from "../../graph-query/pokemons";

function usePokemonDetail() {
  const history = useHistory();
  const { pokemonName } = useParams();
  const dispatch = useAppDispatchContext();

  const [pokemon, setPokemon] = useState({});
  const [isModalOpen, setModalOpen] = useState(false);
  const [pokemonNameInput, setPokemonNameInput] = useState("");
  const [inputError, setInputError] = useState(null);

  const { loading, data, error } = useQuery(GetPokemon, {
    variables: { name: pokemonName },
    onCompleted: (data) => {
      setPokemon(data.pokemon);
    },
    fetchPolicy: "no-cache",
  });

  const openNameModal = useCallback(() => setModalOpen(true), [setModalOpen]);
  const closeNameModal = useCallback(() => setModalOpen(false), [setModalOpen]);

  const onChange = useCallback((e) => {
    setPokemonNameInput(e.target.value);
  }, []);

  const savePokemon = () => {
    const isValid = /\w{1,}/.test(pokemonNameInput);

    if (!isValid) {
      setInputError(true);
    } else {
      dispatch({
        type: appType.addPokemon,
        payload: {
          pokemonName,
          nickname: pokemonNameInput,
        },
      });

      closeNameModal();
      history.push("/");
    }
  };

  const acquirePokemon = useCallback(() => {
    const isEligibleForPokemon = Math.random() < 0.5;

    if (isEligibleForPokemon) {
      openNameModal();
    }
  }, [openNameModal]);

  return [
    {
      pokemon,
      loading,
      data,
      error,
      pokemonNameInput,
      isModalOpen,
      inputError,
    },
    { acquirePokemon, savePokemon, onChange, closeNameModal, openNameModal },
  ];
}

export default usePokemonDetail;
