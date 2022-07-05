import { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { disableNavigation } from "../../../../action/customer/navigationPage/navigationPage";

const AddEducationJob = ({
  navigationPage: { pageToNavigate },
  disableNavigation,
}) => {
  const navigate = useNavigate();
  useEffect(() => console.log("pageToNavigate:", pageToNavigate), []);
  const goBack = () => {
    //console.log("pageToNavigate:", pageToNavigate);
    navigate(`/${pageToNavigate}`);
    disableNavigation();
  };

  return (
    <Fragment>
      <h1>Add Education Enabled</h1>
      <button className='btn btn-sm btn-success ml-2' onClick={() => goBack()}>
        Submit
      </button>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    navigationPage: state.navigationPage,
  };
};

export default connect(mapStateToProps, { disableNavigation })(AddEducationJob);
