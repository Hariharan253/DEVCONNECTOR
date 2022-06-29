import {
  EDIT_EDUCATION,
  EDIT_EXPERIENCE,
  REMOVE_EDUCATION,
  REMOVE_EXPERIENCE,
} from "../action/types";

const initialState = {
  educationId: null,
  experienceId: null,
};

const edit = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case EDIT_EDUCATION:
      return {
        ...state,
        educationId: payload.id,
      };
    case REMOVE_EDUCATION:
      return {
        ...state,
        educationId: null,
      };
    case EDIT_EXPERIENCE:
      return {
        ...state,
        experienceId: payload.id,
      };
    case REMOVE_EXPERIENCE:
      return {
        ...state,
        educationId: payload.id,
      };
    default:
      return state;
  }
};

export default edit;
