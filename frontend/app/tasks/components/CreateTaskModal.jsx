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


@connect(state => ({
    devUsers: state.AccountReducer.devUsers,
    ...state.TaskReducer
}), null, null, {pure: false})
class CreateTaskModal extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            label: null,
            description: null,
            dev_eta: null
        };
    };

    static displayName = 'Create Task Modal';

    static propTypes = {
        dispatch: PropTypes.func.isRequired
    };

    componentWillReceiveProps(nextProps) {
        if (this.props.saving && !nextProps.saving && _.size(nextProps.errors) === 0) {
            nextProps.onHide();
            this.setState({label: null, description: null, dev_eta: null});
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
        this.props.dispatch(TaskActions.create(_.merge({}, this.state, {
            dev_eta: moment(this.state.dev_eta).format('YYYY-MM-DD')
        })));
    };

    render() {
        const {label, description, dev_eta} = this.state;
        const {errors, saving} = this.props;

        const actions = [
            <FlatButton label="Cancel" secondary={true} onTouchTap={this.props.onHide} />,
            <FlatButton label="Create" primary={true} onTouchTap={::this.handleSubmit}
                        disabled={!label || !description || !dev_eta} />
        ];

        return (
            <Dialog title="Create new Task" actions={actions} modal={false} open={this.props.show}
                    onRequestClose={this.props.onHide}>
                <form>
                    <TextField hintText="Label" floatingLabelText="Label" fullWidth={true}
                               value={label || ''} disabled={saving} errorText={errors.label}
                               onChange={e => this.changeInput('label', e.target.value)} />
                    <TextField hintText="Description" floatingLabelText="Description"
                               fullWidth={true} rows={4} rowsMax={4} multiLine={true}
                               value={description || ''} disabled={saving} errorText={errors.description}
                               onChange={e => this.changeInput('description', e.target.value)} />
                    {/*<SelectField hintText="Developer" floatingLabelText="Developer" fullWidth={true}
                                 value={user_dev__id || ''} disabled={saving} errorText={errors.user_dev}
                                 onChange={(e, i, val) => this.changeInput('user_dev__id', val)}>
                        {this.devItems()}
                    </SelectField>*/}
                    <DatePicker hintText="Dev ETA" floatingLabelText="Dev ETA" fullWidth={true}
                                value={dev_eta} disabled={saving} errorText={errors.dev_eta}
                                onChange={(e, val) => this.changeInput('dev_eta', val)} />
                </form>
            </Dialog>
        );
    }
}

export default CreateTaskModal;
