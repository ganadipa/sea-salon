import React from "react";
import { Button } from "../ui/button";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import Link from "next/link";

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
    <section className="bg-gradient-to-br to-extra-middle from-accent-green md:h-[150px] py-8 md:pt-2 flex flex-col items-center justify-around rounded-lg mx-auto w-4/5 md:w-[500px] my-8">
      <h1 className="text-center text-4xl font-bold text-zinc-100">
        Contact Us!
      </h1>
      <div className="flex md:flex-row flex-col gap-2 mt-8">
        {contacts.map((contact, idx) => (
          <Link key={idx} href={`https://wa.me/+62${contact.number.slice(1)}`}>
            <Button>
              <PaperPlaneIcon className="mr-2" /> | {contact.name} |{" "}
              {contact.number}
            </Button>
          </Link>
        ))}
      </div>
    </section>
  );
}
