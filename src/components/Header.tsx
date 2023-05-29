import { SortBy } from "../types.d";

interface Props {
  toggleColors: () => void;
  toggleSortByCountry: () => void;
  sorting: SortBy;
  setFilterCountry: (value: string | null) => void;
  handleReset: () => void;
}

export function Header({
  toggleColors,
  toggleSortByCountry,
  sorting,
  setFilterCountry,
  handleReset,
}: Props) {
  return (
    <header>
      <button onClick={toggleColors}>Colorear files</button>

      <button onClick={toggleSortByCountry}>
        {sorting === SortBy.COUNTRY
          ? "No ordenar por país"
          : "Ordenar por país"}
      </button>

      <button onClick={handleReset}>Resetear estado</button>

      <input
        placeholder="Filtra por país"
        onChange={(e) => {
          setFilterCountry(e.target.value);
        }}
      />
    </header>
  );
}
