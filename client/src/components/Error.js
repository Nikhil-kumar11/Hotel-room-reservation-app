import React from "react";

function Error({ message }) {
  return (
    <div>
      <div class="alert alert-danger" role="alert">
        {message ? message : "Something went wrong. Please try again later."}
      </div>
    </div>
  );
}

export default Error;
