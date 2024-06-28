"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { ReviewForm } from "./review-form";
import { flushSync } from "react-dom";

export default function AddReviewButton() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
      <DialogTrigger asChild>
        <Button className="bg-zinc-50 hover:bg-zinc-400 text-cyan-950 mb-8 md:self-start">
          Add a review
        </Button>
      </DialogTrigger>
      <DialogContent className="max-md:w-4/5">
        <DialogHeader>
          <DialogTitle>Add your reviews here.</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <ReviewForm
          onFormSubmission={() => {
            flushSync(() => {
              setIsFormOpen(false);
            });
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
