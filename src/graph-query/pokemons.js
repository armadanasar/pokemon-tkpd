import gql from "graphql-tag";

export const GetPokemons = gql`
  query GetPokemons($limit: Int, $offset: Int) {
    pokemons(limit: $limit, offset: $offset) {
      count
      next
      previous
      status
      message
      results {
        url
        name
        image
        id
      }
    }
  }
`;

export const GetPokemon = gql`
  query GetPokemon($name: String!) {
    pokemon(name: $name) {
      name
      sprites {
        back_default
        front_default
      }
      types {
        slot
        type {
          url
          name
        }
      }
      abilities {
        ability {
          url
          name
        }
        is_hidden
        slot
      }
    }
  }
`;
