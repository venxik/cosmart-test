import { combineReducers } from 'redux';
import { booksQueryReducer } from '../services';
import { booksReducer } from './books/books';

const rootReducer = combineReducers({
  ...booksQueryReducer,
  ...booksReducer,
});

export { rootReducer };
