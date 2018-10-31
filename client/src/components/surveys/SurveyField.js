import React from "react";

export default ({ input, label, meta: { error, touched } }) => {
  // input and meta are passed as props through Redux form
  // input holds function like onChange and onBlur ...
  // meta holds touched, errors ...
  return (
    <div>
      <label>{label}</label>
      <input {...input} style={{ marginBottom: "5px" }} />
      <div className="red-text" style={{ marginBottom: "20px" }}>
        {touched && error}
      </div>
    </div>
  );
};
