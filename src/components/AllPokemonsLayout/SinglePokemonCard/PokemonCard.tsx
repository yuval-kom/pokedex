import { Link } from "react-router-dom";
import styled from "styled-components";

const PokemonCard = styled.div`

margin: 0;
display:inline-block;
background-color: #f7f7f9;
margin-left: 0.5rem;
margin-right: 0.5rem;
padding: 0.6rem;
border-radius: 0.5rem;
margin-bottom: 1rem;
box-shadow: 2px 2px #dedede ;
color: #37329a;
justify-content:center;

& span.pokemonId{
    margin: auto;
    float: left;
}

& div.name{
    text-align: center;
    padding-bottom: 2px;
}
`;
//
const Pokemon : React.FC<{id:number, name: string, imageUrl : string}> = (props) => {
    
    return( 
    <Link to={`/pokedex/${props.name}`} style={{ textDecoration: 'none' }} >
        <PokemonCard>
            <div className="pokemonId">#{props.id}</div>
            <img className="image" src={props.imageUrl}/>
            <div className="name">{props.name}</div>
        </PokemonCard>
    </Link>
);
};

export default Pokemon;