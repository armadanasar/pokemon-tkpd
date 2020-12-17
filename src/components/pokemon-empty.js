import React, { memo } from "react";
import { Text, Box, Image } from "goods-core";

const PokemonEmpty = memo(() => (
  <Box w h="100vh" as="main" fAlign="center" overflow="hidden">
    <Box f="1" maxW="544px" w fAlign="center" p="s" fJustify="center">
      <Image
        src="https://seeklogo.com/images/P/pokeball-logo-DC23868CA1-seeklogo.com.png"
        w="180px"
        h="auto"
      />
      <Text pt="m">It's lonely here..</Text>
      <Text pt="xs">Go catch your Pokemons...</Text>
    </Box>
  </Box>
));

export default PokemonEmpty;
