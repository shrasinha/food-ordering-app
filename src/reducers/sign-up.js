import { SIGN_UP,SIGN_UP_FAILURE } from "../actions";

const userSuccessMessage = ""
export default function signup(state = userSuccessMessage, action) {
    console.log("in sign up", action?.errorMessage);
    switch (action.type) {
      case SIGN_UP:
          return [action.userSuccessMessage]
      case SIGN_UP_FAILURE:
          return [action.errorMessage]
      default:
        return [...state];
    }
  }