import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute} from 'react-router';
import {Provider} from 'react-redux';
import axios from 'axios';
import injectTapEventPlugin from 'react-tap-event-plugin';
import _ from 'lodash';
import './styles.scss';
import 'font-awesome/css/font-awesome.css';
import 'flexboxgrid/css/flexboxgrid.css';

import store, {history} from './utils/stores/RootStore.js';

import {Notifier} from './utils/components/Notifier.js';
import {AuthHelper} from './accounts/reducers/AccountReducer.js';

import {AccountActions} from './accounts/actions/AccountActions.js';

import {setupAuthHeader, requireAuth} from './accounts/utils/utils.js';

import Root from './Root.jsx';
import AccountRouting from './accounts/Routing.jsx';
import NotFoundPage from './utils/components/NotFoundPage.jsx';

if (AuthHelper.isAuthenticated) {
    setupAuthHeader();

    store.dispatch(AccountActions.refreshToken());
}

injectTapEventPlugin();

axios.interceptors.response.use(response => response, error => {
    const response = error.response || {};

    switch(response.status) {
        case 400: // typically validation errors
        case 502: // Bad Gateway
            break;
        case 401:
            store.dispatch(AccountActions.logout());
            break;
        default:
            let err = `URL: ${response.config.url || window.location.pathname} <br /> Status: ${response.status} <br /> Status text: ${response.statusText}`;

            if (response.data && _.isObject(response.data))
                err += `<br /> Response: ${JSON.stringify(response.data)}`;

            if (response.error && _.isObject(response.error))
                err += `<br /> Error: ${JSON.stringify(response.error)}`;

            Notifier.error(err);
            break;
    }

    return Promise.reject(error);
});

ReactDOM.render((
    <Provider store={store}>
        <Router history={history}>
            {AccountRouting}
            <Route path="/" component={Root} onEnter={requireAuth}>
                <Route path="*" component={NotFoundPage} />
            </Route>
        </Router>
    </Provider>
), document.getElementById('app'));
