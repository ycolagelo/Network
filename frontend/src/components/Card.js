import React from "react";

export function Card({ children, extraClasses = "" }) {
  return (
    <div
      className={`shadow-sm rounded bg-white px-8 py-4 border-solid border border-gray-200 ${extraClasses}`}
    >
      {children}
    </div>
  );
}
