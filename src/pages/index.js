import React, { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import HomePage from "./home";

const PokemonDetail = lazy(() =>
  import(/* webpackChunkName: "pokemon-detail" */ "./pokemon-detail")
);
const MyPokemonPage = lazy(() =>
  import(/* webpackChunkName: "my-pokemon" */ "./my-pokemon")
);

function Pages() {
  return (
    <React.Fragment>
      <Suspense fallback="">
        <Switch>
          <Route exact path="/detail/:pokemonName" component={PokemonDetail} />
          <Route exact path="/my-pokemons" component={MyPokemonPage} />
        </Switch>
      </Suspense>
      <Switch>
        <Route exact path="/" component={HomePage} />
      </Switch>
    </React.Fragment>
  );
}

export default Pages;
