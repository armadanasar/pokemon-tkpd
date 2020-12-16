import { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  appType,
  useAppStateContext,
  useAppDispatchContext,
} from "../../context/app.context";

const LIMIT = 10;

function useMyPokemon() {
  const history = useHistory();
  const dispatch = useAppDispatchContext();
  const { pokemons: collectedPokemons } = useAppStateContext();

  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const openDeleteModal = () => setModalOpen(true);
  const closeDeleteModal = () => setModalOpen(false);

  const onDeletePokemon = (idx) => () => {
    setSelectedPokemon(idx);
    openDeleteModal();
  };

  const confirmDeletePokemon = () => {
    dispatch({
      type: appType.removePokemon,
      payload: {
        index: selectedPokemon,
      },
    });

    closeDeleteModal();
  };

  return [
    { isModalOpen, collectedPokemons, selectedPokemon },
    {
      onDeletePokemon,
      confirmDeletePokemon,
      openDeleteModal,
      closeDeleteModal,
    },
  ];
}

export default useMyPokemon;
