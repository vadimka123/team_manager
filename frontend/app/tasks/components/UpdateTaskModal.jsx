import React, {PureComponent, PropTypes} from 'react';
import {connect} from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import _ from 'lodash';
import moment from 'moment';

import {TaskActions} from '../actions/TaskActions.js';
import {TASK_STATUSES, TASK_STATUS_TODO, TASK_STATUS_IN_PROGRESS, TASK_STATUS_DONE} from '../Constants.js';
import {USER_TYPE_TEAM_LEADER} from '../../accounts/Constants.js';


@connect(state => ({
    user: state.AccountReducer.user,
    devUsers: state.AccountReducer.devUsers,
    ...state.TaskReducer
}), null, null, {pure: false})
class UpdateTaskModal extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            label: null,
            description: null,
            status: null,
            dev_eta: null,
            user_dev: null
        };
    };

    static displayName = 'Update Task Modal';

    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        task: PropTypes.object
    };

    mapPropsToState(props) {
        this.setState({
            label: props.task.label,
            description: props.task.description,
            status: props.task.status,
            dev_eta: new Date(moment(props.task.dev_eta, 'YYYY-MM-DD').format()),
            user_dev: props.task.user_dev ? props.task.user_dev.id : null
        });
    };

    componentWillMount() {
        if (!this.props.task) return;

        this.mapPropsToState(this.props);
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.task && !_.isEqual(this.props.task, nextProps.task))
            this.mapPropsToState(nextProps);

        if (this.props.updating && !nextProps.updating && _.size(nextProps.errors) === 0) {
            nextProps.onHide();
            this.setState({label: null, description: null, dev_eta: null, user_dev: null});
        }
    };

    changeInput(key, value) {
        let newState = {};
        newState[key] = value;
        this.setState(newState);
    };

    devItems() {
        const {devUsers} = this.props;

        return _.map(devUsers, user =>
            <MenuItem key={user.id} value={user.id} primaryText={user.username} />
        );
    };

    handleSubmit() {
        this.props.dispatch(TaskActions.update(this.props.task.id, _.merge({}, this.state, {
            dev_eta: moment(this.state.dev_eta).format('YYYY-MM-DD')
        })));
    };

    render() {
        const {label, description, status, dev_eta, user_dev} = this.state;
        const {user, errors, updating} = this.props;

        const actions = [
            <FlatButton label="Cancel" secondary={true} onTouchTap={this.props.onHide} disabled={updating} />,
            <FlatButton label="Update" primary={true} onTouchTap={::this.handleSubmit}
                        disabled={!label || !description || !status || !dev_eta || updating} />
        ];

        return (
            <Dialog title="Create new Task" actions={actions} modal={false} open={this.props.show}
                    onRequestClose={this.props.onHide}>
                <form>
                    <TextField hintText="Label" floatingLabelText="Label" fullWidth={true}
                               value={label || ''} disabled={updating} errorText={errors.label}
                               onChange={e => this.changeInput('label', e.target.value)} />
                    <TextField hintText="Description" floatingLabelText="Description"
                               fullWidth={true} rows={4} rowsMax={4} multiLine={true}
                               value={description || ''} disabled={updating} errorText={errors.description}
                               onChange={e => this.changeInput('description', e.target.value)} />
                    <SelectField hintText="Status" floatingLabelText="Status" fullWidth={true}
                                 value={status || ''} disabled={updating} errorText={errors.user_dev}
                                 onChange={(e, i, val) => this.changeInput('status', val)}>
                        <MenuItem value={TASK_STATUS_TODO} primaryText={TASK_STATUSES[TASK_STATUS_TODO]} />
                        <MenuItem value={TASK_STATUS_IN_PROGRESS} primaryText={TASK_STATUSES[TASK_STATUS_IN_PROGRESS]} />
                        <MenuItem value={TASK_STATUS_DONE} primaryText={TASK_STATUSES[TASK_STATUS_DONE]} />
                    </SelectField>
                    <SelectField hintText="Developer" floatingLabelText="Developer" fullWidth={true}
                                 value={user_dev || ''} disabled={updating || user.account_type !== USER_TYPE_TEAM_LEADER}
                                 errorText={errors.user_dev} onChange={(e, i, val) => this.changeInput('user_dev', val)}>
                        {this.devItems()}
                    </SelectField>
                    <DatePicker hintText="Dev ETA" floatingLabelText="Dev ETA" fullWidth={true}
                                value={dev_eta} disabled={updating} errorText={errors.dev_eta}
                                onChange={(e, val) => this.changeInput('dev_eta', val)} />
                </form>
            </Dialog>
        );
    }
}

export default UpdateTaskModal;
