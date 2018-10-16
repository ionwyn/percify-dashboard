import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { FusePageSimple, FuseAnimate } from '@fuse';
import { Avatar, Button, Tab, Tabs, Typography } from '@material-ui/core';
import TimelineTab from 'main/content/pages/profile/tabs/TimelineTab';
import PhotosVideosTab from 'main/content/pages/profile/tabs/PhotosVideosTab';
import AboutTab from 'main/content/pages/profile/tabs/AboutTab';

const styles = theme => ({
  layoutRoot: {},
  layoutToolbar: {
    padding: 0
  },
  layoutHeader: {
    height: 320,
    minHeight: 320,
    background:
      "url('/assets/images/backgrounds/dark-material-bg.jpg') no-repeat",
    backgroundSize: 'cover',
    color: '#fff',
    [theme.breakpoints.down('md')]: {
      height: 240,
      minHeight: 240
    }
  },
  tabsRoot: {
    height: 64,
    width: '100%'
  },
  tabRoot: {
    height: 64
  }
});

class ProfilePage extends Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes, user } = this.props;
    const { value } = this.state;
    console.log(user);

    return (
      <FusePageSimple
        classes={{
          root: classes.layoutRoot,
          header: classes.layoutHeader,
          toolbar: classes.layoutToolbar
        }}
        header={
          <div className="p-24 flex flex-1 flex-col items-center justify-center md:flex-row md:items-end">
            <div className="flex flex-1 flex-col items-center justify-center md:flex-row md:items-center md:justify-start">
              <FuseAnimate animation="transition.expandIn" delay={300}>
                <Avatar
                  className="w-96 h-96"
                  src={user.images[0] ? user.images[0].url : user.images[0]}
                />
              </FuseAnimate>
              <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                <Typography
                  className="md:ml-24"
                  variant="display1"
                  color="inherit"
                >
                  {user.display_name ? user.display_name : user.id}
                </Typography>
              </FuseAnimate>
            </div>
          </div>
        }
        contentToolbar={
          <Tabs
            value={value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            scrollable
            scrollButtons="auto"
            classes={{
              root: classes.tabsRoot
            }}
          >
            <Tab
              classes={{
                root: classes.tabRoot
              }}
              label="Timeline"
            />
            <Tab
              classes={{
                root: classes.tabRoot
              }}
              label="About"
            />
            <Tab
              classes={{
                root: classes.tabRoot
              }}
              label="My Photos & Videos"
            />
            <Tab
              classes={{
                root: classes.tabRoot
              }}
              label="My Playlist"
            />
          </Tabs>
        }
        content={
          <div className="p-24">
            {value === 0 && <TimelineTab />}
            {value === 1 && <AboutTab />}
            {value === 2 && <PhotosVideosTab />}
          </div>
        }
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth.user
  };
}

export default withStyles(styles, { withTheme: true })(
  withRouter(connect(mapStateToProps)(ProfilePage))
);
