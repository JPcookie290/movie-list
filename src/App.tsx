import "./App.css";
import MovieList from "./components/MovieList";
import MovieProvider from "./components/MoviesProvider";
import FormEdit from "./components/FormEdit";

function App() {
  return (
    <>
      <h1 style={{ textAlign: "center" }}>Movie List</h1>
      <MovieProvider>
        <MovieList />
      </MovieProvider>
      <FormEdit
        onSave={(movie) => console.log(movie)}
        editMovie={{
          id: 9,
          title: "Best Film ever",
          director: "Best director ever",
          runtime: 300,
          rating: 5,
        }}
      ></FormEdit>
    </>
  );
}

export default App;
