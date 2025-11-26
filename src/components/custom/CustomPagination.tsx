interface Props {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const CustomPagination = ({ totalPages, currentPage, onPageChange }: Props) => {
  const createPageArray = () => {
    const delta = 2; // paginas alrededor de la actual
    const range: (number | string)[] = [];

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
        range.push(i);
      } else if (range[range.length - 1] !== "...") {
        range.push("...");
      }
    }

    return range;
  };

  const pages = createPageArray();

  return (
    <div className="flex items-center justify-center space-x-2 mb-10 gap-3">
      <button
        className={
          "bg-gray-200 text-black px-3 py-2 rounded-md cursor-pointer disabled:bg-gray-400 disabled:text-gray-600 disabled:cursor-not-allowed"
        }
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Prev
      </button>

      {pages.map((p, idx) =>
        p === "..." ? (
          <span key={idx} className="px-2">
            ...
          </span>
        ) : (
          <button
            key={idx}
            className={
              p === currentPage
                ? "font-bold cursor-pointer bg-gray-700 px-3 py-2 rounded-md"
                : " bg-gray-200 text-black px-3 py-2 rounded-md cursor-pointer hover:scale-110 transition-all"
            }
            onClick={() => onPageChange(Number(p))}
          >
            {p}
          </button>
        )
      )}

      <button
        className="bg-gray-200 text-black px-3 py-2 rounded-md cursor-pointer  disabled:bg-gray-400 disabled:text-gray-600 disabled:cursor-not-allowed"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
};
