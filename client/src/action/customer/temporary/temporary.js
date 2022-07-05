import {
  SET_TEMP_EDUCATION_JOB,
  REMOVE_TEMP_EDUCATION_JOB,
  SET_TEMP_EXPERIENCE_JOB,
  REMOVE_TEMP_EXPERIENCE_JOB,
} from "../../types";

export const setTempExperienceForJob = (formData) => (dispatch) => {
  dispatch({
    type: SET_TEMP_EXPERIENCE_JOB,
    payload: formData,
  });
};

export const removeTempExperienceForJob = () => (dispatch) => {
  dispatch({
    type: REMOVE_TEMP_EXPERIENCE_JOB,
  });
};

export const setTempEducationForJob = (formData) => (dispatch) => {
  console.log("Entered ", setTempEducationForJob);
  dispatch({
    type: SET_TEMP_EDUCATION_JOB,
    payload: formData,
  });
};

export const removeTempEducationForJob = () => (dispatch) => {
  dispatch({
    type: REMOVE_TEMP_EDUCATION_JOB,
  });
};
