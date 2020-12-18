import React from "react";
import {
  fireEvent,
  render,
  screen,
  wait,
  waitFor,
  waitForDomChange,
} from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { GetPokemon, GetPokemons } from "./graph-query/pokemons";
import { BrowserRouter } from "react-router-dom";
import { CoreApp } from "./App";

const renderWithRouter = (ui, { route = "/" } = {}) => {
  window.history.pushState({}, "Test page", route);

  return render(ui, { wrapper: BrowserRouter });
};

const loadedPokemons = [
  {
    url: "https://pokeapi.co/api/v2/pokemon/20/",
    name: "raticate",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/20.png",
    id: 20,
  },
  {
    url: "https://pokeapi.co/api/v2/pokemon/21/",
    name: "spearow",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/21.png",
    id: 21,
  },
];

const mocks = [
  {
    request: {
      query: GetPokemons,
      variables: {},
    },
    result: {
      data: {
        pokemons: {
          count: 1118,
          next: "https://pokeapi.co/api/v2/pokemon/?offset=101&limit=101",
          previous: null,
          status: true,
          message: "",
          results: loadedPokemons,
        },
      },
    },
  },
  {
    request: {
      query: GetPokemon,
      variables: { name: "bulbasaur" },
    },
    result: {
      data: {
        pokemon: {
          name: "bulbasaur",
          sprites: {
            back_default:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png",
            front_default:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
          },
          types: [
            {
              slot: 1,
              type: {
                url: "https://pokeapi.co/api/v2/type/12/",
                name: "grass",
              },
            },
            {
              slot: 2,
              type: {
                url: "https://pokeapi.co/api/v2/type/4/",
                name: "poison",
              },
            },
          ],
          abilities: [
            {
              ability: {
                url: "https://pokeapi.co/api/v2/ability/65/",
                name: "overgrow",
              },
              is_hidden: false,
              slot: 1,
            },
            {
              ability: {
                url: "https://pokeapi.co/api/v2/ability/34/",
                name: "chlorophyll",
              },
              is_hidden: true,
              slot: 3,
            },
          ],
        },
      },
    },
  },
];

describe("home page test", () => {
  test("see if loading view works", async () => {
    renderWithRouter(
      <MockedProvider mocks={mocks} addTypename={false}>
        <CoreApp />
      </MockedProvider>
    );

    const linkElement = screen.getByText(/loading pokemons/i);
    expect(linkElement).toBeInTheDocument();
  });

  test("see if error view works", async () => {
    const errorMock = {
      request: {
        query: GetPokemons,
        variables: {},
      },
      error: new Error("error"),
    };

    renderWithRouter(
      <MockedProvider mocks={[errorMock]} addTypename={false}>
        <CoreApp />
      </MockedProvider>
    );

    await waitForDomChange();

    const errorText = screen.getByText(/ouch/gi);
    expect(errorText).toBeInTheDocument();
  });

  test("see if pokemons are loaded", async () => {
    renderWithRouter(
      <MockedProvider mocks={mocks} addTypename={false}>
        <CoreApp />
      </MockedProvider>
    );

    await waitForDomChange();

    const pokemon = screen.getByText(/spearow/);
    expect(pokemon).toBeInTheDocument();
  });

  test("see if seeing one pokemon works", async () => {
    renderWithRouter(
      <MockedProvider mocks={mocks} addTypename={false}>
        <CoreApp />
      </MockedProvider>
    );

    await waitForDomChange();

    const pokemon = screen.getByText(/spearow/);

    fireEvent.click(pokemon);

    await waitForDomChange();

    const pokemonDetailTitleBar = screen.getByText(/Pokemon Detail/);
    expect(pokemonDetailTitleBar).toBeInTheDocument();
  });
});

describe("pokemon detail page test", () => {
  test("see if loading pokemon detail works", async () => {
    renderWithRouter(
      <MockedProvider mocks={mocks} addTypename={false}>
        <CoreApp />
      </MockedProvider>,
      { route: "/detail/bulbasaur" }
    );

    await waitForDomChange();

    const bulbasaurText = screen.getByText(/bulbasaur/i);
    expect(bulbasaurText).toBeInTheDocument();

    const catchPokemonButton = screen.getByText(/Catch this Pokemon/i);
    expect(catchPokemonButton).toBeInTheDocument();
  });
});
