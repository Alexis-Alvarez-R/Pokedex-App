import { pokeApi } from "../api/pokeApi";
import type { Pokemon } from "../interfaces/Pokemon";

const LIMIT = 20;

export const getPokemon = async (page: number): Promise<{ results: Pokemon[]; totalPages: number }> => {
  const offset = (page - 1) * LIMIT;

  // Traemos la lista básica de pokémon
  const { data } = await pokeApi.get<{
    count: number;
    results: { name: string; url: string }[];
  }>(`/pokemon?limit=${LIMIT}&offset=${offset}`);

  // Calculamos totalPages usando count
  const totalPages = Math.ceil(data.count / LIMIT);

  // Pedimos la información completa de cada Pokémon
  const results = await Promise.all(
    data.results.map(async (p) => {
      const { data } = await pokeApi.get<Pokemon>(p.url);
      return data;
    })
  );

  return { results, totalPages };
};
