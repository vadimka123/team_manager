import axios from 'axios';

import {UploadConstants} from '../Constants.js';


class _UploadActions {
    uploadFile(payload) {
        return dispatch => {
            dispatch({
                type: UploadConstants.UPLOAD_FILE
            });

            axios.post('/api/v1/upload/', payload, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(response => {
                dispatch({
                    type: UploadConstants.UPLOAD_FILE_SUCCESS,
                    data: response.data
                });
            }).catch(error => {
                dispatch({
                    type: UploadConstants.UPLOAD_FILE_FAIL,
                    data: error.response ? error.response.data : {}
                });
            });
        }
    }

    generatePreview(payload) {
        return dispatch => {
            dispatch({
                type: UploadConstants.GET_PREVIEW
            });

            axios.post('/api/v1/upload/preview/', payload, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(response => {
                dispatch({
                    type: UploadConstants.GET_PREVIEW_SUCCESS,
                    data: response.data
                });
            }).catch(error => {
                dispatch({
                    type: UploadConstants.GET_PREVIEW_FAIL,
                    data: error.response ? error.response.data : {}
                });
            });
        }
    }

    importToDB(payload) {
        return dispatch => {
            axios.post('/api/v1/upload/import/', payload, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(response => {
                dispatch({
                    type: UploadConstants.IMPORT_TO_DB_SUCCESS,
                    data: response.data
                });
            }).catch(error => {
                dispatch({
                    type: UploadConstants.IMPORT_TO_DB_FAIL,
                    data: error.response ? error.response.data : {}
                });
            });
        }
    }
}

export const UploadActions = new _UploadActions();
