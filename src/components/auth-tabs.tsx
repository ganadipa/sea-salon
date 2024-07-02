"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { SignUp } from "./signup";
import { SignIn } from "./signin";
import { useState } from "react";

export default function AuthTabs() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <Tabs defaultValue="sign-in" className="w-[400px] grid grid-cols-2">
      <TabsList className="col-span-2 row-span-1">
        <TabsTrigger value="sign-in" className="w-full" disabled={isSubmitting}>
          Sign In
        </TabsTrigger>
        <TabsTrigger
          value="sign-up"
          className="w-full "
          disabled={isSubmitting}
        >
          Sign Up
        </TabsTrigger>
      </TabsList>
      <TabsContent
        value="sign-in"
        className="min-h-[360px] border px-4 py-2 rounded  col-span-2"
      >
        <SignIn isSubmitting={isSubmitting} setIsSubmitting={setIsSubmitting} />
      </TabsContent>
      <TabsContent
        value="sign-up"
        className="min-h-[360px] col-span-2 border px-4 py-2 rounded"
      >
        <SignUp isSubmitting={isSubmitting} setIsSubmitting={setIsSubmitting} />
      </TabsContent>
    </Tabs>
  );
}
