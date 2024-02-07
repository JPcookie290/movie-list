export interface IMovie {
  id: number;
  title: string;
  director: string;
  runtime: number;
  rating: number;
}

export type MovieInput = Omit<IMovie, "id" | "rating"> & {
  id?: number;
  rating?: number;
};
