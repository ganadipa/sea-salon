import { signOutAction, signInAction, register } from "./authentication";
import { addReservation, getAllReservations } from "./reservations";
import { addReview, getReviews } from "./reviews";
import { addService, getServices } from "./services";

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
    getAllReservations,
  },
  auth: { signInAction, signOutAction, register },
  services: {
    addService,
    getServices,
  },
};
