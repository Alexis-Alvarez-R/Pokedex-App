interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const PokemonModal = ({ isOpen, onClose, children }: Props) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-[#2a2a2a] p-6 rounded-xl shadow-xl relative max-w-md w-full">
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
        >
          X
        </button>

        {children}
      </div>
    </div>
  );
};
