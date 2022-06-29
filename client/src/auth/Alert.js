import React from "react";
import { connect } from "react-redux";
const Alert = ({ alert }) =>
  alert !== null &&
  alert.length > 0 &&
  alert.map((alerts) => {
    return (
      <div key={alert.id}>
        <h1>{alerts.msg}</h1>
      </div>
    );
  });

function mapStateToProps(state) {
  return {
    alert: state.alert,
  };
}

export default connect(mapStateToProps, null)(Alert);
