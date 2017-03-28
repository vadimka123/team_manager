import {LOCATION_CHANGE} from 'react-router-redux';
import _ from 'lodash';

import {TaskConstants} from '../Constants.js';


const initialState = {
    tasks: [],
    fetching: true
};

export default (state=initialState, action) => {
    switch (action.type) {
        case LOCATION_CHANGE:
            state = {
                tasks: [],
                fetching: true
            };
            break;

        case TaskConstants.TASK_LIST_SUCCESS:
            state.tasks = action.data;
            state.fetching = false;
            break;

        case TaskConstants.TASK_LIST_FAIL:
            state.tasks = [];
            state.fetching = false;
            break;
    }

    return state;
}
