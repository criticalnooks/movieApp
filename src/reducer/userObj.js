const initialState ={username:'', password:'',usertype:''}
const userObj = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USERNAME':
      return  Object.assign({}, state, {
                username : action.username,
              })
    case 'SET_PASSWORD':
      return  Object.assign({}, state, {
                password : action.password,
              })
    case 'SET_USER_TYPE':
      return  Object.assign({}, state, {
                usertype : action.usertype,
              })
    default:
      return state
  }
}
export default userObj