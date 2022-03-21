import { createSlice } from "@reduxjs/toolkit";
//import {Pokemon} from "../pokemonType";

const numPokemonsToShow = 12;

const PokemonSlice = createSlice({
  name: "pokemons",
  initialState: {
    pokemons: [],
    nextOffset: 0,
    prevOffset: null,
    currOffset: 0,
  },
  reducers: {
    setPokemons(state, actions) {
      state.pokemons = actions.payload.pokemonsData;
      state.nextOffset = actions.payload.nextOffset;
      state.prevOffset = actions.payload.prevOffset;
    },
    setCurrOffset(state, actions) {
      if (actions.payload.isNext) {
        console.log("in next");
        state.currOffset += numPokemonsToShow;
      } else {
        console.log("in prev");
        state.currOffset -= numPokemonsToShow;
      }
    },
    setPokemon(state, actions) {
      state.pokemons = actions.payload.pokemonData;
      console.log(actions.payload.pokemonData);
    },
  },
});

export const PokemonsActions = PokemonSlice.actions;
export default PokemonSlice.reducer;
