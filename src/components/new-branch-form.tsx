"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { newBranchFormSchema } from "@/lib/schemas";
import { actions } from "@/actions/actions";
import toast from "react-hot-toast";

import { KeyboardEvent, useState } from "react";
import { useSession } from "next-auth/react";
import { Textarea } from "./ui/textarea";

export function NewBranch() {
  const form = useForm({
    resolver: zodResolver(newBranchFormSchema),
    mode: "onBlur",
    defaultValues: {
      branchName: "",
      branchLocation: "",
      startTime: "",
      endTime: "",
    },
  });

  const handleNonDigitKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (["e", "E", "+", "-"].includes(e.key)) {
      e.preventDefault();
    }
  };

  const session = useSession();

  return (
    <Form {...form}>
      <form
        className="grid grid-cols-2 gap-4 p-8 bg-white border border-gray-200 rounded-lg w-[500px]"
        onSubmit={form.handleSubmit(async (data) => {
          const toastId = toast.loading("Adding new branch...");

          const resp = await actions.branch.addBranch(data);

          if (resp.ok) {
            toast.success(resp.description, { id: toastId });
          } else {
            toast.error(resp.description, { id: toastId });
          }
        })}
      >
        <FormField
          control={form.control}
          name="branchName"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Branch Name</FormLabel>
              <FormControl>
                <Input placeholder="Fancy Pants Rich Mcgee" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="branchLocation"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Where is this new branch?</FormLabel>
              <FormControl>
                <Input
                  placeholder="789 Uptown St, New York, NY 10003"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="startTime"
          render={({ field }) => (
            <FormItem className="col-span-1">
              <FormLabel>Openting Time</FormLabel>
              <FormControl>
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="09"
                    type="number"
                    {...field}
                    className="w-[45%]"
                    onKeyDown={handleNonDigitKeyDown}
                  />
                  <p className="opacity-50">:</p>
                  <Input
                    placeholder="00"
                    disabled
                    type="number"
                    className="w-[45%]"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="endTime"
          render={({ field }) => (
            <FormItem className="col-span-1">
              <FormLabel>Closing Time</FormLabel>
              <FormControl>
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="21"
                    type="number"
                    {...field}
                    className="w-[45%]"
                    onKeyDown={handleNonDigitKeyDown}
                  />
                  <p className="opacity-50">:</p>
                  <Input
                    placeholder="00"
                    disabled
                    type="number"
                    className="w-[45%]"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="col-span-2 flex justify-end">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
}
