import React, {PureComponent, PropTypes} from 'react';

import DevTools from './utils/components/DevTools.jsx';


class Root extends PureComponent {
    displayName = 'Root';

    render() {
        return (
            <div id="wrapper">
                <div id="page-wrapper" className="gray-bg">
                    <div className="full-height">
                        {this.props.children}
                        {process.env.NODE_ENV === 'development' && <DevTools />}
                    </div>
                    <div className="footer">
                        <div className="pull-right">
                            Version: {version}.
                            Build: {build}
                        </div>
                        <div>
                            <strong>Copyright</strong> WinDev. © {new Date().getFullYear()}
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}

export default Root;
