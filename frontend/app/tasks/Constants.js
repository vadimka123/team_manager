import keyMirror from 'keymirror';


export const TaskConstants = keyMirror({
    TASK_LIST_SUCCESS: null,
    TASK_LIST_FAIL: null,
    TASK_CREATE: null,
    TASK_CREATE_SUCCESS: null,
    TASK_CREATE_FAIL: null
});

export const TASK_STATUS_TODO = 'TODO';
export const TASK_STATUS_IN_PROGRESS = 'IN_PROGRESS';
export const TASK_STATUS_DONE = 'DONE';

export const TASK_STATUSES = {
    TODO: 'Todo',
    TASK_STATUS_IN_PROGRESS: 'In progress',
    TASK_STATUS_DONE: 'Done'
};
