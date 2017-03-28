import keyMirror from 'keymirror';


export const AccountConstants = keyMirror({
    SUBMIT_FORM: null,
    LOGIN_SUCCESS: null,
    LOGIN_FAIL: null,
    REGISTER_SUCCESS: null,
    REGISTER_FAIL: null,
    LOGOUT: null,
    JWT_REFRESH_SUCCESS: null,
    JWT_REFRESH_FAIL: null,
    JWT_TOKEN_EXPIRED: null
});

export const USER_TYPE_TEAM_LEADER = 'TEAM_LEADER';
export const USER_TYPE_TEAM_CHIEF = 'TEAM_CHIEF';
export const USER_TYPE_TEAM_WORKER = 'TEAM_WORKER';

export const USER_TYPES = {
    TEAM_LEADER: 'Leader',
    TEAM_CHIEF: 'Chief',
    TEAM_WORKER: 'Worker'
};
