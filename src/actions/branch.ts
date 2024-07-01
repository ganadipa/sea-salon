"use server";

import { TMutationResponse } from "./actions";
import { newServiceFormSchema } from "@/lib/schemas";
import {
  branchesTable,
  servicesBranchesTable,
  servicesTable,
} from "@/drizzle/schema";
import { db } from "@/drizzle";

export async function addBranch(service: unknown): Promise<TMutationResponse> {
  const validatedService = newServiceFormSchema.safeParse(service);
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

    ret = {
      ok: true,
      description: "Successfully added the service",
    };
  } catch (error) {
    ret = {
      ok: false,
      description: "Error adding service",
    };
  }

  return ret;
}

export async function getBranches() {
  return await db.select().from(branchesTable);
}

export async function getServicesBranches() {
  return await db.select().from(servicesBranchesTable);
}