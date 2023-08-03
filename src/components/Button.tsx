import React, { useState } from "react";

export default function Button({
  onOpen,
  children,
  positionStyle,
  onDeleteMovie,
}: any) {
  function handleClick() {
    onOpen((prev: any) => !prev);
  }
  return (
    <button
      className={`${positionStyle} bg-secondary absolute leading-normal text-white shadow-lg rounded-full h-7 md:text-base text-xs aspect-square text-center cursor-pointer`}
      onClick={onDeleteMovie || handleClick}
      // onClick={() => console.log(onOpen)}
    >
      {children}
    </button>
  );
}
