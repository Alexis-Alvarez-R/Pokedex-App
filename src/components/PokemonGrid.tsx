import type { Pokemon } from "../interfaces/Pokemon";
import { PokemonCard } from "./PokemonCard";

interface Props {
  pokemons: Pokemon[];
}

export const PokemonGrid = ({ pokemons }: Props) => {
  return (
    <div className="w-[80%] grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-5 p-4 mb-7">
      {pokemons.map((pokemon) =>
        !pokemon ? <div>Not Found </div> : <PokemonCard key={pokemon.id} pokemon={pokemon}></PokemonCard>
      )}
    </div>
  );
};
