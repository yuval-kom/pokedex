export interface Stats {
  title: string;
  value: number;
}

export interface PokemonT {
  name: string;
  id: number;
  stats: Stats[];
  types: string[];
  imageUrl: string;
}
