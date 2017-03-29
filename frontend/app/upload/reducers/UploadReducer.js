import {LOCATION_CHANGE} from 'react-router-redux';

import {UploadConstants} from '../Constants.js';


const initialState = {
    uploading: false,
    recheckResult: null,
    generatePreview: false,
    preview: []
};

export default (state=initialState, action) => {
    switch (action.type) {
        case LOCATION_CHANGE:
            state = {
                uploading: false,
                recheckResult: null,
                generatePreview: false,
                preview: []
            };
            break;

        case UploadConstants.UPLOAD_FILE:
            state.uploading = true;
            break;

        case UploadConstants.UPLOAD_FILE_SUCCESS:
            state.recheckResult = action.data;
            state.uploading = false;
            break;

        case UploadConstants.UPLOAD_FILE_FAIL:
            state.uploading = false;
            break;

        case UploadConstants.GET_PREVIEW:
            state.generatePreview = true;
            break;

        case UploadConstants.GET_PREVIEW_SUCCESS:
            state.preview = action.data;
            state.generatePreview = false;
            break;

        case UploadConstants.GET_PREVIEW_FAIL:
            state.preview = [];
            state.generatePreview = false;
            break;
    }

    return state;
}
