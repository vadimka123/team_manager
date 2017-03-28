import {LOCATION_CHANGE} from 'react-router-redux';
import _ from 'lodash';

import {TaskConstants} from '../Constants.js';


const initialState = {
    tasks: [],
    fetching: true,
    saving: false,
    errors: {}
};

export default (state=initialState, action) => {
    switch (action.type) {
        case LOCATION_CHANGE:
            state = {
                tasks: [],
                fetching: true,
                saving: false,
                errors: {}
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

        case TaskConstants.TASK_CREATE:
            state.saving = true;
            break;

        case TaskConstants.TASK_CREATE_SUCCESS:
            state.tasks = _.concat([], state.tasks, [action.data]);
            state.saving = false;
            break;

        case TaskConstants.TASK_CREATE_FAIL:
            state.errors = action.data;
            state.saving = false;
            break;
    }

    return state;
}
