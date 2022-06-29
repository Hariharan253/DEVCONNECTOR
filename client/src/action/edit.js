import { EDIT_EDUCATION, EDIT_EXPERIENCE } from "./types";

export const editEducationWithId = (id) => (dispatch) => {
  const res = dispatch({
    type: EDIT_EDUCATION,
    payload: {
      id,
    },
  });
  console.log(res);
};
export const editExperienceWithId = (id) => (dispatch) => {
  dispatch({
    type: EDIT_EXPERIENCE,
    payload: {
      id,
    },
  });
};
