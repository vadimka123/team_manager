import React, {PureComponent, PropTypes} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import withWidth, {LARGE, SMALL} from 'material-ui/utils/withWidth';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Menu from 'material-ui/svg-icons/navigation/menu';
import {white} from 'material-ui/styles/colors';

import ThemeDefault from './theme-default.js';


class Header extends PureComponent {
    static displayName = 'Header';

    static propTypes = {
        styles: PropTypes.object,
        handleChangeRequestNavDrawer: PropTypes.func
    };

    render() {
        const {styles, handleChangeRequestNavDrawer} = this.props;

        const style = {
            appBar: {
                position: 'fixed',
                top: 0,
                overflow: 'hidden',
                maxHeight: 57
            },
            menuButton: {
                marginLeft: 10
            },
            iconsRightContainer: {
                marginLeft: 20
            }
        };

        return (
            <AppBar style={{...styles, ...style.appBar}}
                    iconElementLeft={
                        <IconButton style={style.menuButton} onClick={handleChangeRequestNavDrawer}>
                            <Menu color={white} />
                        </IconButton>
                    }
                    iconElementRight={
                        <div style={style.iconsRightContainer}>
                            <IconMenu color={white}
                                      iconButtonElement={
                                          <IconButton><MoreVertIcon color={white}/></IconButton>
                                      }
                                      targetOrigin={{horizontal: 'right', vertical: 'top'}}
                                      anchorOrigin={{horizontal: 'right', vertical: 'top'}}>
                                <MenuItem primaryText="Sign out"/>
                            </IconMenu>
                        </div>
                    } />
        );
    };
}

@withWidth()
class Root extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            navDrawerOpen: false
        };
    };

    static displayName = 'Root';

    static propTypes = {
        children: PropTypes.element,
        width: PropTypes.number
    };

    componentWillReceiveProps(nextProps) {
        if (this.props.width === nextProps.width) return;

        this.setState({navDrawerOpen: nextProps.width === LARGE});
    };

    handleChangeRequestNavDrawer() {
        this.setState({navDrawerOpen: !this.state.navDrawerOpen});
    };

    render() {
        let {navDrawerOpen} = this.state;
        const paddingLeftDrawerOpen = 236;

        const styles = {
            header: {
                paddingLeft: navDrawerOpen ? paddingLeftDrawerOpen : 0
            },
            container: {
                margin: '80px 20px 20px 15px',
                paddingLeft: navDrawerOpen && this.props.width !== SMALL ? paddingLeftDrawerOpen : 0
            }
        };

        return (
            <MuiThemeProvider muiTheme={ThemeDefault}>
                <div>
                    <Header styles={styles.header} handleChangeRequestNavDrawer={::this.handleChangeRequestNavDrawer}/>
                    {/*<LeftDrawer navDrawerOpen={navDrawerOpen} menus={Data.menus} username="User Admin"/>
                    <div style={styles.container}>
                        {this.props.children}
                    </div>*/}
                </div>
            </MuiThemeProvider>
        );
    }
}

export default Root;
