import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles/index';

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
        '<iframe src="http://panther.audio/" width="100%" height=1000 style="position:relative; top:-49px;"></iframe>'
    };
  };

  render() {
    return (
      <div style={{ overflow: 'hidden' }}>
        <div dangerouslySetInnerHTML={this.iframe()} />
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(PantherPage);
