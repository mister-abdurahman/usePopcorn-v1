import React from "react";
import Input from "./Input";
import Result from "./Result";

export default function NavBar({ children }: any) {
  return (
    <div className="flex justify-between lg:gap-24 md:gap-12 gap-1 items-center bg-primary md:py-3 md:px-12 md:mx-10 px-4 py-1 mx-5 rounded-md text-white">
      <h1 className="lg:text-2xl text-base font-bold">
        🍿{" "}
        <span className="lg:inline-block md:inline-block hidden">
          usePopcorn
        </span>
      </h1>
      {children}
    </div>
  );
}
