import { z } from "zod";
import { dummyReviews } from "./const";

export type TReviews = typeof dummyReviews;
export type TReview = TReviews[0];

export type ReservationsDatabaseColumn = {
  email: string | null;
  name: string;
  id: string;
  phonenumber: string;
  service: string;
  datetime: string;
  createdAt: string;
};
