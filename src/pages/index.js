import React from "react";
import { Switch, Route } from "react-router-dom";

import HomePage from "./home";
import PokemonDetail from "./pokemon-detail";
import MyPokemonPage from "./my-pokemon";

function Pages() {
  return (
    <Switch>
      <Route exact path="/detail/:pokemonName" component={PokemonDetail} />
      <Route exact path="/my-pokemons" component={MyPokemonPage} />
      <Route exact path="/" component={HomePage} />
    </Switch>
  );
}

export default Pages;
