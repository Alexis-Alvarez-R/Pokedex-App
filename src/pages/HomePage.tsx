import { CustomPagination } from "@/components/custom/CustomPagination";
import { CustomHeader } from "../components/custom/CustomHeader";
import { PokemonGrid } from "../components/PokemonGrid";
import { usePokemon } from "../hooks/usePokemon";
import { useSearchParams } from "react-router";

export const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page") ?? 1);
  const name = searchParams.get("name") ?? null;
  const type = searchParams.get("type") ?? null;

  const { queryPokemon } = usePokemon({ page, name, type });

  const handlePageChange = (newPage: number) => {
    searchParams.set("page", newPage.toString());
    setSearchParams(searchParams);
  };

  if (queryPokemon.isLoading) {
    return (
      <div className="flex flex-col justify-center items-center w-full">
        <p className="text-5xl text-center p-2 font-bold">Loading...</p>
      </div>
    );
  }

  if (queryPokemon.isError) {
    return (
      <div className="flex flex-col justify-center items-center w-full">
        <p className="text-3xl text-red-500 p-4">Error: No se pudo cargar la data.</p>
      </div>
    );
  }

  if (queryPokemon.data?.results.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center w-full">
        <p className="text-4xl font-bold p-4">No se encontraron Pokémons </p>

        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
          onClick={() => {
            searchParams.delete("name");
            searchParams.delete("type");
            searchParams.set("page", "1");
            setSearchParams(searchParams);
          }}
        >
          Volver a todos
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <CustomHeader></CustomHeader>

      <PokemonGrid pokemons={queryPokemon.data?.results ?? []}></PokemonGrid>

      {queryPokemon.isError}
      <CustomPagination
        totalPages={queryPokemon.data?.totalPages ?? 4}
        currentPage={+page}
        onPageChange={handlePageChange}
      ></CustomPagination>
    </div>
  );
};
