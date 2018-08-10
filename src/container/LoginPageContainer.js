import LoginScreen from '../component/LoginScreen'
import { connect } from 'react-redux'
import  { setUsername, setPassword, setUserType, setupMovies }  from '../action'


const mapStateToProps = (state) => {
  return {
  	username: state.userObj.username,
    password: state.userObj.password
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
     	onChangeUsername: (text) => {
	     	dispatch(setUsername(text));
    	},
    	onChangePassword: (text) => {
	     	dispatch(setPassword(text));
    	},
    	setUserType: (type) => {
	     	dispatch(setUserType(type));
    	},
      setupMovies: (movies) => {
        dispatch(setupMovies(movies));
      }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(LoginScreen)

