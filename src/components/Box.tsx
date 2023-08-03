import React, { useState } from "react";
import Button from "./Button";

export default function Box({ children }: any) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="bg-secondary_light w-[40%] lg:w-[30%] rounded-md relative overflow-auto">
      {isOpen && children}
      <Button onOpen={setIsOpen} positionStyle={`md:top-3 top-6 right-3`}>
        {isOpen ? "-" : "+"}
      </Button>
    </div>
  );
}
