import React from "react";

const TextField = ({ input, label, meta, type }) => {
  const renderErrorMessage = ({ touched, error }) => {
    if (touched && error) {
      return error;
    }
  };

  const className = `field ${meta.error && meta.touched ? "error" : ""}`;
  return (
    <div className={className}>
      <label htmlFor="">{label}</label>
      <input {...input} type={type === "password" ? "password" : "text"} />
      <p className="ui error message">{renderErrorMessage(meta)}</p>
    </div>
  );
};

export default TextField;
