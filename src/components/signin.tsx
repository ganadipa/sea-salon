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
import { loginFormSchema } from "@/lib/schemas";

import { actions } from "@/actions/actions";
import toast from "react-hot-toast";
import { sleep } from "@/lib/utils";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export function SignIn({
  isSubmitting,
  setIsSubmitting,
}: {
  isSubmitting: boolean;
  setIsSubmitting: (value: boolean) => void;
}) {
  const form = useForm({
    resolver: zodResolver(loginFormSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
        action={async (formdata) => {
          const toastId = toast.loading("Signing in...");
          setIsSubmitting(true);
          let res;
          try {
            res = await actions.auth.signInAction(formdata);
          } catch (error) {}

          if (res && res.ok) {
            toast.success("Signed in successfully", { id: toastId });
            await sleep(1000);
            setIsSubmitting(false);
            redirect("/app/dashboard");
          } else {
            toast.error(res?.description || "Invalid credentials", {
              id: toastId,
            });
            setIsSubmitting(false);
          }
        }}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="abigail.jr@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="col-span-2 flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
