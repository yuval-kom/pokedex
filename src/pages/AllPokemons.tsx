import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { PokemonsActions } from "../store/pokemons-slice";
import { getPokemons, getPokemon } from "../Helper/services";
import PokemonsLayout from '../components/AllPokemonsLayout/PokemonsLayout';
import { Button } from '../Helper/sharedStyles';

import styled from "styled-components"
import { PokemonT } from '../pokemonType';

const StyleControl = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & form{
    margin-bottom: 1rem;
  }

  & input{
    width: 15rem;
    border-radius: 0.4rem;
    height: 1.5rem;
    border: 1px solid #37329a;
    background-color: #f7f7f9;
  }

  @media (max-width: 550px) {
    ${Button}{
      width: auto;
    }
     
    & input{
      width: fit-content;
    }
}
`;


let isInitialSet = false;
const AllPokemons = () => {
  const dispatch = useDispatch();
  //const [isInSearchMode, setIsInSearchMode] = useState(false);
  //const [searchedPokemons, setSearchedPokemons] = useState<PokemonT[]>();
  const searchInput = useRef<HTMLInputElement>(null);
  const allPokemons = useSelector((state: RootStateOrAny) => state.pokemons.pokemons);
  const { nextOffset, prevOffset, currOffset, isInSearchMode, searchedPokemons } = useSelector((state: RootStateOrAny) => state.pokemons);
  //const prevOffset = useSelector((state: RootStateOrAny) => state.pokemons.prevOffset);
  //const currOffset = useSelector((state: RootStateOrAny) => state.pokemons.currOffset);

  useEffect(() => {
    getPokemons(currOffset).then(res => dispatch(PokemonsActions.setPokemons(res))).catch(err => console.log(err));
    isInitialSet = true;
  }, [dispatch]);

  const nextPokemonsBatch = () => {
    dispatch(PokemonsActions.setCurrOffset({ isNext: true }));
    getPokemons(nextOffset).then(res => dispatch(PokemonsActions.setPokemons(res))).catch(err => console.log(err));
  };

  const prevPokemonsBatch = () => {
    dispatch(PokemonsActions.setCurrOffset({ isNext: false }));
    getPokemons(prevOffset).then(res => dispatch(PokemonsActions.setPokemons(res))).catch(err => console.log(err));

  };

  const searchHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredPokemon = searchInput.current!.value;
    getPokemon(enteredPokemon).then(res => dispatch(PokemonsActions.setPokemon({ pokemonData: [res] }))).catch(err => console.log(err));
    dispatch(PokemonsActions.setSearchMode({ isInSearchMode: true }));
    //setIsInSearchMode(true);
  }

  const setAllPokemons = () => {
    getPokemons(currOffset).then(res => dispatch(PokemonsActions.setPokemons(res))).catch(err => console.log(err));
    //setIsInSearchMode(false);
  }
  const onChangeSearchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      dispatch(PokemonsActions.setSearchMode({ isInSearchMode: false }));
      //setIsInSearchMode(false);
      return;
    }
    const searchedPokemons: PokemonT[] = JSON.parse(localStorage.getItem("pokemons")!);

    let searchedPokemonArr: PokemonT[] = [];
    searchedPokemons.forEach(pokemon => {
      if (pokemon.name.toLowerCase().startsWith(e.target.value.toLowerCase())) {
        searchedPokemonArr.push(pokemon);
      }
    });

    //setSearchedPokemons(searchedPokemonArr);
    dispatch(PokemonsActions.setSearchMode({ isInSearchMode: true }));
    dispatch(PokemonsActions.setSearchedPokemons({ searchedPokemons: searchedPokemonArr }));
    //setIsInSearchMode(true);
  }

  return <>
    <StyleControl>
      <form onSubmit={searchHandler}>
        <input type="text" placeholder='enter name or pokemon id' ref={searchInput} onChange={onChangeSearchHandler} />
        <Button >Search</Button>
      </form>
      {isInitialSet && <PokemonsLayout
        allPokemons={isInSearchMode ? searchedPokemons : allPokemons}
        onPrev={prevPokemonsBatch}
        onNext={nextPokemonsBatch}
        nextOffset={nextOffset}
        prevOffset={prevOffset}
        isSearchMode={isInSearchMode}
        setAllPokemons={setAllPokemons} />}
    </StyleControl>

  </>

};

export default AllPokemons;