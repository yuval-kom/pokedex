import { PokemonT, Stats } from "../pokemonType";
const setStats = (statsData: any[]): Stats[] => {
  let stats = [];
  let total = 0;
  for (const key in statsData) {
    total += statsData[key].base_stat;
    stats.push({
      title: statsData[key].stat.name,
      value: statsData[key].base_stat,
    });
  }
  stats.push({ title: "total", value: total });
  return stats;
};

const settypes = (typesData: any[]): string[] => {
  let types = [];
  for (const key in typesData) {
    types.push(typesData[key].type.name);
  }
  return types;
};

export const getPokemon = async (name: string) => {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await res.json();
    let stats: Stats[] = setStats(data.stats);
    let types: string[] = settypes(data.types);
    let imageUrl = data.sprites.front_default;
    const PokemonName = name.charAt(0).toUpperCase() + name.slice(1);
    const pokemonId = data.id.toString().padStart(3, "0");
    const pokemon: PokemonT = {
      name: PokemonName,
      id: pokemonId,
      stats,
      types,
      imageUrl,
    };
    return pokemon;
  } catch (err) {
    console.log(err);
  }
};

export const getPokemons = async (offset: string, limit?: string) => {
  try {
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${
        limit ? limit : "12"
      }`
    );
    const data = await res.json();
    const pokemonsData = data.results;
    let pokemons: PokemonT[] = [];
    for (const key in pokemonsData) {
      const pokemon = await getPokemon(pokemonsData[key].name);
      if (pokemon !== undefined) pokemons.push(pokemon);
    }

    const nextOffset: string = data.next
      ? data.next.split("offset=")[1].split("&")[0]
      : null;
    const prevOffset: string = data.previous
      ? data.previous.split("offset=")[1].split("&")[0]
      : null;

    return {
      pokemonsData: pokemons,
      nextOffset,
      prevOffset,
    };
  } catch (err) {
    console.log(err);
  }
};
