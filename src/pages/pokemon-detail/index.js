import React from "react";
import { Text, Box, Image } from "goods-core";
import InfiniteScroller from "react-infinite-scroller";
import { Button } from "goods-ui";
import usePokemonDetail from "./pokemon-detail.hook";
import { capitalize } from "../../utils/helpers";
import styled from "styled-components";

const LIMIT = 10;

const IndentedList = styled.ul`
  padding-inline-start: 32px;
`;
function PokemonDetailPage() {
  const [
    { pokemon, loading, data, error },
    { acquirePokemon },
  ] = usePokemonDetail();

  console.log("pokemon", pokemon);
  return (
    <Box h="100vh" w as="main" fAlign="center" overflow="hidden">
      {pokemon && (
        <Box h maxW="544px" w fAlign="center" p="m" fJustify="space-between">
          <Box w>
            <Box w fAlign="center">
              <Text rule="title">{capitalize(pokemon?.name || "")}</Text>

              <Image
                w="180px"
                h="180px"
                pt="xs"
                src={pokemon.sprites?.front_default}
              />

              <Image
                w="180px"
                h="180px"
                pt="xs"
                src={pokemon.sprites?.back_default}
              />
            </Box>

            <Box w pb="s">
              <Text rule="subtitle" pb="xs">
                Type
              </Text>

              <IndentedList>
                {pokemon.types?.map(({ type }) => (
                  <li>
                    <Text>{type?.name || ""}</Text>
                  </li>
                ))}
              </IndentedList>
            </Box>

            <Box w pb="s">
              <Text rule="subtitle" pb="xs">
                Abilities
              </Text>
              <IndentedList>
                {pokemon.abilities?.map(({ ability }) => (
                  <li>
                    <Text>{ability?.name || ""}</Text>
                  </li>
                ))}
              </IndentedList>
            </Box>
          </Box>

          <Button w>Get This Pokemon</Button>
        </Box>
      )}
    </Box>
  );
}

export default PokemonDetailPage;
