import React, {PureComponent, PropTypes} from 'react';
import {connect} from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Person from 'material-ui/svg-icons/social/person';
import TextField from 'material-ui/TextField';
import {Link} from 'react-router';

import ThemeDefault from '../../theme-default.js';
import {styles} from './Login.jsx';

import {AccountActions} from '../actions/AccountActions.js';


@connect(state => state.AccountReducer, null, null, {pure: false})
export class Register extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            username: null,
            password: null
        };
    };

    static displayName = 'Register';

    static propTypes = {
        dispatch: PropTypes.func.isRequired
    };

    changeInput(key, value) {
        let newState = {};
        newState[key] = value;
        this.setState(newState);
    };

    handleSubmit() {
        this.props.dispatch(AccountActions.register(this.state));
    };

    render() {
        const {username, password} = this.state,
              {errors, lock} = this.props;

        return (
            <MuiThemeProvider muiTheme={ThemeDefault}>
                <div style={styles.loginContainer}>
                    <Paper style={styles.paper}>
                        <form>
                            <TextField hintText="Username" floatingLabelText="Username" fullWidth={true}
                                       value={username || ''} disabled={lock}
                                       errorText={errors.username || (errors.non_field_errors ? '' : null)}
                                       onChange={e => this.changeInput('username', e.target.value)} />
                            <TextField hintText="Password" floatingLabelText="Password" fullWidth={true}
                                       type="password" value={password || ''} disabled={lock}
                                       errorText={errors.password || errors.non_field_errors}
                                       onChange={e => this.changeInput('password', e.target.value)} />
                            <RaisedButton label="Register" primary={true} fullWidth={true} style={styles.loginBtn}
                                          onClick={e => this.handleSubmit()}
                                          disabled={!username || !password || lock} />
                        </form>
                    </Paper>
                    <div style={styles.buttonsDiv}>
                        <Link to="/accounts/login/">
                            <FlatButton label="Login" style={styles.flatButton} icon={<Person />} />
                        </Link>
                    </div>
                </div>
            </MuiThemeProvider>
        );
    };
}
