"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { registerFormSchema } from "@/lib/schemas";
import { register } from "@/actions/authentication";

export function SignUp() {
  const form = useForm({
    resolver: zodResolver(registerFormSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  return (
    <Form {...form}>
      <form
        className="grid grid-cols-2 gap-4 p-8 bg-white border border-gray-200 rounded-lg w-[500px]"
        onSubmit={form.handleSubmit(async (data) => {
          register(data);
        })}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="col-span-1">
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Abigail" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="col-span-1">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Abigail" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="col-span-1">
              <FormLabel>password</FormLabel>
              <FormControl>
                <Input placeholder="Abigail" {...field} />
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
