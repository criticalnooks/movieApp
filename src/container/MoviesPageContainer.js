import MoviesScreen from '../component/MoviesScreen'
import { connect } from 'react-redux'
import { setUsername, setPassword, setUserType, setupMovies }  from '../action'


const mapStateToProps = (state) => {
  return {
    username: state.userObj.username,
    password: state.userObj.password,
    usertype : state.userObj.usertype,
    moviesList : state.moviesList.moviesList
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
export default connect(mapStateToProps,mapDispatchToProps)(MoviesScreen)
