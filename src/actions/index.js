import axios from "axios";

export const GET_FOOD_ITEMS = "GET_FOOD_ITEMS";
export const GET_YOUR_FOOD = "GET_YOUR_FOOD";

export const GET_DINER_DATA = "GET_DINER_DATA";
export const UPDATE_DINER_DATA = "UPDATE_DINER_DATA";

export const LOGIN = "LOGIN";
export const LOGIN_FAILURE = " LOGIN_FAILURE";

export const SIGN_UP = "SIGN_UP";
export const SIGN_UP_FAILURE = "SIGN_UP_FAILURE";

export function getfoodItems(food) {
  return {
    type: GET_FOOD_ITEMS,
    food,
  };
}

export function getyourfood(searchItem) {
  return {
    type: GET_YOUR_FOOD,
    searchItem,
  };
}

export function getfoodItems_AsyncActionCreator() {
  return (dispatch) => {
    axios.get("http://localhost:7777/foodData").then((data) => {
      dispatch(getfoodItems(data));
    });
  };
}

export function getDinerdata(data) {
  return {
    type: GET_DINER_DATA,
    data,
  };
}

export function getDinerdata_AsyncActionCreator() {
  return (dispatch) => {
    let dinertype = JSON.parse(sessionStorage.getItem("dinertype")).dinertype;
    axios.get("http://localhost:7777/dinerData/" + dinertype).then((data) => {
      dispatch(getDinerdata(data));
    });
  };
}

export function updateDinerdata(successMessage) {
  return {
    type: UPDATE_DINER_DATA,
    successMessage,
  };
}
export function updateDinerdata_AsyncActionCreator(id) {
  return (dispatch) => {
    axios
      .put("http://localhost:7777/dinerData/" + id)
      .then((successMessage) => {
        dispatch(updateDinerdata(successMessage));
      });
  };
}

export function login(userdata) {
  return {
    type: LOGIN,
    userdata,
  };
}

export function login_failure(errormessage) {
  return {
    type: LOGIN_FAILURE,
    errormessage,
  };
}

export function login_AsyncActionCreator(userdata) {
  return (dispatch) => {
    axios
      .post("http://localhost:7777/login", userdata)
      .then((data) => {
        if (data) {
          dispatch(login(data));
        }
      })
      .catch((error) => {
        if (error.response) {
          dispatch(login_failure(error.response.data.message));
        } else {
          dispatch(login_failure(error.message));
        }
      });
  };
}

export function signup(userSuccessMessage) {
  return {
    type: SIGN_UP,
    userSuccessMessage,
  };
}
export function signup_failure(errorMessage) {
  return {
    type: SIGN_UP_FAILURE,
    errorMessage,
  };
}
export function signup_AsyncActionCreator(userObj) {
  return (dispatch) => {
    axios
      .post("http://localhost:7777/signup", userObj)
      .then((res) => {
        if (res) {
          dispatch(signup(res.data.message));
        }
      })
      .catch((error) => {
        if (error.response) {
          dispatch(signup_failure(error.response.data.message));
        } else {
          dispatch(signup_failure(error.message));
        }
      });
  };
}
