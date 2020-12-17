import React, { memo } from "react";
import { Text, Box } from "goods-core";
import { Button } from "goods-ui";

const PokemonEntry = memo(({ pokemonName, nickname, onDelete, idx }) => (
  <Box
    w
    p="xxs"
    bBottom="solid 1px"
    bBottomC="black20"
    fDir="row"
    fJustify="space-between"
    fAlign="center"
  >
    <Box key={idx}>
      <Box>
        <Text>Pokemon Name:</Text>
        <Text>{pokemonName}</Text>
      </Box>
      <Box pt="xs">
        <Text>Nickname:</Text>
        <Text>{nickname}</Text>
      </Box>
    </Box>
    <Box h>
      <Button c="white10" bg="red80" w="144px" onClick={onDelete}>
        Delete
      </Button>
    </Box>
  </Box>
));

export default PokemonEntry;
