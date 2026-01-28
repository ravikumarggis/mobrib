import React from "react";

function Error({ errorText }) {
  return (
    <div>
      <p className="text-red-500 text-sm">{errorText}</p>
    </div>
  );
}

export default Error;
