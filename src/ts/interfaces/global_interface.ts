export interface IMovie {
  id: string;
  title: string;
  director: string;
  runtime: number;
  rating: number;
}

export type MovieInput = Omit<IMovie, "id" | "rating"> & {
  id?: string;
  rating?: number;
};
