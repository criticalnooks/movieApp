const initialState ={   moviesList:[]    }
const movieList = (state = initialState, action) => {
  switch (action.type) {
    case 'SETUP_MOVIES': return { 
                                    ...state,
                                    moviesList: action.movies
                                }
    default:
      return state
  }
}
export default movieList

