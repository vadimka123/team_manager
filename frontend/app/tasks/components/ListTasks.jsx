import React, {PureComponent, PropTypes} from 'react';
import {connect} from 'react-redux';
import CircularProgress from 'material-ui/CircularProgress';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentCreate from 'material-ui/svg-icons/content/create';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {pink500, grey200, grey500} from 'material-ui/styles/colors';
import {Link} from 'react-router';
import _ from 'lodash';
import moment from 'moment';

import {TaskActions} from '../actions/TaskActions.js';
import {AccountActions} from '../../accounts/actions/AccountActions.js';
import {TASK_STATUSES} from '../Constants.js';
import {USER_TYPE_TEAM_CHIEF} from '../../accounts/Constants.js'

import Page from '../../utils/components/Page.jsx';
import CreateTaskModal from './CreateTaskModal.jsx';


const progressStyles =  {
    minWidth: 320,
    maxWidth: 400,
    height: 'auto',
    position: 'absolute',
    top: '40%',
    left: '40%',
    right: 0,
    margin: 'auto'
};

const styles = {
    floatingActionButton: {
        margin: 0,
        top: 'auto',
        right: 20,
        bottom: 20,
        left: 'auto',
        position: 'fixed',
    },
    editButton: {
        fill: grey500
    },
    columns: {
        label: {
            width: '15%'
        },
        description: {
            width: '30%'
        },
        developer: {
            width: '15%'
        },
        status: {
            width: '15%'
        },
        eta: {
            width: '15%'
        },
        edit: {
            width: '10%'
        }
    }
};

@connect(state => ({
    user: state.AccountReducer.user,
    fetchDevUsers: state.AccountReducer.fetchDevUsers,
    ...state.TaskReducer
}), null, null, {pure: false})
class ListTasks extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            showCreateModal: false
        };
    };

    static displayName = 'List of Tasks';

    static propTypes = {
        dispatch: PropTypes.func.isRequired
    };

    componentWillMount() {
        this.props.dispatch(TaskActions.list());
        this.props.dispatch(AccountActions.list());
    };

    openCreateModal() {
        this.setState({showCreateModal: true});
    };

    closeCreateModal() {
        this.setState({showCreateModal: false});
    };

    render() {
        const {tasks, user, fetching, fetchDevUsers} = this.props;

        if (fetching || fetchDevUsers)
            return (
                <div style={progressStyles}>
                    <CircularProgress size={120} thickness={5} />
                </div>
            );

        return (
            <Page title="List of Tasks" navigation="Team Manager / List of Tasks">
                <div>
                    {user.account_type === USER_TYPE_TEAM_CHIEF &&
                        <FloatingActionButton style={styles.floatingActionButton} backgroundColor={pink500}
                                              onClick={::this.openCreateModal}>
                            <ContentAdd />
                            <CreateTaskModal show={this.state.showCreateModal} onHide={::this.closeCreateModal} />
                        </FloatingActionButton>
                    }
                    <Table selectable={false}>
                        <TableHeader>
                            <TableRow>
                                <TableHeaderColumn style={styles.columns.label}>Label</TableHeaderColumn>
                                <TableHeaderColumn style={styles.columns.description}>Description</TableHeaderColumn>
                                <TableHeaderColumn style={styles.columns.developer}>Developer</TableHeaderColumn>
                                <TableHeaderColumn style={styles.columns.status}>Status</TableHeaderColumn>
                                <TableHeaderColumn style={styles.columns.eta}>Dev ETA</TableHeaderColumn>
                                <TableHeaderColumn style={styles.columns.edit}>Edit</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {_.map(tasks, task =>
                                <TableRow key={task.id}>
                                    <TableRowColumn style={styles.columns.label}>{task.label}</TableRowColumn>
                                    <TableRowColumn style={styles.columns.description}>
                                        {task.description}
                                    </TableRowColumn>
                                    <TableRowColumn style={styles.columns.developer}>
                                        {task.user_dev ? task.user_dev.username : ''}
                                    </TableRowColumn>
                                    <TableRowColumn style={styles.columns.status}>
                                        {TASK_STATUSES[task.status]}
                                    </TableRowColumn>
                                    <TableRowColumn style={styles.columns.eta}>
                                        {moment(task.dev_eta).format('L')}
                                    </TableRowColumn>
                                    <TableRowColumn style={styles.columns.edit}>
                                        <Link className="button" to="/form">
                                            <FloatingActionButton zDepth={0}
                                                                  mini={true}
                                                                  backgroundColor={grey200}
                                                                  iconStyle={styles.editButton}>
                                                <ContentCreate  />
                                            </FloatingActionButton>
                                        </Link>
                                    </TableRowColumn>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </Page>
        );
    };
}

export default ListTasks;
