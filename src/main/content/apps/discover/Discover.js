import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles/index';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as Actions from './store/actions';
import { bindActionCreators } from 'redux';
import { Card, CardContent, MenuItem } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/lab/Slider';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import SingleLineItemList from 'main/content/components/item-list/SingleLineItemList';
import { TextFieldFormsy, SelectFormsy } from '@fuse';
import Formsy from 'formsy-react';
import Autosuggest from 'react-autosuggest';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Select from 'react-select';

const styles = theme => ({
  root: {
    backgroundColor: '#000000',
    backgroundSize: 'cover'
  },
  card: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#000000'
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

const options = [
  { value: 'acoustic', label: 'acoustic' },
  { value: 'afrobeat', label: 'afrobeat' },
  { value: 'alt-rock', label: 'alt-rock' },
  { value: 'alternative', label: 'alternative' },
  { value: 'ambient', label: 'ambient' },
  { value: 'anime', label: 'anime' },
  { value: 'black-metal', label: 'black-metal' },
  { value: 'bluegrass', label: 'bluegrass' },
  { value: 'blues', label: 'blues' },
  { value: 'bossanova', label: 'bossanova' },
  { value: 'brazil', label: 'brazil' },
  { value: 'breakbeat', label: 'breakbeat' },
  { value: 'british', label: 'british' },
  { value: 'cantopop', label: 'cantopop' },
  { value: 'chicago-house', label: 'chicago-house' },
  { value: 'children', label: 'children' },
  { value: 'chill', label: 'chill' },
  { value: 'classical', label: 'classical' },
  { value: 'club', label: 'club' },
  { value: 'comedy', label: 'comedy' },
  { value: 'country', label: 'country' },
  { value: 'dance', label: 'dance' },
  { value: 'dancehall', label: 'dancehall' },
  { value: 'death-metal', label: 'death-metal' },
  { value: 'deep-house', label: 'deep-house' },
  { value: 'detroit-techno', label: 'detroit-techno' },
  { value: 'disco', label: 'disco' },
  { value: 'disney', label: 'disney' },
  { value: 'drum-and-bass', label: 'drum-and-bass' },
  { value: 'dub', label: 'dub' },
  { value: 'dubstep', label: 'dubstep' },
  { value: 'edm', label: 'edm' },
  { value: 'electro', label: 'electro' },
  { value: 'electronic', label: 'electronic' },
  { value: 'emo', label: 'emo' },
  { value: 'folk', label: 'folk' },
  { value: 'forro', label: 'forro' },
  { value: 'french', label: 'french' },
  { value: 'funk', label: 'funk' },
  { value: 'garage', label: 'garage' },
  { value: 'german', label: 'german' },
  { value: 'gospel', label: 'gospel' },
  { value: 'goth', label: 'goth' },
  { value: 'grindcore', label: 'grindcore' },
  { value: 'groove', label: 'groove' },
  { value: 'grunge', label: 'grunge' },
  { value: 'guitar', label: 'guitar' },
  { value: 'happy', label: 'happy' },
  { value: 'hard-rock', label: 'hard-rock' },
  { value: 'hardcore', label: 'hardcore' },
  { value: 'hardstyle', label: 'hardstyle' },
  { value: 'heavy-metal', label: 'heavy-metal' },
  { value: 'hip-hop', label: 'hip-hop' },
  { value: 'holidays', label: 'holidays' },
  { value: 'honky-tonk', label: 'honky-tonk' },
  { value: 'house', label: 'house' },
  { value: 'idm', label: 'idm' },
  { value: 'indian', label: 'indian' },
  { value: 'indie', label: 'indie' },
  { value: 'indie-pop', label: 'indie-pop' },
  { value: 'industrial', label: 'industrial' },
  { value: 'iranian', label: 'iranian' },
  { value: 'j-dance', label: 'j-dance' },
  { value: 'j-idol', label: 'j-idol' },
  { value: 'j-pop', label: 'j-pop' },
  { value: 'j-rock', label: 'j-rock' },
  { value: 'jazz', label: 'jazz' },
  { value: 'k-pop', label: 'k-pop' },
  { value: 'kids', label: 'kids' },
  { value: 'latin', label: 'latin' },
  { value: 'latino', label: 'latino' },
  { value: 'malay', label: 'malay' },
  { value: 'mandopop', label: 'mandopop' },
  { value: 'metal', label: 'metal' },
  { value: 'metal-misc', label: 'metal-misc' },
  { value: 'metalcore', label: 'metalcore' },
  { value: 'minimal-techno', label: 'minimal-techno' },
  { value: 'movies', label: 'movies' },
  { value: 'mpb', label: 'mpb' },
  { value: 'new-age', label: 'new-age' },
  { value: 'new-release', label: 'new-release' },
  { value: 'opera', label: 'opera' },
  { value: 'pagode', label: 'pagode' },
  { value: 'party', label: 'party' },
  { value: 'philippines-opm', label: 'philippines-opm' },
  { value: 'piano', label: 'piano' },
  { value: 'pop', label: 'pop' },
  { value: 'pop-film', label: 'pop-film' },
  { value: 'post-dubstep', label: 'post-dubstep' },
  { value: 'power-pop', label: 'power-pop' },
  { value: 'progressive-house', label: 'progressive-house' },
  { value: 'psych-rock', label: 'psych-rock' },
  { value: 'punk', label: 'punk' },
  { value: 'punk-rock', label: 'punk-rock' },
  { value: 'r-n-b', label: 'r-n-b' },
  { value: 'rainy-day', label: 'rainy-day' },
  { value: 'reggae', label: 'reggae' },
  { value: 'reggaeton', label: 'reggaeton' },
  { value: 'road-trip', label: 'road-trip' },
  { value: 'rock', label: 'rock' },
  { value: 'rock-n-roll', label: 'rock-n-roll' },
  { value: 'rockabilly', label: 'rockabilly' },
  { value: 'romance', label: 'romance' },
  { value: 'sad', label: 'sad' },
  { value: 'salsa', label: 'salsa' },
  { value: 'samba', label: 'samba' },
  { value: 'sertanejo', label: 'sertanejo' },
  { value: 'show-tunes', label: 'show-tunes' },
  { value: 'singer-songwriter', label: 'singer-songwriter' },
  { value: 'ska', label: 'ska' },
  { value: 'sleep', label: 'sleep' },
  { value: 'songwriter', label: 'songwriter' },
  { value: 'soul', label: 'soul' },
  { value: 'soundtracks', label: 'soundtracks' },
  { value: 'spanish', label: 'spanish' },
  { value: 'study', label: 'study' },
  { value: 'summer', label: 'summer' },
  { value: 'swedish', label: 'swedish' },
  { value: 'synth-pop', label: 'synth-pop' },
  { value: 'tango', label: 'tango' },
  { value: 'techno', label: 'techno' },
  { value: 'trance', label: 'trance' },
  { value: 'trip-hop', label: 'trip-hop' },
  { value: 'turkish', label: 'turkish' },
  { value: 'work-out', label: 'work-out' },
  { value: 'world-music', label: 'world-music' }
];
/*
acoustic
afrobeat
alt-rock
ambient
anime
black-metal
bluegrass
bluegrass
bossanova
brazil
breakbeat
british
cantopop
chica
*/
const customStyles = {
  option: (base, state) => ({
    ...base,
    borderBottom: '1px dotted pink',
    color: state.isFullscreen ? 'red' : 'blue',
    padding: 20
  }),
  control: (base, state) => {
    return {
      ...base,
      borderRadius: 2,
      background: state.isDisabled ? '#f0f0f0' : 'white',
      minHeight: 40,
      borderColor: state.isFocused ? '#aaaaaa' : '#e1e1e1',
      boxShadow: 'none'
    };
  },
  singleValue: (base, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';

    return { ...base, opacity, transition };
  }
};

// How each suggested item will be rendered
function renderSuggestion(suggestion) {
  return <span>{suggestion.name}</span>;
}

// What should be the input value (for the textbox), when a suggested item is selected
function getSuggestionValue(suggestion) {
  return suggestion.name;
}

function renderInputComponent(inputProps) {
  return <TextField {...inputProps} />;
}

class Discover extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      suggestions: [],
      acousticness: 0.5,
      danceability: 0.5,
      energy: 0.5,
      instrumentalness: 0.5,
      liveness: 0.5,
      speechiness: 0.5,
      valence: 0.5,
      spacing: '0',
      seed_type: '',
      blah: ''
    };
  }

  handleChange = (event, value, metrics) => {
    this.setState({ [metrics]: value });
  };

  handleTypeChange = event => {
    console.log('bruh...');
    console.log(event);
    // do shit with event
  };

  getNewRecommendation = (event, value, metrics) => {
    this.props.getRecommendation({
      seed_genres: 'jazz',
      [metrics]: value
    });
  };

  componentDidMount() {
    this.props.getToken();
  }

  onChange = (event, { newValue }) => {
    this.setState({ value: newValue });
    this.props.getSuggestion(newValue, ['artist']);
  };

  // Grab new suggestions and load them into the state
  onSuggestionsFetchRequested = ({ value }) =>
    this.setState({ suggestions: this.props.recommendations.bitch });

  // Clear all suggestions
  onSuggestionsClearRequested = () => this.setState({ suggestions: [] });

  renderSuggestionsContainer = ({ containerProps, children, query }) => {
    return <Paper {...containerProps}>{children}</Paper>;
  };

  render() {
    const { classes, recommendations } = this.props;
    console.log(recommendations);

    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: 'Input artist',
      onChange: this.onChange,
      value
    };

    const metrics = [
      'acousticness',
      'danceability',
      'energy',
      'instrumentalness',
      'liveness',
      'speechiness',
      'valence'
    ];

    // ES6 React.Component doesn't auto bind methods to itself. You need to bind them yourself in constructor.
    // Either write a constructor that binds your function to 'this', or use arrow function () =>
    return (
      <div
        className={classNames(
          classes.root,
          'flex flex-col flex-1 flex-no-shrink p-24 md:flex-row md:p-0 mb-4'
        )}
        /*style={{height: '100', overflow: 'hidden'}}*/
      >
        <Card
          className={classNames(classes.card, 'flex-1 mx-auto m-16 md:m-0')}
          style={{ backgroundColor: '#272c30' }}
        >
          {metrics.map(metrics => (
            <div
              key={metrics}
              className={classNames(classes.root, 'm-16 p-16')}
            >
              <Typography id="label" className="p-16 pb-8 text-18 font-300">
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
          style={{ backgroundColor: '#22272a' }}
        >
          <CardContent className="flex flex-col items-center justify-center p-32 md:p-48 md:pt-128 ">
            <Typography
              style={{
                fontSize: '80px',
                fontFamily: 'brandon-grotesque, sans-serif',
                fontWeight: '700'
              }}
            >
              Wolf
            </Typography>
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
                onChange={this.handleTypeChange}
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
              <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                renderInputComponent={renderInputComponent}
                inputProps={inputProps}
                renderSuggestionsContainer={this.renderSuggestionsContainer}
              />
            </Formsy>
          </CardContent>
          <Select
            options={options}
            styles={customStyles}
            isMulti
            className="basic-multi-select"
            classNamePrefix="select"
          />
        </Card>

        <Card
          className={classNames(classes.card, 'flex-1 mx-auto m-16 md:m-0')}
          style={{ backgroundColor: '#272c30' }}
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
      getToken: Actions.getToken,
      getSuggestion: Actions.getSuggestions
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
