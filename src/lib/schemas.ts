import { z } from "zod";
import { services } from "./const";

export const reviewFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(20, {
      message: "Username must be at most 20 characters.",
    }),
  description: z
    .string()
    .min(5, {
      message: "Description must be at least 5 characters.",
    })
    .max(100, {
      message: "Description must be at most 100 characters.",
    }),
  rating: z
    .preprocess(
      (val: unknown) => parseInt(val as string, 10),
      z.number().int().min(1).max(5)
    )
    .refine((val) => val >= 1 && val <= 5, {
      message: "Rating must be between 1 and 5.",
    }),
});

export const reservationFormSchema = z
  .object({
    name: z
      .string()
      .min(2, {
        message: "Name must be at least 2 characters.",
      })
      .max(20, {
        message: "Name must be at most 20 characters.",
      }),
    phonenumber: z
      .string()
      .min(8, {
        message: "Phone number must be at least 8 digits.",
      })
      .max(15, {
        message: "Phone number must be at most 15 digits.",
      }),
    service: z.enum(services, {
      message: "Service must be one of the available options.",
    }),
    date: z.date(),
    startTime: z
      .preprocess(
        (val: unknown) => (val === "" ? 0 : parseInt(val as string, 10)),
        z.number().int().min(9).max(20)
      )
      .refine((val) => val <= 20, {
        message: "Our salon last appointment is at 8pm",
      })
      .refine((val) => val >= 9, {
        message: "Our salon opens at 9am",
      }),
  })
  .refine(
    (data) => {
      // Combine date and startTime to create a Date object for the reservation start time
      const reservationStartTime = new Date(data.date);
      reservationStartTime.setHours(data.startTime, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds

      // Check if the reservation start time is in the future
      return reservationStartTime.getTime() > new Date().getTime();
    },
    {
      message: "Reservation must be in the future.",
      path: ["date"],
    }
  );
