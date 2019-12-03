import React, { Component } from 'react';
import { Drawer, Typography, CardContent } from '@material-ui/core/';
import { withStyles } from '@material-ui/core/styles/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from './store/actions/index';

const styles = theme => ({
  root: {
    width: 280,
    padding: 24,
  },
  content: {
    flex: '1 0 auto',
    padding: 0,
  },
});

class QuickPanel extends Component {
  render() {
    const { classes, state, toggleQuickPanel } = this.props;
    return (
      <Drawer
        classes={{ paper: classes.root }}
        open={state}
        anchor="right"
        onClose={() => toggleQuickPanel(false)}
      >
        <CardContent className={classes.content}>
          <Typography className="h1">About</Typography>
        </CardContent>
        <CardContent className={classes.content}>
          <Typography align="justify">
            The name Intersect came from the two things I love: Music and Web
            Development.
          </Typography>
        </CardContent>

        <CardContent className={classes.content}>
          <Typography align="justify">
            The idea is to get Spotify users to be more aware about their
            listening habits and show them new music.
          </Typography>
        </CardContent>
        <CardContent className={classes.content}>
          <Typography align="justify">
            While some analytics have been provided by Spotify's API, I want to
            provide better insights. I want to know when a song is played, its
            characteristics, the BPM, key signature.
          </Typography>
        </CardContent>
        <CardContent className={classes.content}>
          <Typography align="justify">
            Current data on Analytics and My Music is dummy data, as there is
            more testing to be done, although a working protototype has been
            developed privately for myself.
          </Typography>
        </CardContent>

        <CardContent className={classes.content}>
          <Typography align="justify">
            AWS Lambda function will collect information for each registered
            users, and save them in Firebase database. Informative components
            will update by calling my API Endpoints in AWS API Gateway.
          </Typography>
        </CardContent>
      </Drawer>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      toggleQuickPanel: Actions.toggleQuickPanel,
    },
    dispatch
  );
}

function mapStateToProps({ quickPanel }) {
  return {
    state: quickPanel.state,
  };
}

export default withStyles(styles, { withTheme: true })(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(QuickPanel)
);
