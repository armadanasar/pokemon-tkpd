import React, { memo } from "react";
import { Text, Box, Image } from "goods-core";

const PokemonError = memo(() => (
  <Box w h="100vh" as="main" fAlign="center" overflow="hidden">
    <Box h="100vh" maxW="544px" w fAlign="center" p="s" fJustify="center">
      <Image
        src="https://seeklogo.com/images/P/pokeball-logo-DC23868CA1-seeklogo.com.png"
        w="180px"
        h="auto"
      />
      <Text pt="m">Ouch, we can't load Pokemons for you :(</Text>
    </Box>
  </Box>
));

export default PokemonError;
