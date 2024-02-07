import { createContext, Dispatch, SetStateAction } from "react";
import { IMovie } from "../ts/interfaces/global_interface";

type MovieContextType = [IMovie[] | null, Dispatch<SetStateAction<IMovie[]>>];

const MovieContext = createContext<MovieContextType>([null, () => {}]);

export default MovieContext;
