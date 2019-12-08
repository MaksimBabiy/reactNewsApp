import { combineReducers } from 'redux';
import posts from './posts'
import cities from './cities'

const rootReducers = combineReducers({
    posts,
    cities
});

export default rootReducers