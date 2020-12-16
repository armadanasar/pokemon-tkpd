import { useQuery } from "@apollo/client";
import { Text, Box } from "goods-core";
import { Button } from "goods-ui";
import React, { lazy, Suspense, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import InfiniteScroller from "react-infinite-scroller";
import { useAppStateContext } from "../../context/app.context";
import { GetPokemons } from "../../graph-query/pokemons";
import useHome from "./home.hook";

const LIMIT = 10;

function HomePage() {
  const [
    { pokemons, cursor, hasMore, collectedPokemons, loading },
    { fetchData },
  ] = useHome();

  return (
    <Box w as="main" fAlign="center" overflow="hidden">
      {pokemons && (
        <Box maxW="544px" w fAlign="flex-start" p="s">
          <Text
            w
            rule="body"
          >{`Your Pokemon Count: ${collectedPokemons.length}`}</Text>
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
                <Box w p="xs" bBottom="solid 1px" bBottomC="black20">
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
