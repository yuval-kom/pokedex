import Pokemon from './SinglePokemonCard/PokemonCard';
import { PokemonT } from '../../pokemonType';
import { Button } from '../../Helper/sharedStyles';
import styled from 'styled-components';

const LayoutControl = styled.div`
    display: inline-block;
`;
const PokemonsLayoutGrid = styled.div`
display: grid;
grid-template-columns: repeat(4, 8rem);

@media (max-width: 550px) {
    display: flex;
    flex-direction: column;
}
`;

const ButtonDiv = styled.div`

  display: flex;
  justify-content: space-around;
  margin: 12px;
  float: right;
`;



const PokemonsLayout: React.FC<{allPokemons:PokemonT[], onPrev: ()=>void, onNext: ()=>void, prevOffset:number, nextOffset:number, isSearchMode: boolean, setAllPokemons: ()=>void}>= (props) => {
    
    return <LayoutControl>
        <PokemonsLayoutGrid>
            {props.allPokemons.map((pokemon:PokemonT) => <Pokemon key ={pokemon.id} id={pokemon.id} name={pokemon.name} imageUrl={pokemon.imageUrl}/>)}
        </PokemonsLayoutGrid>
        <ButtonDiv>
        {props.isSearchMode?  (<Button onClick={props.setAllPokemons}>All Pokemons</Button>):
        (
            <div>
        {props.prevOffset && <Button onClick={props.onPrev}>prev</Button>}             
        {props.nextOffset && <Button onClick={props.onNext}>next</Button>}</div>
        )
        }

        </ButtonDiv>
    </LayoutControl>
    
};

export default PokemonsLayout;