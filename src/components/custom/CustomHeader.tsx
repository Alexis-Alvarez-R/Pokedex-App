import { FilterControlls } from "../FilterControlls";

export const CustomHeader = () => {
  return (
    <header className="w-full h-[20%] p-2.5 ">
      <img
        src="../../../public/assets/logoPokedex-BfTb01Xe.png"
        alt="logo de la pokedex"
        className="w-full h-[100px] object-contain"
      />

      <FilterControlls></FilterControlls>
    </header>
  );
};
