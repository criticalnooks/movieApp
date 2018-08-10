import { Navigation } from 'react-native-navigation';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux';

import MoviesPageContainer from './MoviesPageContainer';
import LoginPageContainer from './LoginPageContainer';
import RegisterModalContainer from './RegisterModalContainer';
import AddMovieModalContainer from './AddMovieModalContainer';
import DeleteMovieModalContainer from './DeleteMovieModalContainer';

import reducer from '../reducer'
// register all screens of the app (including internal ones)
let store = createStore(reducer);


export function registerScreens() {
  Navigation.registerComponent('LoginScreen', () => LoginPageContainer, store, Provider);
  Navigation.registerComponent('RegisterModal', () => RegisterModalContainer, store, Provider);
  Navigation.registerComponent('MoviesScreen', () => MoviesPageContainer, store, Provider);
  Navigation.registerComponent('AddMovieModal', () => AddMovieModalContainer, store, Provider);
  Navigation.registerComponent('DeleteMovieModal', () => DeleteMovieModalContainer, store, Provider);
}

