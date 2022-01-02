import food from './food'
import dinerdata from './go-out'
import successMessage from './card-details'
import userdata from './login'
import userMessage from './sign-up'
import {combineReducers} from 'redux'

export default combineReducers({
  food,
  dinerdata,
  successMessage,
  userdata,
  userMessage
})




