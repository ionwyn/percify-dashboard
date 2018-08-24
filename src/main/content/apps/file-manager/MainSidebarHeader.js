import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Icon, Typography } from '@material-ui/core';
import classNames from 'classnames';

const styles = theme => ({
  root: {}
});

class MainSidebarHeader extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div
        className={classNames(classes.root, 'flex items-center h-full p-12')}
      >
        <Icon>library_music</Icon>
        <Typography variant="title" className="ml-12">
          My Music
        </Typography>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(MainSidebarHeader);
