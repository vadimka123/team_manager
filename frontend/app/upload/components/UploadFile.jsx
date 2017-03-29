import React, {PureComponent, PropTypes} from 'react';
import {connect} from 'react-redux';
import Dropzone from 'react-dropzone';
import {Step, Stepper, StepLabel} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import _ from 'lodash';
import moment from 'moment';

import Page from '../../utils/components/Page.jsx';

import {UploadActions} from '../actions/UploadActions.js';


const delimiterOptions = [
    {value: "auto", label: "Auto-detect"},
    {value: "comma", label: "Comma-separated"},
    {value: "tab", label: "Tab-separated"},
    {value: "semicolon", label: "Semicolon-separated"},
];

const charsetOptions = [
    {value: "auto", label: "Auto-detect"},
    {value: "ISO-8859-1", label: "ISO-8859-1 (General US & Western European, ISO-LATIN-1)"},
    {value: "windows-1251", label: "Windows-1251"},
    {value: "cp1252", label: "Windows-1252"},
    {value: "UTF-8", label: "Unicode (UTF-8)"},
    {value: "MacRoman", label: "Western European (Apple Mac)"},
    {value: "UTF-16", label: "Unicode (UTF-16, Big Endian)"},
    {value: "MS932", label: "Japanese (Windows)"},
    {value: "Shift_JIS", label: "Japanese (Shift-JIS)"},
    {value: "GB18030", label: "Chinese National Standard (GB18030)"},
    {value: "GB2312", label: "Chinese Simplified (GB2312)"},
    {value: "Big5", label: "Chinese Traditional (Big5)"},
    {value: "Big5-HKSCS", label: "Big5 Traditional Chinese (HKSCS)"},
    {value: "EUC_KR", label: "Korean"}
];

@connect(state => state.UploadReducer, null, null, {pure: false})
class SelectList extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            openedError: false
        };
    };

    static displayName = 'Select List';

    static propTypes = {
        file: PropTypes.object,
        fileCharset: PropTypes.string,
        fileDelimiter: PropTypes.string,
        uploading: PropTypes.bool
    };

    onDropRejected() {
        this.setState({openedError: true});
    };

    charsetItems() {
        return _.map(charsetOptions, charset =>
            <MenuItem key={charset.value} value={charset.value} primaryText={charset.label} />
        );
    };

    delimiterItems() {
        return _.map(delimiterOptions, delimiter =>
            <MenuItem key={delimiter.value} value={delimiter.value} primaryText={delimiter.label} />
        );
    };

    render() {
        const {uploading, file, fileCharset, fileDelimiter, onDropAccepted, changeInput} = this.props;

        return (
            <div>
                <div className="datatask-dropzone">
                    <Dropzone accept=".csv,.tsv,.txt" multiple={false} onDropAccepted={onDropAccepted}
                              onDropRejected={::this.onDropRejected} inputProps={{disabled: uploading}}>
                        <p style={{marginTop: 85, textAlign: 'center'}}>
                            {file ? file.name : 'Drag a file here or click to select a file to upload.'}
                        </p>
                    </Dropzone>
                </div>
                <SelectField hintText="Charset" floatingLabelText="Charset" fullWidth={true}
                             value={fileCharset || ''} disabled={uploading} errorText={''}
                             onChange={(e, i, val) => changeInput('fileCharset', val)}>
                    {this.charsetItems()}
                </SelectField>
                <SelectField hintText="Delimiter" floatingLabelText="Delimiter" fullWidth={true}
                             value={fileDelimiter || ''} disabled={uploading} errorText={''}
                             onChange={(e, i, val) => changeInput('fileDelimiter', val)}>
                    {this.delimiterItems()}
                </SelectField>
                <Snackbar open={this.state.openedError} message="Unsupported format File. Supported only CSV, TSV, TXT."
                          autoHideDuration={4000} onRequestClose={() => this.setState({openedError: false})} />
            </div>
        );
    };
}

@connect(state => state.UploadReducer, null, null, {pure: false})
class MappingListColumns extends PureComponent {
    static displayName = 'Mapping List Columns';

    static propTypes = {
        mapping: PropTypes.object
    };

    itemHeaders() {
        let headers = this.props.recheckResult ? this.props.recheckResult.headers : [];

        return _.map(headers, header =>
            <MenuItem key={header} value={header} primaryText={header} />
        );
    };

    changeMapping(key, value) {
        let mapping = {};
        mapping[key] = value;
        const newMapping = _.merge({}, this.props.mapping, mapping);
        this.props.onChange('mapping', newMapping)
    };

    render() {
        const {mapping, generatePreview} = this.props;

        return (
            <Table selectable={false}>
                <TableHeader>
                    <TableRow>
                        <TableHeaderColumn style={{width: '50%'}}>Task Field</TableHeaderColumn>
                        <TableHeaderColumn style={{width: '50%'}}>List Column</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableRowColumn style={{width: '50%'}}>Label</TableRowColumn>
                        <TableRowColumn style={{width: '50%'}}>
                            <SelectField hintText="Label List Column" floatingLabelText="Label List Column" fullWidth={true}
                                         value={mapping.label || ''} disabled={generatePreview} errorText={!mapping.label ? `It's is required` : ''}
                                         onChange={(e, i, val) => this.changeMapping('label', val)}>
                                {this.itemHeaders()}
                            </SelectField>
                        </TableRowColumn>
                    </TableRow>
                    <TableRow>
                        <TableRowColumn style={{width: '50%'}}>Description</TableRowColumn>
                        <TableRowColumn style={{width: '50%'}}>
                            <SelectField hintText="Description List Column" floatingLabelText="Description List Column" fullWidth={true}
                                         value={mapping.description || ''} disabled={generatePreview} errorText={''}
                                         onChange={(e, i, val) => this.changeMapping('description', val)}>
                                {this.itemHeaders()}
                            </SelectField>
                        </TableRowColumn>
                    </TableRow>
                    <TableRow>
                        <TableRowColumn style={{width: '50%'}}>Dev ETA</TableRowColumn>
                        <TableRowColumn style={{width: '50%'}}>
                            <SelectField hintText="Dev ETA List Column" floatingLabelText="Dev ETA List Column" fullWidth={true}
                                         value={mapping.dev_eta || ''} disabled={generatePreview} errorText={''}
                                         onChange={(e, i, val) => this.changeMapping('dev_eta', val)}>
                                {this.itemHeaders()}
                            </SelectField>
                        </TableRowColumn>
                    </TableRow>
                </TableBody>
            </Table>
        );
    };
}

