import { useSearchParams } from "react-router";
import { PokemonTypes } from "../data/pokemonTypes";
import { SearchControll } from "./SearchControll";

export const FilterControlls = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <nav className="w-full p-2.5 flex flex-col justify-center items-center">
      <ul className="py-3.5 px-3.5 flex flex-wrap justify-start items-center gap-4 mb-5">
        {PokemonTypes.map((type) => (
          <li
            key={type.id}
            className={`w-[10%] min-w-max py-3.5 px-2.5  text-center text-xl font-bold uppercase rounded-3xl cursor-pointer select-none hover:scale-110 active:scale-90 transition-all ${type.nameType}`}
            onClick={() =>
              setSearchParams((prev) => {
                if (type.nameType === "all") {
                  prev.delete("type");
                  prev.set("page", "1");
                  prev.delete("name");

                  return prev;
                }
                prev.set("type", type.nameType);
                prev.set("page", "1");
                prev.delete("name");

                return prev;
              })
            }
          >
            {type.nameType}
          </li>
        ))}
      </ul>

      <SearchControll></SearchControll>
    </nav>
  );
};
