import React, { useReducer, useMemo, useContext, createContext } from "react";
import produce from "immer";

export const appType = {
  addPokemon: "pokemon/ADD",
  setPokemonName: "pokemon/SET_NAME",
  removePokemon: "pokemon/REMOVE",
};

// INITIAL STATE
const initialState = {
  pokemons: [],
};

// INITIAL STATE CALLBACK
const initialStateCallback = (state) => {
  const loadedState = localStorage.getItem("state");

  if (loadedState) state = { ...state, ...JSON.parse(loadedState) };

  return state;
};

// REDUCER
const reducer = produce((draft, action) => {
  switch (action.type) {
    case appType.addPokemon:
      const newPokemons = [...draft.pokemons, action.payload];

      draft.pokemons = newPokemons;

      localStorage.setItem("state", JSON.stringify(draft));
      return;
    case appType.removePokemon:
      localStorage.setItem("state", JSON.stringify(draft));
      return;
    default:
      throw new Error("Unknown action type");
  }
});

// App STATE HOOK
const useAppState = () => {
  const [state, dispatch] = useReducer(
    reducer,
    initialState,
    initialStateCallback
  );

  const contextValue = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);

  return contextValue;
};

// APP CREATE CONTEXT
const AppStateContext = createContext();
const AppDispatchContext = createContext();

// App USE CONTEXT HOOK
const useAppStateContext = () => useContext(AppStateContext);
const useAppDispatchContext = () => useContext(AppDispatchContext);

// App PROVIDER
const AppProvider = ({ children }) => {
  const { state, dispatch } = useAppState();
  return (
    <AppDispatchContext.Provider value={dispatch}>
      <AppStateContext.Provider value={state}>
        {children}
      </AppStateContext.Provider>
    </AppDispatchContext.Provider>
  );
};

export { AppProvider, useAppStateContext, useAppDispatchContext, useAppState };
