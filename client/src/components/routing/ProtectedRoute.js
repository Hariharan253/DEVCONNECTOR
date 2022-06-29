import React from "react";
import PropTypes from "prop-types";
import { Route, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import Dashboard from "../dashboard/Dashboard";

const ProtectedRoute = (props) => {
  if (
    props.auth.isAuthenticated === false &&
    props.auth.loading === false &&
    props.auth.token === null
  ) {
    //&& propsloading === false) {
    // console.log("Entered Login");
    return <Navigate to='/login' replace={true} />;
  }
  console.log("Entered Dashboard");
  return <props.component />;
};
//  => (
//   <Route
//     render={(props) =>
//       !isAuthenticated && !loading ? (
//         <Navigate to='/login' replace={true} />
//       ) : (
//         <Component {...props} />
//       )
//     }
//   />
// );

// ProtectedRoute.propTypes = {
//   auth: PropTypes.object.isRequired,
// };

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps, null)(ProtectedRoute);
