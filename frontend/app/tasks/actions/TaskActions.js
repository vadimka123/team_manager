import axios from 'axios';

import {TaskConstants} from '../Constants.js';


class _TaskActions {
    list() {
        return dispatch => {
            axios.get('/api/v1/tasks/').then(response => {
                dispatch({
                    type: TaskConstants.TASK_LIST_SUCCESS,
                    data: response.data
                });
            }).catch(error => {
                dispatch({
                    type: TaskConstants.TASK_LIST_FAIL,
                    data: error.response ? error.response.data : {}
                });
            });
        }
    }
}

export const TaskActions = new _TaskActions();
