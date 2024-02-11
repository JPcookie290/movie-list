import {
  Card,
  CardContent,
  Grid,
  Typography,
  CardActions,
  IconButton,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import Rating from "./Rating";
import { IMovie } from "../ts/interfaces/global_interface";

interface Props {
  movie: IMovie;
  onDialog: (open: boolean, movie: IMovie) => void;
  onEdit: (open: boolean, movie: IMovie) => void;
}
interface Props {
  movie: {
    id: number;
    title: string;
    director: string;
    runtime: number;
    rating: number;
  };
}

export default function MovieListItem({ movie, onDialog, onEdit }: Props) {
  return (
    <Grid item>
      <Card>
        <CardContent>
          <Typography component="h2" variant="h5">
            Title: {movie.title}
          </Typography>
          <Typography variant="subtitle1" component="h5" sx={{ mb: 1 }}>
            Director: {movie.director}
          </Typography>
          <Typography variant="body1" component="span">
            Runtime: {movie.runtime}
          </Typography>
          <div>
            <Rating item={movie} />
          </div>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            color="primary"
            aria-label="delete-movie"
            onClick={() => onDialog(true, movie)}
          >
            <DeleteIcon />
          </IconButton>
          <IconButton
            color="primary"
            aria-label="edit-movie"
            onClick={() => onEdit(true, movie)}
          >
            <Edit />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
}
