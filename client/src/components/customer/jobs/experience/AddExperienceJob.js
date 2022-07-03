import { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { disableNavigation } from "../../../../action/customer/navigationPage/navigationPage";
const AddExperienceJob = ({
  navigationPage: { pageToNavigate },
  disableNavigation,
}) => {
  useEffect(() => {
    console.log("pageToNavigate", pageToNavigate);
  }, []);

  const navigate = useNavigate();

  const goBack = () => {
    navigate(`/${pageToNavigate}`);
    disableNavigation();
  };

  return (
    <Fragment>
      <h1>Add Experience for your job added</h1>
      <button className='btn btn-sm btn-success ml-2' onClick={() => goBack()}>
        Go Back
      </button>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    navigationPage: state.navigationPage,
  };
};

export default connect(mapStateToProps, { disableNavigation })(
  AddExperienceJob
);
