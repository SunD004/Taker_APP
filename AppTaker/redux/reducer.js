import { USER, HISTORY, CURRENT } from "./constant";

const initialState = {
  user: {},
  current: [],
  history: [],
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case USER:
      return {
        ...state,
        user: action.payload,
      };
    case HISTORY:
      return {
        ...state,
        history: action.payload,
      };
    case CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    default:
      return state;
  }
};
