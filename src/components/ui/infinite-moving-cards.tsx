"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import StarReview from "../star-review";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    description: string;
    name: string;
    rating: number;
    createdAt: Date;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  useEffect(() => {
    addAnimation();
  }, []);

  const [start, setStart] = useState(false);
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      // const scrollerContent = Array.from(scrollerRef.current.children);

      // scrollerContent.forEach((item) => {
      //   const duplicatedItem = item.cloneNode(true);
      //   if (scrollerRef.current) {
      //     scrollerRef.current.appendChild(duplicatedItem);
      //   }
      // });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }
  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "30s");
      }
    }
  };
  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20  max-w-7xl overflow-hidden  [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          " flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
          start && "animate-scroll ",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {Array({ length: 2 }).map(() =>
          items.map((item, idx) => {
            return (
              <li
                className={`w-[350px] bg-zinc-50 max-w-full relative rounded-2xl border border-b-0 flex-shrink-0 border-slate-700 px-8 py-6 md:w-[450px]`}
                key={idx}
              >
                <blockquote className="h-full flex flex-col justify-between relative">
                  {Date.now() - item.createdAt.getTime() <
                    1000 * 60 * 60 * 24 && (
                    <div className="absolute bg-yellow-300 text-2xl rounded-lg right-[-40px] top-[-35px] px-4 py-2 text-white">
                      &lt; 1 day
                    </div>
                  )}
                  <div
                    aria-hidden="true"
                    className=" user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
                  ></div>
                  <span className="text-xl relative z-20 leading-[1.6] text-cyan-700 font-normal">
                    {item.description}
                  </span>
                  <div className="relative z-20 mt-6 flex flex-row items-center self-end">
                    <span className="flex flex-col gap-1 self-end">
                      <span className=" text-md leading-[1.6] text-cyan-950 font-normal self-end">
                        {item.name}
                      </span>
                      <span className=" text-md leading-[1.6] text-cyan-950 font-normal self-send">
                        <StarReview rating={item.rating} />
                      </span>
                    </span>
                  </div>
                </blockquote>
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
};
