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

    create(data) {
        return dispatch => {
            dispatch({
                type: TaskConstants.TASK_CREATE
            });

            axios.post('/api/v1/tasks/', data).then(response => {
                dispatch({
                    type: TaskConstants.TASK_CREATE_SUCCESS,
                    data: response.data
                });
            }).catch(error => {
                dispatch({
                    type: TaskConstants.TASK_CREATE_FAIL,
                    data: error.response ? error.response.data : {}
                });
            });
        }
    }

    update(id, data) {
        return dispatch => {
            dispatch({
                type: TaskConstants.TASK_UPDATE
            });

            axios.patch(`/api/v1/tasks/${id}/`, data).then(response => {
                dispatch({
                    type: TaskConstants.TASK_UPDATE_SUCCESS,
                    data: response.data
                });
            }).catch(error => {
                dispatch({
                    type: TaskConstants.TASK_UPDATE_FAIL,
                    data: error.response ? error.response.data : {}
                });
            });
        }
    }
}

export const TaskActions = new _TaskActions();
