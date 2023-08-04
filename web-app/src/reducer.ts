import { combineReducers } from 'redux'

import bookReducer from './redux/reducers/bookReducer'


const rootReducer = combineReducers({
  // Define a top-level state field named `todos`, handled by `todosReducer`
  book: bookReducer,
})

export default rootReducer
