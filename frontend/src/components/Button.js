import React from "react";

export function Button({
  children,
  extraClasses = "",
  type = "button",
  buttonStyle = "primary",
  onClick = undefined,
}) {
  let colorClasses;
  if (buttonStyle === "primary") {
    colorClasses = "bg-indigo-500 hover:bg-indigo-600 text-gray-50";
  } else if (buttonStyle === "secondary") {
    colorClasses = "bg-gray-400 hover:bg-gray-500 text-white";
  } else {
    console.error(
      "invalid value supplied for `buttonStyle` prop of `Button`. Value supplied:",
      buttonStyle
    );
  }

  return (
    <button
      className={`${colorClasses} rounded px-4 py-2 ${extraClasses}`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
