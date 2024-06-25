import { addReservation } from "./reservations";
import { addReview, getReviews } from "./reviews";

export type TMutationResponse = {
  ok: boolean;
  description: string;
};

export type TQueryResponse<T> = T | undefined;

export const actions = {
  reviews: {
    addReview,
    getReviews,
  },
  reservations: {
    addReservation,
  },
};
