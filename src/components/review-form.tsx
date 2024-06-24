"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { Textarea } from "./ui/textarea";
import { reviewFormSchema } from "@/lib/schemas";
import { actions } from "@/actions/actions";
import toast from "react-hot-toast";

export function ReviewForm({
  onFormSubmission,
}: {
  onFormSubmission: () => void;
}) {
  const form = useForm({
    resolver: zodResolver(reviewFormSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      description: "",
      rating: 5,
    },
  });

  return (
    <Form {...form}>
      <form
        className="space-y-8"
        action={async () => {
          const result = await form.trigger();
          if (!result) return;
          const toastId = toast.loading("Submitting review...");

          const reviewData = form.getValues();

          const resp = await actions.reviews.addReview(reviewData);

          if (resp.ok) {
            toast.success(resp.description, { id: toastId });
          } else {
            toast.error(resp.description, { id: toastId });
          }

          onFormSubmission();
        }}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Abigail" {...field} spellCheck={false} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="The pedicure service was excellent, and my feet feel incredibly soft."
                  {...field}
                  spellCheck={false}
                />
              </FormControl>
              <FormDescription>Your description review.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rating</FormLabel>
              <FormControl>
                <Input placeholder="5" {...field} spellCheck={false} />
              </FormControl>
              <FormDescription>Your rating, out of 5 stars.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
