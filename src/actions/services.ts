"use server";

import { TMutationResponse } from "./actions";
import { newServiceFormSchema } from "@/lib/schemas";
import { servicesBranchesTable, servicesTable } from "@/drizzle/schema";
import { db } from "@/drizzle";
import { NeonDbError } from "@neondatabase/serverless";
import { z } from "zod";

const ZAddService = z.object({
  serviceName: z.string(),
  duration: z.number(),
  branchName: z.string(),
});

export async function addService(service: unknown): Promise<TMutationResponse> {
  const validatedService = ZAddService.safeParse(service);
  if (!validatedService.success) {
    return {
      ok: false,
      description: "Invalid service data",
    };
  }

  let ret: TMutationResponse = {
    ok: false,
    description: "Something unexpected happened",
  };

  try {
    await db.insert(servicesTable).values({
      name: validatedService.data.serviceName,
      duration: validatedService.data.duration,
    });

    await db.insert(servicesBranchesTable).values({
      service: validatedService.data.serviceName,
      branch: validatedService.data.branchName,
    });

    ret = {
      ok: true,
      description: "Successfully added the service",
    };
  } catch (error) {
    if (error instanceof NeonDbError) {
      if (error.code === "23505") {
        ret = {
          ok: false,
          description: "Service already exists",
        };
      } else {
        ret = {
          ok: false,
          description: "Error adding service",
        };
      }
    } else {
      ret = {
        ok: false,
        description: "Error adding service",
      };
    }
  }

  return ret;
}

export async function getServices() {
  return await db.select().from(servicesTable);
}
