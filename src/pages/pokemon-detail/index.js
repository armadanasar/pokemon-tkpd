import React, { memo } from "react";
import { Text, Box, Image } from "goods-core";
import { Button, Input } from "goods-ui";
import usePokemonDetail from "./pokemon-detail.hook";
import { capitalize } from "../../utils/helpers";
import styled from "styled-components";
import Modal from "react-modal";
import withNavbar from "../../hoc/with-navbar";

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
const IndentedList = styled.ul`
  padding-inline-start: 32px;
`;
const PokemonDetailPage = withNavbar({ title: "Pokemon Detail" })(
  memo(() => {
    const [
      { pokemon, isModalOpen, pokemonNameInput, inputError },
      { acquirePokemon, savePokemon, onChange, closeNameModal },
    ] = usePokemonDetail();

    return (
      <Box
        h
        maxH="100%"
        minH="100vh"
        w
        as="main"
        fAlign="center"
        overflow="scroll"
      >
        {pokemon && (
          <Box h maxW="544px" w fAlign="center" p="m" fJustify="space-between">
            <Modal
              style={customStyles}
              isOpen={isModalOpen}
              onRequestClose={closeNameModal}
              contentLabel="Give Pokemon Name"
            >
              <Box w fJustify="center" align="center">
                <Text rule="subtitle">Input Pokemon Name</Text>
                <Input
                  placeholder="Input Pokemon Name"
                  onChange={onChange}
                  value={pokemonNameInput}
                  isError={inputError}
                  supText={inputError ? "Please input Pokemon Name" : ""}
                />

                <Button onClick={savePokemon}>Save Pokemon</Button>
              </Box>
            </Modal>

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
                  Moves
                </Text>

                <IndentedList>
                  {pokemon.moves?.map(({ move }) => (
                    <li key={move?.name}>
                      <Text>{move?.name || ""}</Text>
                    </li>
                  ))}
                </IndentedList>
              </Box>

              <Box w pb="s">
                <Text rule="subtitle" pb="xs">
                  Type
                </Text>

                <IndentedList>
                  {pokemon.types?.map(({ type }) => (
                    <li key={type?.name}>
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
                    <li key={ability?.name}>
                      <Text>{ability?.name || ""}</Text>
                    </li>
                  ))}
                </IndentedList>
              </Box>
            </Box>

            <Button w onClick={acquirePokemon}>
              Catch This Pokemon
            </Button>
          </Box>
        )}
      </Box>
    );
  })
);

export default PokemonDetailPage;
