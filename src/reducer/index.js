import { combineReducers } from 'redux'
import userObj from './userObj'
import moviesList from './moviesList'
const reducer = combineReducers({
  userObj,
  moviesList
})

export default reducer