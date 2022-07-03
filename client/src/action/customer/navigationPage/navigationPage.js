import { ENABLE_NAVIGATION, DISABLE_NAVIGATION } from "../../types";

export const enableNavigation = (pageToNavigate) => (dispatch) => {
  dispatch({
    type: ENABLE_NAVIGATION,
    payload: pageToNavigate,
  });
};

export const disableNavigation = () => (dispatch) => {
  dispatch({
    type: DISABLE_NAVIGATION,
  });
};
