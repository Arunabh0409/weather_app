import React from "react";
import error from "../images/error.png";

function ErrorMessage() {
  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1 style={{ color: "red", fontSize: "24px", marginBottom: "10px" }}>
        Oops! Something went wrong.
      </h1>
      <p style={{ fontSize: "16px", marginBottom: "20px" }}>
        It seems you forgot to enter a city name. Please enter a city name and
        try again.
      </p>
      {/* <img src={error} alt="Error" style={{ width: "200px", height: "auto" }} /> */}
    </div>
  );
}

export default ErrorMessage;
