import { pokeApi } from "../api/pokeApi";
import type { Pokemon } from "../interfaces/Pokemon";

const LIMIT = 20;

export const getPokemonsByType = async (
  type: string,
  page: number
): Promise<{ results: Pokemon[]; totalPages: number }> => {
  const { data } = await pokeApi.get<{
    pokemon: { pokemon: { name: string; url: string } }[];
  }>(`/type/${type.toLowerCase()}`);

  const pokemonsList = data.pokemon.map((p) => p.pokemon);

  const totalPages = Math.ceil(pokemonsList.length / LIMIT);
  const offset = (page - 1) * LIMIT;

  const pageSlice = pokemonsList.slice(offset, offset + LIMIT);

  const results = await Promise.all(
    pageSlice.map(async (p) => {
      const { data } = await pokeApi.get<Pokemon>(p.url);
      return data;
    })
  );

  return { results, totalPages };
};
