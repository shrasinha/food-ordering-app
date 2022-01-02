import { LOGIN,LOGIN_FAILURE } from "../actions";

const userdata = ""
export default function setuserdata(state = userdata, action) {
    console.log("in login", action);
    switch (action.type) {
      case LOGIN:
          return [...action.userdata.data]
      case LOGIN_FAILURE:
          return [action.errormessage]
      default:
        return [...state];
    }
  }