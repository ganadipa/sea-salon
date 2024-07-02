"use server";

import { TMutationResponse } from "./actions";
import {
  branchesTable,
  servicesBranchesTable,
  servicesTable,
} from "@/drizzle/schema";
import { db } from "@/drizzle";
import { z } from "zod";
import { NeonDbError } from "@neondatabase/serverless";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

const ZAddBranch = z.object({
  branchName: z.string(),
  branchLocation: z.string(),
  startTime: z.number(),
  endTime: z.number(),
});

export async function addBranch(service: unknown): Promise<TMutationResponse> {
  const validatedService = ZAddBranch.safeParse(service);
  if (!validatedService.success) {
    return {
      ok: false,
      description: "Invalid new branch data",
    };
  }

  let ret: TMutationResponse = {
    ok: false,
    description: "Something unexpected happened",
  };

  try {
    await db.insert(branchesTable).values({
      name: validatedService.data.branchName,
      location: validatedService.data.branchLocation,
      startTime: validatedService.data.startTime,
      endTime: validatedService.data.endTime,
    });

    ret = {
      ok: true,
      description: "Successfully added the new branch",
    };
  } catch (error) {
    if (error instanceof NeonDbError) {
      if (error.code === "23505") {
        ret = {
          ok: false,
          description: "branch already exists",
        };
      } else {
        ret = {
          ok: false,
          description: "Error adding branch",
        };
      }
    } else {
      ret = {
        ok: false,
        description: "Error adding branch",
      };
    }
  }

  revalidatePath("/app", "layout");
  revalidatePath("/app/dashboard");

  return ret;
}

export async function getBranches(serviceName?: string) {
  revalidatePath("/app", "layout");
  revalidatePath("/app/dashboard");

  return await db
    .selectDistinct({
      name: branchesTable.name,
      location: branchesTable.location,
      startTime: branchesTable.startTime,
      endTime: branchesTable.endTime,
    })
    .from(branchesTable)
    .innerJoin(
      servicesBranchesTable,
      eq(branchesTable.name, servicesBranchesTable.branch)
    )
    .where(
      serviceName ? eq(servicesBranchesTable.service, serviceName) : undefined
    );
}

export async function getAllBranches() {
  revalidatePath("/app", "layout");
  revalidatePath("/app/dashboard");

  return await db.selectDistinct().from(branchesTable);
}

export async function getServicesBranches() {
  revalidatePath("/app", "layout");
  revalidatePath("/app/dashboard");

  return await db.select().from(servicesBranchesTable);
}
