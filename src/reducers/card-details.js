import { UPDATE_DINER_DATA } from "../actions";

const successMessage=""
export default function setDinertype(state = successMessage, action) {
    console.log("in book reducer", action.data);
    switch (action.type) {
      case UPDATE_DINER_DATA:
          return [action.successMessage.data]
      default:
        return [...state];
    }
  }