@connect(state => state.UploadReducer, null, null, {pure: false})
class Preview extends PureComponent {
    static dispayName = 'Preview';

    render() {
        const {preview} = this.props;

        return (
            <Table selectable={false}>
                <TableHeader>
                    <TableRow>
                        <TableHeaderColumn style={{width: '35%'}}>Label</TableHeaderColumn>
                        <TableHeaderColumn style={{width: '35%'}}>Description</TableHeaderColumn>
                        <TableHeaderColumn style={{width: '30%'}}>Dev ETA</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {_.map(preview, (row, index) =>
                        <TableRow key={index}>
                            <TableRowColumn style={{width: '35%'}}>{row.label}</TableRowColumn>
                            <TableRowColumn style={{width: '35%'}}>{row.description}</TableRowColumn>
                            <TableRowColumn style={{width: '30%'}}>{moment(row.dev_eta).format('L')}</TableRowColumn>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        );
    };
}

@connect(state => state.UploadReducer, null, null, {pure: false})
class UploadFile extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            finished: false,
            stepIndex: 0,
            file: null,
            fileCharset: 'auto',
            fileDelimiter: 'auto',
            mapping: {
                label: null,
                description: null,
                dev_eta: null
            }
        };
    };

    static displayName = 'Upload File';

    static propTypes = {
        dispatch: PropTypes.func.isRequired
    };

    handleNext() {
        const {stepIndex} = this.state;

        let payload = new FormData();

        switch (stepIndex) {
            case 0:
                payload.append('file', this.state.file);
                payload.append('file_delimiter', this.state.fileDelimiter);
                payload.append('file_charset', this.state.fileCharset);
                this.props.dispatch(UploadActions.uploadFile(payload));
                break;
            case 1:
                payload.append('file', this.state.file);
                payload.append('mapping', JSON.stringify(this.state.mapping));
                payload.append('delimiter', this.props.recheckResult.delimiter);
                payload.append('encoding', this.props.recheckResult.encoding);
                this.props.dispatch(UploadActions.generatePreview(payload));
                break;
            case 2:
                payload.append('file', this.state.file);
                payload.append('mapping', JSON.stringify(this.state.mapping));
                payload.append('delimiter', this.props.recheckResult.delimiter);
                payload.append('encoding', this.props.recheckResult.encoding);
                this.props.dispatch(UploadActions.importToDB(payload));
                break;
        }

        this.setState({stepIndex: stepIndex + 1, finished: stepIndex >= 2});
    };

    handlePrev() {
        const {stepIndex} = this.state;

        if (stepIndex <= 0) return;

        this.setState({stepIndex: stepIndex - 1});
    };

    changeInput(key, value) {
        let newState = {};
        newState[key] = value;
        this.setState(newState);
    };

    getStepContent(stepIndex) {
        const {file, fileCharset, fileDelimiter, mapping} = this.state;

        switch (stepIndex) {
            case 0:
                return <SelectList file={file} fileCharset={fileCharset} fileDelimiter={fileDelimiter} changeInput={::this.changeInput}
                                   onDropAccepted={files => this.changeInput('file', files[0])} />;
            case 1:
                return <MappingListColumns mapping={mapping} onChange={::this.changeInput} />;
            case 2:
                return <Preview />;
        }
    };

    getIsAllowedNextStep(stepIndex) {
        const {file, fileCharset, fileDelimiter, mapping} = this.state;

        switch (stepIndex) {
            case 0:
                return file && fileCharset && fileDelimiter;
            case 1:
                return !!mapping.label;
            case 2:
                return true;
        }
    }

    render() {
        const {finished, stepIndex} = this.state;

        return (
            <Page title="Upload List" navigation="Team Manager / Upload List">
                <div>
                    <Stepper activeStep={stepIndex}>
                        <Step>
                            <StepLabel>Select List</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>Map List Columns</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>Preview</StepLabel>
                        </Step>
                    </Stepper>
                    {finished ? (
                        <p>
                            Tasks from all List Records successfully created.
                        </p>
                    ) : (
                        <div>
                            {this.getStepContent(stepIndex)}
                            <div style={{marginTop: 12}}>
                                <FlatButton label="Back" disabled={stepIndex === 0} onTouchTap={::this.handlePrev}
                                            style={{marginRight: 12}} />
                                <RaisedButton label={stepIndex === 2 ? 'Finish' : 'Next'} primary={true}
                                              disabled={!this.getIsAllowedNextStep(stepIndex)}
                                              onTouchTap={::this.handleNext} />
                            </div>
                        </div>
                    )}
                </div>
            </Page>
        );
    };
}

export default UploadFile;
