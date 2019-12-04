import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from 'auth/store/actions/index';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles/index';
import { Button, Card, CardContent, Typography } from '@material-ui/core';
import classNames from 'classnames';
import { FuseAnimate } from '@fuse';
const queryString = require('query-string');

const styles = theme => ({
  root: {
    background: "url('/assets/images/backgrounds/youare.jpg') no-repeat",
    backgroundSize: 'cover',
  },
  intro: {
    color: '#ffffff',
  },
  card: {
    width: '100%',
    maxWidth: 400,
  },
  button: {
    flex: '1 0 auto',
  },
});

const authEndpoint = 'https://spotilogin.herokuapp.com/login?';
const client_id = process.env.client_id || 'd104e370c7a1420aba8892389177ccb0';
const client_secret =
  process.env.client_secret || '4d4d0ef8459a46f3995f96b490895de4';
const redirect_uri =
  process.env.redirect_uri || 'http://localhost:3000/apps/dashboards/analytics';
const scopes =
  'streaming user-library-read user-top-read user-modify-playback-state user-read-currently-playing user-read-playback-state app-remote-control user-read-recently-played ';
const scope = [
  'streaming',
  'user-library-read',
  'user-top-read',
  'user-modify-playback-state',
  'user-read-currently-playing',
  'user-read-playback-state',
  'app-remote-control',
  'user-read-recently-played',
];
const stateKey = 'spotify_auth_state';

const auth_url =
  authEndpoint +
  queryString.stringify({
    response_type: 'code',
    client_id: client_id,
    scope: scopes,
    redirect_uri: redirect_uri,
  });

class Login extends Component {
  onSubmit = model => {
    this.props.submitLogin(model);
  };

  loginWithFireBase = () => {
    const model = this.form.getModel();
    this.props.loginWithFireBase(model);
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.login.error &&
      (this.props.login.error.username || this.props.login.error.password)
    ) {
      this.form.updateInputsWithError({
        ...this.props.login.error,
      });

      this.props.login.error = null;
      this.disableButton();
    }

    if (this.props.user.role !== 'guest') {
      const pathname =
        this.props.location.state && this.props.location.state.redirectUrl
          ? this.props.location.state.redirectUrl
          : '/';
      this.props.history.push({
        pathname,
      });
    }
    return null;
  }

  render() {
    const { classes } = this.props;
    const loginTo =
      process.env.NODE_ENV !== 'production'
        ? 'https://spotilogin.herokuapp.com?env=development'
        : 'https://spotilogin.herokuapp.com?env=production';

    console.log(loginTo);

    return (
      <div
        className={classNames(
          classes.root,
          'flex flex-col flex-1 flex-no-shrink p-24 md:flex-row md:p-0'
        )}
      >
        <div
          className={classNames(
            classes.intro,
            'flex flex-col flex-no-grow items-center p-16 text-center md:p-128 md:items-start md:flex-no-shrink md:flex-1 md:text-left'
          )}
        >
          {
            // <FuseAnimate animation="transition.slideUpIn" delay={300}>
            //   <Typography
            //     variant="display2"
            //     color="inherit"
            //     className="font-light"
            //   >
            //     Intersect
            //   </Typography>
            // </FuseAnimate>
            // <FuseAnimate delay={400}>
            //   <Typography
            //     variant="subheading"
            //     color="inherit"
            //     className="max-w-512 mt-16"
            //   >
            //     An independent project to facilitate analysis and discovery for
            //     popular music platforms. The project is built with React with
            //     Redux and Apollo for state management. Current progress is
            //     integration with AWS Lambda, API Gateway, and Firebase. For the
            //     best experience please use a Firefox browser, while I continue to
            //     build a better experience for other browsers.
            //   </Typography>
            // </FuseAnimate>
          }
        </div>

        <FuseAnimate animation={{ translateX: [0, '100%'] }}>
          <Card className={classNames(classes.card, 'mx-auto m-16 md:m-0')}>
            <CardContent className="flex flex-col items-center justify-center p-32 md:p-48 md:pt-128 ">
              <FuseAnimate animation="transition.expandIn">
                <img
                  className="w-128 mb-32"
                  src="assets/images/logos/intersec.png"
                  alt="logo"
                />
              </FuseAnimate>
              <Typography
                variant="display2"
                color="inherit"
                className="font-light h1"
              >
                INTERSECT
              </Typography>
            </CardContent>
            <Button
              className="px-4"
              component="a"
              href={auth_url}
              target="_self"
              rel="noreferrer noopener"
              fullWidth={true}
              variant="flat"
            >
              <img
                src="assets/images/logos/spotifylogin.svg"
                alt="Login with Spotify Button"
              />
            </Button>
          </Card>
        </FuseAnimate>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      submitLogin: Actions.submitLogin,
      loginWithFireBase: Actions.loginWithFireBase,
    },
    dispatch
  );
}

function mapStateToProps({ auth }) {
  return {
    login: auth.login,
    user: auth.user,
  };
}

export default withStyles(styles, { withTheme: true })(
  withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(Login)
  )
);
