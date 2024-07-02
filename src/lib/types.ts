import { z } from "zod";
import { dummyReviews, ServicesData } from "./const";

export type TReviews = typeof dummyReviews;
export type TReview = TReviews[0];

export type TServices = typeof ServicesData;
export type TService = TServices[0];

export type ReservationsDatabaseColumn = {
  email: string | null;
  name: string;
  id: string;
  phonenumber: string;
  service: string;
  datetime: string;
  createdAt: string;
  duration: number | null;
};

export type TBranch = {
  name: string;
  location: string | null;
  startTime: number;
  endTime: number;
};
