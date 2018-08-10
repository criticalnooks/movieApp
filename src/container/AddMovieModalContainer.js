import AddMovieModal from '../component/Modal/AddMovieModal'
import { connect } from 'react-redux'
import { setupMovies }  from '../action'


const mapDispatchToProps = (dispatch) => {
  return {
      setupMovies: (movies) => {
        dispatch(setupMovies(movies));
      }
  }
}

export default connect(null,mapDispatchToProps)(AddMovieModal)

