import "./App.css";
import { UsersList } from "./components/UsersList";
import { useFetchUsers } from "./hooks/useFetchUsers";
import { Header } from "./components/Header";
import { useTableUsers } from "./hooks/useTableUsers";

function App() {
  const { isLoading, errorState } = useFetchUsers();
  const { state, functions } = useTableUsers();

  const { sorting, showColors, sortedUsers } = state;
  const {
    toggleColors,
    toggleSortByCountry,
    setFilterCountry,
    handleReset,
    handleChangeSort,
    handleDelete,
  } = functions;

  return (
    <div className="App">
      <h1>Lista de usuarios</h1>
      {isLoading && !errorState.hasError && <p>Loading...</p>}
      {errorState.hasError && <p>{errorState.message}</p>}
      {!isLoading && (
        <>
          <Header
            toggleColors={toggleColors}
            toggleSortByCountry={toggleSortByCountry}
            sorting={sorting}
            setFilterCountry={setFilterCountry}
            handleReset={handleReset}
          />
          <main>
            <UsersList
              changeSorting={handleChangeSort}
              deleteUser={handleDelete}
              showColors={showColors}
              users={sortedUsers}
            />
          </main>
        </>
      )}
    </div>
  );
}

export default App;
