import { GET_DINER_DATA } from "../actions";

const dinertype = ""
export default function setDinertype(state = dinertype, action) {
    console.log("in book reducer", action);
    switch (action.type) {
      case GET_DINER_DATA:
          return [...action.data.data]
      default:
        return [...state];
    }
  }