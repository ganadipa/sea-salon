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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { reservationFormSchema } from "@/lib/schemas";
import { actions } from "@/actions/actions";
import toast from "react-hot-toast";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "./ui/calendar";
import { CalendarIcon } from "@radix-ui/react-icons";
import { KeyboardEvent, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { z } from "zod";
import { TBranch, TService, TServices } from "@/lib/types";

export function ReservationForm({ services }: { services: TServices }) {
  const [selectedService, setSelectedService] = useState<TService | null>(null);
  const [branchesOptions, setBranchesOptions] = useState<TBranch[]>([]);
  const [selectedBranch, setSelectedBranch] = useState<TBranch | null>(null);

  useEffect(() => {
    async function fetchBranches() {
      if (selectedService) {
        setBranchesOptions(
          await actions.branch.getBranches(selectedService.name)
        );
      }
    }
    fetchBranches();
  }, [selectedService]);

  useEffect(() => {
    if (selectedService) {
      setSelectedBranch(null);
    }
  }, [selectedService]);

  const openTime = selectedBranch?.startTime || 9;
  const lastOrder =
    (selectedBranch?.endTime || 21) - (selectedService?.duration || 1);
  const dynamicReservationFormSchema = reservationFormSchema.merge(
    z.object({
      startTime: z.preprocess(
        (val: unknown) => (val === "" ? 0 : parseInt(val as string, 10)),
        z
          .number()
          .int()
          .min(openTime, {
            message:
              "Our salon opens at " +
              (openTime > 12 ? openTime - 12 : openTime) +
              (openTime > 12 ? "pm" : "am"),
          })
          .max(lastOrder, {
            message:
              "The last order for this service is at " +
              (lastOrder % 12) +
              (lastOrder > 12 ? "pm" : "am"),
          })
      ),
    })
  );

  const form = useForm({
    resolver: zodResolver(dynamicReservationFormSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      phonenumber: "",
      service: "",
      branchName: null,
      date: undefined,
      startTime: "09",
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
        className="grid grid-cols-2 gap-4 p-8 bg-white border border-gray-200 rounded-lg mx-2 w-full md:w-[500px]"
        onSubmit={form.handleSubmit(async (data) => {
          const toastId = toast.loading("Submitting review...");

          if (!data.date || !data.startTime) {
            toast.error("Please select a date and time", { id: toastId });
            return;
          }

          const submitData = {
            ...data,
            datetime: new Date(
              (data.date as Date).getFullYear(),
              (data.date as Date).getMonth(),
              (data.date as Date).getDate(),
              parseInt(data.startTime),
              0
            ).toISOString(),
            duration: selectedService?.duration,
          };
          const resp = await actions.reservations.addReservation(submitData);

          if (resp.ok) {
            toast.success(resp.description, { id: toastId });
          } else {
            toast.error(resp.description, { id: toastId });
          }
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
          name="phonenumber"
          render={({ field }) => (
            <FormItem className="col-span-1">
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input
                  placeholder="08121212121"
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
          name="service"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Service</FormLabel>
              <Select
                onValueChange={(value) => {
                  const service = services.find((s) => s.name === value);
                  setSelectedService(service || null);
                  field.onChange(value);
                }}
                defaultValue={field.value}
                value={selectedService?.name || ""}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {services.map((service) => (
                    <SelectItem key={service.name} value={service.name}>
                      {service.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Select the service you are interested in.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="branchName"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Branch Name</FormLabel>
              <Select
                onValueChange={(value) => {
                  const branch = branchesOptions.find((b) => b.name === value);
                  setSelectedBranch(branch || null);
                  field.onChange(value);
                }}
                defaultValue={field.value || ""}
                disabled={selectedService === null}
                value={selectedBranch?.name || ""}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {branchesOptions.map((branch) => (
                    <SelectItem key={branch.name} value={branch.name}>
                      {branch.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Select the branch you want to do the service at.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                      disabled={selectedService === null}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date.getTime() <
                      new Date().getTime() - 1000 * 60 * 60 * 24
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="startTime"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Start Time</FormLabel>
              <FormControl>
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="09"
                    type="number"
                    {...field}
                    className="w-[40%]"
                    onKeyDown={handleNonDigitKeyDown}
                    disabled={selectedService === null}
                  />
                  <p className="opacity-50">:</p>
                  <Input
                    placeholder="00"
                    disabled
                    type="number"
                    className="w-[40%]"
                  />
                </div>
              </FormControl>
              <FormDescription>
                Last order time is calculated based on the closing time minus
                the service duration.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="col-span-2 flex justify-end">
          <Button type="submit" disabled={selectedService === null}>
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
