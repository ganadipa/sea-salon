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
import { newServiceFormSchema } from "@/lib/schemas";
import { actions } from "@/actions/actions";
import toast from "react-hot-toast";

import { KeyboardEvent, useState } from "react";
import { useSession } from "next-auth/react";
import { Textarea } from "./ui/textarea";

export function NewService() {
  const form = useForm({
    resolver: zodResolver(newServiceFormSchema),
    mode: "onBlur",
    defaultValues: {
      serviceName: "",
      duration: "",
      description: "",
      imageUrl: "",
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
          const toastId = toast.loading("Adding new service...");

          const resp = await actions.services.addService(data);

          if (resp.ok) {
            toast.success(resp.description, { id: toastId });
          } else {
            toast.error(resp.description, { id: toastId });
          }
        })}
      >
        <FormField
          control={form.control}
          name="serviceName"
          render={({ field }) => (
            <FormItem className="col-span-1">
              <FormLabel>Service Name</FormLabel>
              <FormControl>
                <Input placeholder="Haircuts and Styling" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem className="col-span-1">
              <FormLabel>Service Duration (hr)</FormLabel>
              <FormControl>
                <Input
                  placeholder="1"
                  type="number"
                  {...field}
                  onKeyDown={handleNonDigitKeyDown}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Image URL</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="The pedicure service was excellent, and my feet feel incredibly soft."
                  {...field}
                  spellCheck={false}
                  className="h-[50px]"
                />
              </FormControl>
              <FormDescription>Your description review.</FormDescription>
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
