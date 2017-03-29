import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import AccountReducer from '../../accounts/reducers/AccountReducer.js';
import TaskReducer from '../../tasks/reducers/TaskReducer.js';
import UploadReducer from '../../upload/reducers/UploadReducer.js';

export default combineReducers({
    AccountReducer,
    TaskReducer,
    UploadReducer,
    routing: routerReducer
});
