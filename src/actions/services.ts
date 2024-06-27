import { z } from "zod";
import { TMutationResponse } from "./actions";

export async function addService(
  service: z.infer<typeof newServiceFormSchema>
): TMutationResponse {}
