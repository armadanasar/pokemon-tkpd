import React from "react";
import { Text, Box } from "goods-core";
import useMyPokemon from "./my-pokemon.hook";
import { Button } from "goods-ui";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const LIMIT = 10;

function MyPokemonPage() {
  const [
    { isModalOpen, collectedPokemons, selectedPokemon },
    { onDeletePokemon, confirmDeletePokemon, closeDeleteModal },
  ] = useMyPokemon();
  console.log("pokemon", selectedPokemon);
  return (
    <Box w as="main" fAlign="center" overflow="hidden">
      {collectedPokemons && (
        <Box maxW="544px" w fAlign="flex-start" p="s">
          {typeof selectedPokemon === "number" && selectedPokemon >= 0 && (
            <Modal
              style={customStyles}
              isOpen={isModalOpen}
              onRequestClose={closeDeleteModal}
              contentLabel="Confirm Delete Pokemon"
            >
              <Box w fJustify="center" align="center">
                <Text>
                  Are you sure you want to delete{" "}
                  {collectedPokemons[selectedPokemon].pokemonName} Pokemon with
                  name {collectedPokemons[selectedPokemon].nickname}
                </Text>
                <Box pt="m" fDir="row" w>
                  <Button
                    f="1"
                    bg="white10"
                    b="1px solid"
                    bC="blue50"
                    c="blue50"
                    onClick={closeDeleteModal}
                    mr="xxs"
                  >
                    Cancel
                  </Button>
                  <Button
                    ml="xxs"
                    bg="red90"
                    f="1"
                    onClick={confirmDeletePokemon}
                  >
                    Delete Pokemon
                  </Button>
                </Box>
              </Box>
            </Modal>
          )}

          <Box w fDir="column" fJustify="space-between" fAlign="flex-start">
            <Text rule="title">My Pokemons</Text>
            <Text
              w
              rule="body"
            >{`Your Pokemon Count: ${collectedPokemons.length}`}</Text>
          </Box>

          <Box w pt="xxs">
            {collectedPokemons.map(({ pokemonName, nickname }, idx) => (
              <Box
                w
                p="xs"
                bBottom="solid 1px"
                bBottomC="black20"
                fDir="row"
                fJustify="space-between"
              >
                <Box key={idx}>
                  <Text>{pokemonName}</Text>
                  <Text>{nickname}</Text>
                </Box>
                <Button
                  c="white10"
                  bg="red80"
                  w="144px"
                  onClick={onDeletePokemon(idx)}
                >
                  Delete
                </Button>
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default MyPokemonPage;
