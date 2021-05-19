import React, { createContext, useReducer } from "react";
import { LOADING, SET_AUTHORIZED, SET_UNAUTHORIZED, LOGOUT } from "../types";

type StateType = {
  isLoading: boolean;
  isLoggedIn: boolean | null;
  currentUser: any;
};

type ActionType = {
  type:
    | typeof LOADING
    | typeof SET_AUTHORIZED
    | typeof SET_UNAUTHORIZED
    | typeof LOGOUT;
  payload: {
    user: {
      bio: null | string;
      createdAt: null | string;
      email: null | string;
      id: null | number;
      image: null | string;
      token: null | string;
      updatedAt: null | string;
      username: null | string;
    };
  };
};

const initialState = {
  isLoading: false,
  isLoggedIn: null,
  currentUser: null,
};

const reducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case LOADING:
      return { ...state, isLoading: true };
    case SET_AUTHORIZED:
      return {
        ...state,
        isLoggedIn: true,
        isLoading: false,
        currentUser: action.payload,
      };
    case SET_UNAUTHORIZED:
      return { ...state, isLoggedIn: false };
    case LOGOUT:
      return { ...initialState, isLoggedIn: false };
    default:
      return state;
  }
};

export const CurrentUserContext = createContext({});

type Props = {
  children?: JSX.Element;
};

export const CurrentUserProvider = ({ children }: Props) => {
  const value = useReducer(reducer, initialState);
  return (
    <CurrentUserContext.Provider value={value}>
      {children}
    </CurrentUserContext.Provider>
  );
};
