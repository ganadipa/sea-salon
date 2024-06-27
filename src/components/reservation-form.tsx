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
import { KeyboardEvent, useState } from "react";
import { useSession } from "next-auth/react";
import { z } from "zod";
import { TServices } from "@/lib/types";

export function ReservationForm({ services }: { services: TServices }) {
  const form = useForm({
    resolver: zodResolver(reservationFormSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      phonenumber: "",
      service: "",
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
        className="grid grid-cols-2 gap-4 p-8 bg-white border border-gray-200 rounded-lg w-[500px]"
        onSubmit={form.handleSubmit(async (data) => {
          const toastId = toast.loading("Submitting review...");

          const resp = await actions.reservations.addReservation(data);

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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                A service is estimated to be one hour long.
              </FormDescription>
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
