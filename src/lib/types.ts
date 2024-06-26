import { dummyReviews } from "./const";

export type TReviews = typeof dummyReviews;
export type TReview = TReviews[0];

interface User {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  role: "admin" | "customer";
  emailVerified: Date;
  image: string;
}
