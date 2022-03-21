
import { RootStateOrAny, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { PokemonT } from "../pokemonType";
import PokemonProfileBase from "../components/PokemonProfile/PokemonProfileBase"
import PokemonProfileDescription from "../components/PokemonProfile/PokemonProfileDescription";
import styled from "styled-components";
import { Button } from "../Helper/sharedStyles";


const CardStyleControl = styled.div`
    margin:0 auto;
    display: grid;
    align-items: center;
    grid-template-columns: 14rem 1rem 10rem;
    background-color: #f7f7f9;
    border-radius: 0.5rem;
    margin-bottom: 1rem;
    box-shadow: 2px 2px #dedede ;
    width: 40rem;

    & div.divider{
        margin-top: 1rem;
        float: left;
        height:80%;
        width:1px; 
        background-color: gray
    }
    & ${Button}{
        float: right;
    //margin-right:;
    }

    @media (max-width: 425px) {
        display:flex;
        flex-direction: column;
        width: fit-content;
        padding-left: 0.2rem;
        padding-right: 0.2rem;
        & div.divider{
        height:1px;
        width:80%;
        margin-bottom: 2rem;
    }
    }
`;
const StyleControl = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const PokemonProfile: React.FC<{}> = (props) => {
    const { pokemonName } = useParams();
    const allPokemons: PokemonT[] = useSelector((state: RootStateOrAny) => state.pokemons.pokemons);
    const { searchedPokemons, isInSearchMode } = useSelector((state: RootStateOrAny) => state.pokemons);
    const currPokemon = (!isInSearchMode ? allPokemons : searchedPokemons).find((p: PokemonT) => p.name === pokemonName);

    const navigateTo = useNavigate();

    const onClickBack = () => {
        navigateTo("/pokedex");
    }
    return (
        <StyleControl>
            <CardStyleControl>
                <PokemonProfileBase id={currPokemon!.id} imageUrl={currPokemon!.imageUrl} name={currPokemon!.name} types={currPokemon!.types} />
                <div className="divider"></div>
                <PokemonProfileDescription stats={currPokemon!.stats} />

            </CardStyleControl>
            <Button onClick={onClickBack}>Back</Button>
        </StyleControl>
    );

};
export default PokemonProfile