import React from "react";
import { Text, Box } from "goods-core";
import InfiniteScroller from "react-infinite-scroller";
import useHome from "./home.hook";
import { Button } from "goods-ui";

const LIMIT = 10;

function HomePage() {
  const [
    { pokemons, hasMore, collectedPokemons, loading },
    { fetchData, goToPokemonDetailPage, goToMyPokemonPage },
  ] = useHome();

  return (
    <Box w as="main" fAlign="center" overflow="hidden">
      {pokemons && (
        <Box maxW="544px" w fAlign="flex-start" p="s">
          <Box w fDir="row" fJustify="space-between" fAlign="center">
            <Text
              w
              rule="body"
            >{`Your Pokemon Count: ${collectedPokemons.length}`}</Text>
            <Button as="a" w="144px" onClick={goToMyPokemonPage}>
              My Pokemons
            </Button>
          </Box>

          <Box w pt="xxs">
            <InfiniteScroller
              pageStart={0}
              loadMore={fetchData}
              hasMore={hasMore}
              loader={
                <Box className="loader" key={0}>
                  <Text rule="body">Loading ...</Text>
                </Box>
              }
            >
              {pokemons.map(({ name }, idx) => (
                <Box
                  w
                  p="xs"
                  bBottom="solid 1px"
                  bBottomC="black20"
                  onClick={goToPokemonDetailPage(name)}
                >
                  <Text key={idx}>{name}</Text>
                </Box>
              ))}
            </InfiniteScroller>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default HomePage;
