import "./App.css";
import { Typography } from "@mui/material";
import MovieList from "./components/MovieList";
import MovieProvider from "./components/MoviesProvider";

function App() {
  return (
    <>
      <Typography
        variant="h3"
        component="h1"
        sx={{ textAlign: "center", mt: 3, mb: 3 }}
      >
        Movie List
      </Typography>
      <MovieProvider>
        <MovieList />
      </MovieProvider>
    </>
  );
}

export default App;
