import React from "react";
import { Alert } from "react-bootstrap";

const ErrorMessage = ({ variant = "info", ...children }) => {
  return (
    <div><h1>sdsdsd</h1></div>
    // <Alert variant={variant} style={{ fontSize: 20 }}>
    //   <strong>{children}</strong>
    // </Alert>
  );
};

export default ErrorMessage;