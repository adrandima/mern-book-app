import { combineReducers } from 'redux'

import bookReducer from './redux/reducers/bookReducer';
import authorReducer from './redux/reducers/authorReducer';


const rootReducer = combineReducers({
  // Define a top-level state field named `todos`, handled by `todosReducer`
  book: bookReducer,
  authors: authorReducer
})

export default rootReducer
