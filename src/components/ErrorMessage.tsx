import React from "react";

export function ErrorMessage({ message }: any) {
  return (
    <p className="error">
      <span>⛔</span>
      {message}
    </p>
  );
}
