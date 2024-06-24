import React from "react";

export default function StarReview({ rating }: { rating: number }) {
  const starArr = [1, 2, 3, 4, 5];
  rating = Math.max(0, Math.min(5, rating));

  return (
    <div className="flex items-center">
      {starArr.map((id) => (
        <div key={id} className="self-center">
          <svg
            width="1.5cm"
            height="1.5cm"
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            viewBox="80 0 400 400"
            className=""
          >
            <polygon
              fill={id <= rating ? "yellow" : "none"}
              id={id.toString()}
              stroke="black"
              strokeWidth="10"
              points="350,75  379,161 469,161 397,215
            423,301 350,250 277,301 303,215
            231,161 321,161"
            />
          </svg>
        </div>
      ))}
    </div>
  );
}
