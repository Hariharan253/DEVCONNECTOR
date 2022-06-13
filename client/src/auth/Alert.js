import React from "react";

import { connect } from "react-redux";

const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map((alert) => <div key={alert.id}>{alert.msg}</div>);
function mapStateToProps(state) {
  return {
    alerts: state.alert,
  };
}

export default connect(mapStateToProps, null)(Alert);
