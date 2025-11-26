import { useRef } from "react";
import { useSearchParams } from "react-router";

export const SearchControll = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const inputRef = useRef<HTMLInputElement>(null);

  const setQueryParams = (name: string, value: string) => {
    setSearchParams((prev) => {
      prev.set(name, value);

      return prev;
    });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const value = inputRef.current?.value ?? "";
      setQueryParams("name", value);
    }
  };

  const handleClick = () => {
    const value = inputRef.current?.value ?? "";
    setQueryParams("name", value);
  };

  return (
    <div className="px-1.5 w-[50%] flex justify-center items-center gap-1.5">
      <input
        ref={inputRef}
        defaultValue={searchParams.get("name") ?? ""}
        type="text"
        placeholder="Search"
        className="p-2.5 w-[80%] rounded-2xl text-white bg-[#393939] focus:outline-none focus:border-none hover:brightness-120"
        onKeyDown={handleKeyDown}
      ></input>
      <button
        className="flex justify-center items-center bg-[#393939] p-3 aspect-square rounded-2xl cursor-pointer hover:brightness-120 active:scale-90 transition-all "
        onClick={handleClick}
      >
        <img className="w-5 h-5 object-contain" src="../../public/assets/search.svg" alt="icon-search" />
      </button>
    </div>
  );
};
