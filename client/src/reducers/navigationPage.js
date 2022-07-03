import { ENABLE_NAVIGATION, DISABLE_NAVIGATION } from "../action/types";

const initialState = {
  pageToNavigate: null,
};

const navigationPage = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ENABLE_NAVIGATION:
      return {
        ...state,
        pageToNavigate: payload,
      };
    case DISABLE_NAVIGATION:
      return {
        ...state,
        pageToNavigate: null,
      };
    default:
      return state;
  }
};

export default navigationPage;
