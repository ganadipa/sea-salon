import React from "react";
import { Button } from "../ui/button";
import { PaperPlaneIcon } from "@radix-ui/react-icons";

const contacts = [
  {
    name: "Thomas",
    number: "08123456789",
  },
  {
    name: "Sekar",
    number: "08164829372",
  },
];

export default function ContactUs() {
  return (
    <section className="bg-gradient-to-br to-extra-middle from-accent-green h-[150px] pt-2 flex flex-col items-center justify-around rounded-lg mx-auto w-[500px] my-8">
      <h1 className="text-center text-4xl font-bold text-zinc-100">
        Contact Us!
      </h1>
      <div className="flex gap-8">
        {contacts.map((contact, idx) => (
          <Button key={idx}>
            <PaperPlaneIcon className="mr-2" /> | {contact.name} |{" "}
            {contact.number}
          </Button>
        ))}
      </div>
    </section>
  );
}
