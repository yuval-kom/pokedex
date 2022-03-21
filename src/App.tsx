import { Fragment, useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AllPokemons from './pages/AllPokemons';
import PokemonProfile from './pages/PokemonProfile';
import pokemon_logo from "./images/pokemon_logo.png";
import { getPokemons } from "./Helper/services";
import styled from 'styled-components';

const HeaderImageStyle = styled.div`
display: flex;
justify-content: center;

& img{
    margin-top: 2rem;
    margin-bottom: 2rem;
  }
@media (max-width: 4150px) {

  width: fit-content;
  margin: auto;
  & img{
    width: 80%
  }
}
`;
function App() {

  useEffect(() => {
    getPokemons("0", "898").then(res => localStorage.setItem("pokemons", JSON.stringify(res?.pokemonsData))).catch(err => console.log(err));
  }, []);
  return (
    <Fragment>
      <HeaderImageStyle>
        <img src={pokemon_logo} alt="pokemon logo   " />
      </HeaderImageStyle>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/pokedex" />} />
          <Route path="/pokedex" element={<AllPokemons />} />
          <Route path="/pokedex/:pokemonName" element={<PokemonProfile />} />
        </Routes>
      </BrowserRouter>
    </Fragment>

  );
}

export default App;
