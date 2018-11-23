import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles/index';
import Spinner from 'react-spinkit';

const styles = theme => ({
  root: {
    background:
      "url('/assets/images/backgrounds/dark-material-bg.jpg') no-repeat",
    backgroundSize: 'cover',
  },
  card: {
    width: '100%',
    maxWidth: 384,
  },
});

class PantherPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  hideSpinner = () => {
    this.setState({ loading: false });
  };

  render() {
    return (
      <div style={{ overflow: 'hidden' }} className="container rsvp-wrapper">
        {this.state.loading ? (
          <Spinner
            className="loading text-center"
            name="line-scale-pulse-out"
            color="white"
            fadeIn="none"
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
            }}
          />
        ) : null}
        <iframe
          title="Panther Discover"
          src="https://panther-discover.herokuapp.com/"
          width="100%"
          height="1000"
          onLoad={this.hideSpinner}
          frameBorder="0"
          marginHeight="0"
          marginWidth="0"
        />
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(PantherPage);
