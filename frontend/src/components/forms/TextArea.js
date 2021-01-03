import React from "react";

export function TextArea({ extraClasses = "", ...props }) {
  // TODO: Border color
  return (
    <textarea
      {...props}
      className={`px-2 py-2 rounded-md leading-5 border focus:ring-2 focus:ring-indigo-300 focus:outline-none w-full ${extraClasses}`}
    />
  );
}
