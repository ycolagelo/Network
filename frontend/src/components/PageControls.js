import React from "react";
import { Button } from "./Button";

export function PageControls({ onChange, page, pageCount }) {
  function handlePreviousClick() {
    const nextPage = page - 1;
    onChange(nextPage);
  }

  function handleNextClick() {
    const nextPage = page + 1;
    onChange(nextPage);
  }

  return (
    <div className="flex items-center w-full justify-between">
      <Button onClick={handlePreviousClick} type="button" disabled={page < 1}>
        Previous
      </Button>
      <div>
        Page {page + 1} of {pageCount}
      </div>
      <Button
        onClick={handleNextClick}
        type="button"
        disabled={page === pageCount - 1}
      >
        Next
      </Button>
    </div>
  );
}
