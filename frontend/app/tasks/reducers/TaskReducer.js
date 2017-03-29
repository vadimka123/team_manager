import {LOCATION_CHANGE} from 'react-router-redux';
import _ from 'lodash';

import {TaskConstants} from '../Constants.js';


const initialState = {
    tasks: [],
    fetching: true,
    saving: false,
    updating: false,
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
            state.errors = {};
            state.saving = true;
            break;

        case TaskConstants.TASK_CREATE_SUCCESS:
            state.errors = {};
            state.tasks = _.concat([], state.tasks, [action.data]);
            state.saving = false;
            break;

        case TaskConstants.TASK_CREATE_FAIL:
            state.errors = action.data;
            state.saving = false;
            break;

        case TaskConstants.TASK_UPDATE:
            state.errors = {};
            state.updating = true;
            break;

        case TaskConstants.TASK_UPDATE_SUCCESS:
            state.tasks = _.map(state.tasks, task => {
                if (task.id === action.data.id)
                    task = _.merge({}, task, action.data);

                return task;
            });
            state.errors = {};
            state.updating = false;
            break;

        case TaskConstants.TASK_UPDATE_FAIL:
            state.errors = action.data;
            state.updating = false;
            break;
    }

    return state;
}
