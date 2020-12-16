import React from "react";
import { Text, Box } from "goods-core";
import useMyPokemon from "./my-pokemon.hook";
import { Button } from "goods-ui";

const LIMIT = 10;

function MyPokemonPage() {
  const [
    { isModalOpen, collectedPokemons, selectedPokemon },
    { onDeletePokemon, confirmDeletePokemon },
  ] = useMyPokemon();

  return (
    <Box w as="main" fAlign="center" overflow="hidden">
      {collectedPokemons && (
        <Box maxW="544px" w fAlign="flex-start" p="s">
          <Box w fDir="row" fJustify="space-between" fAlign="center">
            <Text
              w
              rule="body"
            >{`Your Pokemon Count: ${collectedPokemons.length}`}</Text>
            <Button as="a" w="144px">
              My Pokemons
            </Button>
          </Box>

          <Box w pt="xxs">
            {collectedPokemons.map(({ pokemonName, nickname }, idx) => (
              <Box w p="xs" bBottom="solid 1px" bBottomC="black20">
                <Box key={idx}>
                  <Text>{pokemonName}</Text>
                  <Text>{nickname}</Text>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default MyPokemonPage;
