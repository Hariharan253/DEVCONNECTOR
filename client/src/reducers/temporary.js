import {
  SET_TEMP_EDUCATION_JOB,
  REMOVE_TEMP_EDUCATION_JOB,
  SET_TEMP_EXPERIENCE_JOB,
  REMOVE_TEMP_EXPERIENCE_JOB,
} from "../action/types";

const initialState = {};
const temporary = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_TEMP_EXPERIENCE_JOB:
      return {
        ...state,
        tempExperienceJob: payload,
      };
    case REMOVE_TEMP_EXPERIENCE_JOB:
      return {
        ...state,
        tempExperienceJob: null,
      };
    default:
      return state;
  }
};

export default temporary;
