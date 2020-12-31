import React from "react";

export function Title({ children, extraClasses = "" }) {
  return <h1 className={`text-2xl mb-4 mt-2 ${extraClasses}`}>{children}</h1>;
}
