import React, { memo } from "react";
import { Text, Box } from "goods-core";
import InfiniteScroller from "react-infinite-scroller";
import useHome from "./home.hook";
import PokemonLoading from "../../components/pokemon-loading";
import withNavbar from "../../hoc/with-navbar";
import PokemonError from "../../components/pokemon-error";

const HomePage = withNavbar({ title: "Pokemons", withBackButton: false })(
  memo(() => {
    const [
      { pokemons, hasMore, collectedPokemons, loading, error },
      { fetchData, goToPokemonDetailPage },
    ] = useHome();

    if (error) {
      return <PokemonError />;
    }

    if (loading) {
      return <PokemonLoading />;
    }

    return (
      <>
        {pokemons && (
          <Box
            maxW="544px"
            w
            fAlign="flex-start"
            p="s"
            data-testid="home-page-container"
          >
            <Box w fDir="row" fJustify="space-between" fAlign="center">
              <Text
                w
                rule="body"
              >{`Your Pokemon Count: ${collectedPokemons.length}`}</Text>
            </Box>

            <Box w pt="xxs">
              <InfiniteScroller
                data-testid="pokemon-scroll-pane"
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
                    key={idx}
                  >
                    <Text key={idx}>{name}</Text>
                  </Box>
                ))}
              </InfiniteScroller>
            </Box>
          </Box>
        )}
      </>
    );
  })
);
export default HomePage;
