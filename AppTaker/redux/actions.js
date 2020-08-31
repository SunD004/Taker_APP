import { USER, HISTORY, CURRENT } from "./constant";

export const updateUser = (payload) => ({
  type: USER,
  payload: payload,
});

export const updateHistory = (payload) => ({
  type: HISTORY,
  payload: payload,
});

export const updateCurrent = (payload) => ({
  type: CURRENT,
  payload: payload,
});
