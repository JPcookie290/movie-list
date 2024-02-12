import { MovieInput } from "../ts/interfaces/global_interface";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import movieSchema from "./validationSchema";

interface Props {
  open: boolean;
  onSave: (movie: MovieInput) => void;
  onClose: () => void;
  movie?: MovieInput;
}

export default function FormEdit({
  open,
  onSave,
  onClose,
  movie = { title: "", director: "", runtime: 0 },
}: Props): JSX.Element {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MovieInput>({ resolver: yupResolver(movieSchema) });

  useEffect(() => {
    if (movie.id) reset(movie);
  }, [movie, reset]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle id="from-dialog-title">
        {movie.id ? "Edit Movie" : "Add new Movie"}
      </DialogTitle>
      <form onSubmit={handleSubmit(onSave)}>
        <DialogContent>
          <div>
            <TextField
              {...register("title")}
              error={!!errors.title}
              label="Title"
              sx={{ mb: 2 }}
            />
            {errors.title && <div>{errors.title.message}</div>}
          </div>
          <div>
            <TextField
              {...register("director")}
              error={!!errors.director}
              label="Director"
              sx={{ mb: 2 }}
            />
            {errors.director && <div>{errors.director.message}</div>}
          </div>
          <div>
            <TextField
              {...register("runtime")}
              error={!!errors.runtime}
              label="Runtime"
            />
            {errors.runtime && <div>{errors.runtime.message}</div>}
          </div>
          <DialogActions>
            <Button color="primary" type="submit">
              Save
            </Button>
            <Button color="secondary" onClick={onClose}>
              Cancel
            </Button>
          </DialogActions>
        </DialogContent>
      </form>
    </Dialog>
  );
}
