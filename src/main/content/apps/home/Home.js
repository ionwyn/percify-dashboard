import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as Actions from './store/actions';
import { bindActionCreators } from 'redux';
import { FusePageCarded } from '@fuse';
import { Tab, Tabs, Hidden, Icon, IconButton } from '@material-ui/core';
import ListItemText from '@material-ui/core/ListItemText';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import SingleLineGridList from 'main/content/components/grid-list/SingleLineGridList';

const styles = theme => ({
  layoutRoot: {},
  layoutToolbar: {
    padding: 0,
  },
  tabsRoot: {
    height: 64,
  },
  tabRoot: {
    height: 64,
  },
  menuItem: {
    textDecoration: 'none!important',
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& $primary, & $icon': {
        color: theme.palette.common.white,
      },
    },
    '&.active': {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.secondary.contrastText + '!important',
      pointerEvents: 'none',
      '& .list-item-icon': {
        color: 'inherit',
      },
    },
    '& .list-item-icon': {
      fontSize: 16,
      width: 16,
      height: 16,
    },
  },
  primary: {},
  icon: {},
});

class Home extends Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  componentDidMount() {
    this.props.getToken();
    this.props.getTopTracks();
    this.props.getTopArtists();
  }

  render() {
    const { classes, topTracks } = this.props;
    const { value } = this.state;

    return (
      <FusePageCarded
        classes={{
          root: classes.layoutRoot,
          toolbar: classes.layoutToolbar,
        }}
        header={
          <div className="flex flex-col flex-1">
            <div className="flex items-center py-24">
              <Hidden lgUp>
                <IconButton
                  onClick={ev => this.pageLayout.toggleRightSidebar()}
                  aria-label="open left sidebar"
                >
                  <Icon>menu</Icon>
                </IconButton>
              </Hidden>
            </div>
          </div>
        }
        contentToolbar={
          <Tabs
            value={value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            classes={{
              root: classes.tabsRoot,
            }}
          >
            <Tab
              classes={{
                root: classes.tabRoot,
              }}
              label="Tracks"
            />
            <Tab
              classes={{
                root: classes.tabRoot,
              }}
              label="Artists"
            />
            {
              // <Tab
              //   classes={{
              //     root: classes.tabRoot
              //   }}
              //   label="Genres"
              // />
              // <Tab
              //   classes={{
              //     root: classes.tabRoot
              //   }}
              //   label="Vibe"
              // />
            }
          </Tabs>
        }
        content={
          <div className="p-24">
            {value === 0 && (
              <div>
                <h3 className="mb-16">Your favourite tracks</h3>
                {topTracks.tracks !== undefined ? (
                  <SingleLineGridList userTop={topTracks.tracks} />
                ) : null}
              </div>
            )}
            {value === 1 && (
              <div>
                <h3 className="mb-16">Your favourite artists</h3>
                {topTracks.artists !== undefined ? (
                  <SingleLineGridList userTop={topTracks.artists} />
                ) : null}
              </div>
            )}
            {value === 2 && (
              <div>
                <h3 className="mb-16">Your favourite genres</h3>
              </div>
            )}
            {value === 3 && (
              <div>
                <h3 className="mb-16">Your vibe</h3>
              </div>
            )}
          </div>
        }
        rightSidebarHeader={<div className="p-24" />}
        rightSidebarContent={
          <div className={classes.listWrapper}>
            <MenuList className="whitespace-no-wrap">
              <MenuItem
                button
                className={classes.menuItem}
                key={`all-time`}
                onClick={() => {
                  this.props.getTopTracks('long_term');
                  this.props.getTopArtists('long_term');
                }}
              >
                <ListItemText primary={'All time'} disableTypography={true} />
              </MenuItem>

              <MenuItem
                button
                className={classes.menuItem}
                key={`six-months`}
                onClick={() => {
                  this.props.getTopTracks('medium_term');
                  this.props.getTopArtists('medium_term');
                }}
              >
                <ListItemText
                  primary={'Past six months'}
                  disableTypography={true}
                  selected={true}
                />
              </MenuItem>

              <MenuItem
                button
                className={classes.menuItem}
                key={`one-month`}
                onClick={() => {
                  this.props.getTopTracks('short_term');
                  this.props.getTopArtists('short_term');
                }}
              >
                <ListItemText primary={'Past month'} disableTypography={true} />
              </MenuItem>
            </MenuList>
          </div>
        }
        innerScroll
        onRef={instance => {
          this.pageLayout = instance;
        }}
      />
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getTopTracks: Actions.getTopTracks,
      getTopArtists: Actions.getTopArtist,
      getToken: Actions.getToken,
    },
    dispatch
  );
}

function mapStateToProps({ userTop }) {
  return {
    topTracks: userTop.userTopMetrics,
  };
}

export default withStyles(styles, { withTheme: true })(
  withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(Home)
  )
);
