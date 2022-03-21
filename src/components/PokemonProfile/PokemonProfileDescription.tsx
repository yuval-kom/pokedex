import styled from "styled-components";
import React from "react";
import { Stats } from "../../pokemonType";

const StyleControl = styled.div`
    color: #37329a;
    margin: 0;
    margin-top: 1rem;
    font-size: 20px;
    
     & div.stats{
        padding: 0;
        margin: auto;
        display: grid;
        grid-template-rows: repeat(3, 1.5rem);
        grid-auto-flow: column;
        column-gap: 0rem;
        grid-auto-columns: 8rem 11rem ;
        
     }

     & div.text{
         color: #020166;
         font-size: 18px;
         margin-top: 0.6rem;
     }


     & div.section{
         margin: auto;
         margin-bottom: 2.5rem;
     }

     & span.title{
         font-weight: 600;
     }

     @media (max-width: 425px) {
        margin: 0;
        display:flex;
        flex-direction: column;
        text-align: center;
        & div.stats{
            display:flex;
            flex-direction: column;
        }
        & span.title{
            margin: auto;
            padding: 0;
     }

    }
`;

const PokemonProfileDescription: React.FC<{ stats: Stats[] }> = (props) => {
    return <StyleControl>
        <div className="section">
            <span className="title">Description</span>
            <div className="text">this is a pokemon</div>
        </div>
        <div className="section">
            <span className="title">Stats</span>
            <div className="stats">
                {props.stats.map((stat: Stats) => <div className="text" key={stat.title}>{stat.title + ": " + stat.value} </div>)}
            </div>
        </div>
    </StyleControl>;
}
export default PokemonProfileDescription;