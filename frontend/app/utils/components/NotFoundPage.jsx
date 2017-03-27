import React, {PureComponent} from 'react';


class NotFoundPage extends PureComponent {
    displayName = 'Not Found Page';

    render() {
        return (
            <div className="middle-box text-center animated fadeInDown" style={{marginTop: 0}}>
                <h1>404</h1>
                <h3 className="font-bold">Page Not Found</h3>

                <div className="error-desc">
                    Sorry, but the page you are looking for has not been found.
                    Try checking the URL for error,
                    then hit the refresh button on your browser or try found something else in our app.
                </div>
            </div>
        );
    };
}

export default NotFoundPage;
