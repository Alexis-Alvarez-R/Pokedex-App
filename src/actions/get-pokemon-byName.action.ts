import { pokeApi } from "../api/pokeApi";
import type { Pokemon } from "../interfaces/Pokemon";

export const getPokemonByName = async (name: string): Promise<Pokemon | null> => {
  try {
    const { data } = await pokeApi.get<Pokemon>(`/pokemon/${name.toLowerCase()}`);
    return data;
  } catch (error) {
    console.log({ error });
    // Si no existe, devolvemos null
    return null;
  }
};
