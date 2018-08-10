import RegisterModal from '../component/Modal/RegisterModal'
import { connect } from 'react-redux'
import { setUsername, setPassword, setUserType }  from '../action'


const mapStateToProps = (state) => {
  return {
  	username: state.userObj.username,
    password: state.userObj.password,
    usertype : state.userObj.usertype,
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
    	onChangeUserType: (type) => {
	     	dispatch(setUserType(type));
    	}
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(RegisterModal)


