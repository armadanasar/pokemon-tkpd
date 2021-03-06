import React, { memo } from "react";
import { Text, Box, Image } from "goods-core";

const PokemonLoading = memo(() => (
  <Box w h="100vh" as="main" fAlign="center" overflow="hidden">
    <Box h="100vh" maxW="544px" w fAlign="center" p="s" fJustify="center">
      <Image
        src="https://seeklogo.com/images/P/pokeball-logo-DC23868CA1-seeklogo.com.png"
        w="180px"
        h="auto"
      />
      <Text pt="m">We are loading Pokemons for you...</Text>
      <Text pt="xs">Please Wait...</Text>
    </Box>
  </Box>
));

export default PokemonLoading;
