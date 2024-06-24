import { addReview, getReviews } from "./reviews";

export type TMutationnResponse = {
  ok: boolean;
  description: string;
};

export type TQueryResponse<T> = T | undefined;

export const actions = {
  reviews: {
    addReview,
    getReviews,
  },
};
