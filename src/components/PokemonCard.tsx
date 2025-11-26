import { useState } from "react";

import { validateId } from "../helpers/idValidated";
import type { Pokemon } from "../interfaces/Pokemon";
import { validarStats } from "../helpers/validateStats";
import { pokemonType } from "../data/pokemonTypesColors";
import { PokemonModal } from "./PokemonModal";

interface Props {
  pokemon: Pokemon;
}

export const PokemonCard = ({ pokemon }: Props) => {
  const [open, setOpen] = useState(false);
  const primaryType = pokemon.types[0].type.name;
  const primaryColor = pokemonType.get(primaryType) || "#DCDCDC";

  const gradientStyle = {
    backgroundImage: `linear-gradient(to bottom right, ${primaryColor} 5%, #292929 50%)`,
  };

  return (
    <>
      {/* CARD */}
      <div
        onClick={() => setOpen(true)}
        className="cursor-pointer bg-[#292929] p-5 w-full h-[350px] flex flex-col gap-4 rounded-xl hover:brightness-120 transition-all"
      >
        <div style={gradientStyle} className="w-full h-[150px] flex justify-center items-center rounded-xl">
          <img className="w-[170px] h-[170px] object-contain" src={pokemon.sprites.front_default} alt="img-pokemon" />
        </div>

        <div className="p-2.5 w-full flex flex-col gap-4">
          <div className="flex justify-between items-center gap-2.5">
            <p className="text-2xl "> {validateId(pokemon.id)} </p>
            <p className="ml-auto p-2 text-sm rounded-md bg-[#393939]">{validarStats(pokemon.weight)} kg</p>
            <p className="p-2 text-sm rounded-md bg-[#393939]">{validarStats(pokemon.height)} M</p>
          </div>

          <p className="text-2xl capitalize">{pokemon.name}</p>
          <div className="py-2. flex justify-start items-center gap-4">
            {pokemon.types.map((type) => (
              <p
                key={type.type.name}
                className={`py-2.5 px-5 text-sm rounded-2xl capitalize font-bold ${type.type.name}`}
              >
                {type.type.name}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* MODAL */}
      <PokemonModal isOpen={open} onClose={() => setOpen(false)}>
        <div className="flex flex-col items-center gap-6 w-full">
          <div style={gradientStyle} className="w-full flex justify-center items-center rounded-xl py-6">
            <img
              className="w-[200px] h-[200px] object-contain drop-shadow-lg"
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
            />
          </div>

          <p className="text-3xl font-bold capitalize">{pokemon.name}</p>

          {/* STATS */}
          <div className="w-full flex flex-col gap-4">
            {pokemon.stats.map((s) => {
              const statValue = s.base_stat;
              const statPercent = Math.min(statValue, 150); // para no pasarse del 100%

              return (
                <div key={s.stat.name} className="w-full">
                  <div className="flex justify-between mb-1 px-1">
                    <span className="capitalize">{s.stat.name}</span>
                    <span className="font-bold">{statValue}</span>
                  </div>

                  {/* Barra */}
                  <div className="w-full bg-[#3a3a3a] h-3 rounded-xl overflow-hidden">
                    <div
                      className="h-full rounded-xl transition-all duration-500"
                      style={{
                        width: `${(statPercent / 150) * 100}%`,
                        backgroundColor: primaryColor,
                      }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </PokemonModal>
    </>
  );
};
