import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles/index';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as Actions from './store/actions';
import { bindActionCreators } from 'redux';
import { Card, Grow, CardContent, Button, MenuItem } from '@material-ui/core';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import tileData from './tileData';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/lab/Slider';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import SingleLineItemList from 'main/content/components/item-list/SingleLineItemList';
import {
  TextFieldFormsy,
  CheckboxFormsy,
  RadioGroupFormsy,
  SelectFormsy
} from '@fuse';
import Formsy from 'formsy-react';

const styles = theme => ({
  root: {
    background:
      "url('/assets/images/backgrounds/dark-material-bg.jpg') no-repeat",
    backgroundSize: 'cover'
  },
  card: {
    width: '100%',
    maxWidth: 400
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit
  },
  content: {
    flex: '1 0 auto'
  },
  gridList: {
    width: 500,
    height: 450
  },
  subheader: {
    width: '100%'
  },
  paper: {
    height: 140,
    width: 100
  },
  control: {
    padding: theme.spacing.unit * 2
  }
});
// <div className="flex flex-row items-center justify-center w-full">
//   <Grow in={true}>
//     <Card className={classes.card}>
//       <SpotifyPlayback />
//     </Card>
//   </Grow>
// </div>

class Discover extends Component {
  state = {
    value: 0.5,
    acousticness: 0.5,
    danceability: 0.5,
    energy: 0.5,
    instrumentalness: 0.5,
    liveness: 0.5,
    speechiness: 0.5,
    valence: 0.5,
    spacing: '0'
  };

  handleChange = (event, value, metrics) => {
    this.setState({ [metrics]: value });
  };

  getNewRecommendation = (event, value, metrics) => {
    this.props.getRecommendation({
      seed_genres: 'jazz',
      [metrics]: value
    });
  };

  componentDidMount() {
    this.props.getToken();
    console.log(this.props);
  }

  render() {
    const { classes, recommendations } = this.props;

    console.log(recommendations);
    console.log(this.state);

    const metrics = [
      'acousticness',
      'danceability',
      'energy',
      'instrumentalness',
      'liveness',
      'speechiness',
      'valence'
    ];

    const loginTo = process.env.login_to
      ? process.env.login_to
      : 'https://spotilogin.herokuapp.com/';

    // ES6 React.Component doesn't auto bind methods to itself. You need to bind them yourself in constructor.
    // Either write a constructor that binds your function to 'this', or use arrow function () =>
    return (
      <div
        className={classNames(
          classes.root,
          'flex flex-col flex-1 flex-no-shrink p-24 md:flex-row md:p-0 mb-4'
        )}
      >
        <Card
          className={classNames(classes.card, 'flex-1 mx-auto m-16 md:m-0')}
        >
          {metrics.map(metrics => (
            <div
              key={metrics}
              className={classNames(classes.root, 'm-16 p-16')}
            >
              <Typography
                id="label"
                className="font-sans text-lg text-grey-darkest text-center"
              >
                {metrics}
              </Typography>
              <Slider
                id="puta"
                value={this.state[metrics]}
                aria-labelledby="label"
                max={1}
                onChange={(event, value) =>
                  this.handleChange(event, value, metrics)
                }
                onDragEnd={(event, value) =>
                  this.getNewRecommendation(event, value, metrics)
                }
              />
            </div>
          ))}
        </Card>

        <Card
          className={classNames(classes.card, 'flex-1 mx-auto m-16 md:m-0')}
        >
          <CardContent className="flex flex-col items-center justify-center p-32 md:p-48 md:pt-128 ">
            <img
              src="assets/images/logos/spotify_logo_with_text.svg"
              alt="Spotify Logo"
            />
            Adjust the sliders on the left to start finding new tracks. You can
            also tune your discovery to show tracks that are related to an
            artist, genre, or track below!
            <Formsy
              onValidSubmit={this.onSubmit}
              onValid={this.enableButton}
              onInvalid={this.disableButton}
              ref={form => (this.form = form)}
              className="flex flex-col justify-center"
            >
              <SelectFormsy
                className="my-24"
                name="related"
                label="Type"
                value="none"
              >
                <MenuItem value="none">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="genre">Genre</MenuItem>
                <MenuItem value="artist">Artist</MenuItem>
                <MenuItem value="track">Track</MenuItem>
              </SelectFormsy>
              <TextFieldFormsy
                className="mb-24"
                type="text"
                name="name"
                label="Name"
              />
            </Formsy>
          </CardContent>
        </Card>

        <Card
          className={classNames(classes.card, 'flex-1 mx-auto m-16 md:m-0')}
        >
          <CardContent className="flex flex-col items-center justify-center p-32 md:p-48 md:pt-128 ">
            {recommendations.state !== undefined ? (
              <SingleLineItemList
                userTop={recommendations.state}
                className="p-16 mb-16"
              />
            ) : null}
          </CardContent>
        </Card>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getRecommendation: Actions.getRecommendation,
      getToken: Actions.getToken
    },
    dispatch
  );
}

function mapStateToProps({ userRecommend }) {
  return {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    recommendations: userRecommend.userRecommendations
  };
}

export default withStyles(styles, { withTheme: true })(
  withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(Discover)
  )
);
