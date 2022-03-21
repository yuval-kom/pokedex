import styled from "styled-components";
const PokemonTypeColors: {[key:string] : string} = {
    normal: "#A8A77A",
    fire: "#EE8130",
    water: "#6390F0",
    electric: "#F7D02C",
    grass: '#7AC740',
    ice: '#96D9D6',
    fighting: '#C22E28',
    poison:"#A33EA1",
    ground:"#E2BF65",
    flying: '#A98FF3',
    psychic: '#F95587',
    bug: '#A6B91A',
    rock:"#B6A136",
    ghost:"#735797",
    dragon:'#6F35FC',
    dark: '#705746',
    steel: '#B7B7CE',
    fairy:'#D685AD',
};

const BaseCardControl = styled.div`
display: flex;
flex-direction: column;
font-size: 20px;
color: #37329a;
padding-bottom: 1rem;

& span.name{
    text-align: center;
    font-weight: 500;
    font-size: 25px;
}

& div.image{
    align-content: center;
    align-self: center;
}

`;

const Typestyle = styled.li<{color:string}>`
list-style: none; 
background-color: ${(props => props.color)};
border-radius: 0.5rem;
padding: 0.1rem 1.1rem 0.2rem 1.1rem;
color: white;
text-align: center;
`;

const TypeListStyle = styled.ul`
margin: auto;
padding: 0;
padding-top: 0.4rem;
display: flex;
flex-direction: row;
justify-content: center;
gap: 1rem;
`;

const ImageStyle = styled.img`
width: 200px;
height: 200px;

`;

const PokemonProfileBase : React.FC<{id: number, imageUrl: string, name:string, types: string[]}>= (props) =>{

return ( <BaseCardControl>
    <span className="id">#{props.id}</span>
    <div className="image">
        <ImageStyle className="image" src={props.imageUrl}/>
        
    </div>
    <span className="name">{props.name}</span>
    <TypeListStyle>{props.types.map((type,index) => <Typestyle color={PokemonTypeColors[type]} key={index}>{type}</Typestyle>)}</TypeListStyle>
    </BaseCardControl>);
}
export default PokemonProfileBase;