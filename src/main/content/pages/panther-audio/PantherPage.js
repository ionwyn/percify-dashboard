import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles/index';
import { Card, CardContent, Grow, Typography } from '@material-ui/core';
import classNames from 'classnames';

const styles = theme => ({
  root: {
    background:
      "url('/assets/images/backgrounds/dark-material-bg.jpg') no-repeat",
    backgroundSize: 'cover'
  },
  card: {
    width: '100%',
    maxWidth: 384
  }
});

class PantherPage extends Component {
  iframe = () => {
    return {
      __html:
        '<iframe src="http://panther.audio/" width="100%" height=1000></iframe>'
    };
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <div dangerouslySetInnerHTML={this.iframe()} />
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(PantherPage);
