import { useQuery } from "@tanstack/react-query";
import { getPokemon, getPokemonByName, getPokemonsByType } from "../actions/index";

export const usePokemon = ({ page, name, type }: { page: number; name: string | null; type: string | null }) => {
  const queryPokemon = useQuery({
    queryKey: ["pokemons", { page, name, type }],
    staleTime: 1000 * 60 * 5,
    retry: false,
    queryFn: async () => {
      if (name) {
        const pokemon = await getPokemonByName(name);
        return {
          results: pokemon ? [pokemon] : [],
          totalPages: 1,
        };
      }

      // 🔥 Filtrar por tipo
      if (type) {
        return await getPokemonsByType(type, page);
      }

      //  Paginación normal
      return await getPokemon(page);
    },
  });

  return { queryPokemon };
};
