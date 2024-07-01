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

import { KeyboardEvent, use, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { TBranch } from "@/lib/types";
import { cn } from "@/lib/utils";

export function NewService() {
  const [branches, setBranches] = useState<TBranch[]>([]);
  const [selectedBranch, setSelectedBranch] = useState<TBranch | null>(null);

  const form = useForm({
    resolver: zodResolver(newServiceFormSchema),
    mode: "onBlur",
    defaultValues: {
      branchName: "",
      serviceName: "",
      duration: "",
    },
  });

  const handleNonDigitKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (["e", "E", "+", "-"].includes(e.key)) {
      e.preventDefault();
    }
  };

  const session = useSession();

  useEffect(() => {
    const fetchBranches = async () => {
      setBranches(await actions.branch.getBranches());
    };
    fetchBranches();
  }, []);

  console.log(branches);

  return (
    <Form {...form}>
      <form
        className="grid grid-cols-2 gap-4 p-8 bg-white border border-gray-200 rounded-lg w-[500px]"
        onSubmit={form.handleSubmit(async (data) => {
          const toastId = toast.loading("Adding new service...");

          if (!selectedBranch) {
            toast.error("Please select a branch", { id: toastId });
            return;
          }

          const resp = await actions.services.addService({
            ...data,
            branchName: selectedBranch.name,
          });

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
              <Select
                onValueChange={(value) => {
                  const branch = branches.find((b) => b.name === value);
                  setSelectedBranch(branch || null);
                  field.onChange(value);
                }}
                defaultValue={field.value}
                value={selectedBranch?.name}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a branch name" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {branches.map((branch) => (
                    <SelectItem key={branch.name} value={branch.name}>
                      {branch.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Select for which branch you want to add a new service.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="serviceName"
          render={({ field }) => (
            <FormItem className="col-span-1">
              <FormLabel>Service Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Haircuts and Styling"
                  {...field}
                  disabled={selectedBranch === null}
                />
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
                  disabled={selectedBranch === null}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="col-span-2 flex justify-end">
          <Button type="submit" disabled={selectedBranch === null}>
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
