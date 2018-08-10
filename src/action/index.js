export const setUsername = (username) => {
  return {
    type: 'SET_USERNAME',
    username
  }
}

export const setPassword = (password) => {
  return {
    type: 'SET_PASSWORD', 
    password  
  }
}

export const setUserType = (usertype) => {
  return {
    type: 'SET_USER_TYPE', 
    usertype  
  }
}

export const setupMovies = (movies) => {
  return {
    type: 'SETUP_MOVIES',
    movies
  }
}

export const deleteMovie = (movie) => {
  return {
    type: 'DELETE_MOVIE',
    movie
  }
}



