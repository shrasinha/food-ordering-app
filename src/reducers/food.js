import { GET_FOOD_ITEMS,GET_YOUR_FOOD } from "../actions";

const foodArr = [];

export default function foodItems(state = foodArr, action) {
  console.log("in book reducer", action);
  switch (action.type) {
    case GET_FOOD_ITEMS:
      console.log("in here")
      return [...action.food.data];
    case GET_YOUR_FOOD:
      console.log(state.food+"in getyour food")
      return [...state.filter(_ =>(_.itemName.toLowerCase()).match(action.searchItem.toLowerCase()))]

    default:
      return [...state];
  }
}
