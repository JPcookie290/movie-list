import { Container, Grid, TextField, Fab } from "@mui/material";
import Add from "@mui/icons-material/Add";
import FormEdit from "./FormEdit";
import MovieListItem from "./MovieListItem";
import useMovies from "./useMovies";
import { IMovie, MovieInput } from "../ts/interfaces/global_interface";
import { useState } from "react";
import DeleteDialog from "./DeleteDialog";

export default function MovieList() {
  const [movies, err, handleDelete, handleSubmit] = useMovies();
  const [filter, setFilter] = useState("");
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    movie: IMovie | null;
  }>({ open: false, movie: null });
  const [formDialog, setFormDialog] = useState<{
    open: boolean;
    movie?: IMovie;
  }>({ open: false });
  const handleDialog = (open: boolean, movie: IMovie) => {
    if (open) {
      setDeleteDialog({ open: true, movie });
    } else {
      setDeleteDialog({ open: false, movie: null });
    }
  };
  const handleEditDialog = (open: boolean, movie: IMovie) => {
    if (open) {
      setFormDialog({ open: true, movie });
    } else {
      setFormDialog({ open: false, movie: undefined });
    }
  };
  {
    if (err !== null) {
      return <Container>{(err as Error).message}</Container>;
    } else {
      return (
        <Container sx={{ backgroundColor: "#EBEBEB", p: 10 }}>
          <TextField
            id="filter-input"
            label="Liste Filtern"
            variant="outlined"
            sx={{ mb: 3 }}
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
            }}
          />
          <Grid container spacing={2}>
            {(movies as IMovie[])
              .filter((movie: IMovie) => {
                return movie.title.toLowerCase().includes(filter.toLowerCase());
              })
              .map((movie): JSX.Element => {
                return (
                  <MovieListItem
                    key={movie.id}
                    movie={movie}
                    onDialog={handleDialog}
                    onEdit={handleEditDialog}
                  />
                );
              })}
          </Grid>
          <DeleteDialog
            title="Delete Element"
            text={`Do you really want to delete the movie "${deleteDialog.movie?.title}"`}
            open={deleteDialog.open}
            onConfirm={(isConfirmed) => {
              if (isConfirmed && deleteDialog.movie) {
                (handleDelete as (movie: IMovie) => Promise<void>)(
                  deleteDialog.movie
                );
              }
              setDeleteDialog({ open: false, movie: null });
            }}
          ></DeleteDialog>
          <FormEdit
            onSave={(movie: MovieInput) => {
              setFormDialog({ open: false, movie: undefined });
              (handleSubmit as (movie: MovieInput) => Promise<void>)(movie);
            }}
            open={formDialog.open}
            onClose={() => setFormDialog({ open: false, movie: undefined })}
            movie={formDialog.movie}
          />
          <Fab
            color="primary"
            onClick={() => setFormDialog({ open: true, movie: undefined })}
            sx={{
              position: "fixed",
              right: "50%",
              bottom: "10%",
              transform: "translateX(-50%",
            }}
          >
            <Add />
          </Fab>
        </Container>
      );
    }
  }
}

// old Version without MovieList.container.tsx

// export default function MovieList() {
//   const [movies, setMovies] = useState<IMovie[]>([]);
//   const [err, setErr] = useState<Error | null>(null);
//   const options = {
//     method: "GET",
//     headers: { "Content-Type": "application/json" },
//   };
//   useEffect(() => {
//     const connect = async () => {
//       try {
//         const data = await fetch(`/movies`, options);
//         if (!data.ok) {
//           throw new Error("Sorry, we couldn't connect to our server!");
//         }
//         setMovies((await data.json()) as IMovie[]);
//       } catch (error) {
//         setErr(error as Error);
//       }
//     };
//     connect();
//   }, []);
//   const handleRating = (id: number, rating: number): void => {
//     setMovies((prevMovie) => {
//       return prevMovie.filter((movie) => {
//         if (movie.id === id) movie.rating = rating;
//         return movie;
//       });
//     });
//   };
//   if (err !== null) {
//     return <div>{err?.message}</div>;
//   } else {
//     return (
//       <div className="container">
//         {" "}
//         {movies.map((movie): JSX.Element => {
//           return (
//             <MovieListItem
//               key={movie.id}
//               movie={movie}
//               onRating={handleRating}
//             />
//           );
//         })}
//       </div>
//     );
//   }
// }
