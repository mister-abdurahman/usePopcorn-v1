import React from "react";

export default function Result({ numMovies }: any) {
  return (
    <h3 className="md:text-[1.15rem] text-[0.7rem]">
      Found: <span className="font-bold">{numMovies}</span> results
    </h3>
  );
}
