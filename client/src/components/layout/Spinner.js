import React, { Fragment } from "react";

const Spinner = () => {
  return (
    <Fragment>
      <img
        src={`./spinner.gif`}
        style={{ width: "200px", margin: "auto", display: "block" }}
        alt='...loading'
      />
    </Fragment>
  );
};

export default Spinner;
