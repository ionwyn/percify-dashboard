import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles/index';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as Actions from './store/actions';
import { bindActionCreators } from 'redux';
import { Card, CardContent } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/lab/Slider';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import TitleBarGridList from 'main/content/components/grid-list/TitleBarGridList';
import Paper from '@material-ui/core/Paper';
import SuperSelectField from 'material-ui-superselectfield';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import genresList from './assets/genresList';
import FontIcon from 'material-ui/FontIcon/FontIcon';
import Avatar from 'material-ui/Avatar/Avatar';
import Chip from 'material-ui/Chip/Chip';
import './assets/flag-icon.css';

const styles = theme => ({
  root: {
    backgroundColor: '#000000',
    backgroundSize: 'cover',
    display: 'flex',
  },
  card: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#000000',
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },
  content: {
    flex: '1 0 auto',
  },
  gridList: {
    width: 500,
    height: 450,
  },
  subheader: {
    width: '100%',
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
});

const containerStyle = {
  padding: 40,
  paddingBottom: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  flex: 1,
};
const menuItemStyle = {
  whiteSpace: 'normal',
  display: 'flex',
  justifyContent: 'space-between',
  lineHeight: 'normal',
};
const chipAvatarStyle = {
  width: '100%',
  height: '100%',
  margin: 0,
  borderRadius: '50%',
  backgroundSize: 'cover',
};

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
      blah: '',
      selectedGenre: 'pop',
      state5: [],
    };
  }

  handleChange = (event, value, metrics) => {
    this.setState({ [metrics]: value });
  };

  handleTypeChange = event => {
    // do shit with event
  };

  getNewRecommendation = (event, value, metrics) => {
    console.log(this.state);
    if (this.state.selectedGenre.constructor === Array) {
      let allGenre = [];
      this.state.selectedGenre.forEach(function(element) {
        allGenre.push(element.value);
      });
      this.props.getRecommendation({
        seed_genres: allGenre.join(),
        acousticness: this.state.acousticness,
        danceability: this.state.danceability,
        energy: this.state.energy,
        instrumentalness: this.state.instrumentalness,
        liveness: this.state.liveness,
        speechiness: this.state.speechiness,
        valence: this.state.valence,
        limit: 8,
      });
    } else {
      let allGenre = [];
      this.state.state5.forEach(function(element) {
        allGenre.push(element.value);
      });
      this.props.getRecommendation({
        seed_genres: allGenre.join(),
        acousticness: this.state.acousticness,
        danceability: this.state.danceability,
        energy: this.state.energy,
        instrumentalness: this.state.instrumentalness,
        liveness: this.state.liveness,
        speechiness: this.state.speechiness,
        valence: this.state.valence,
        limit: 8,
      });
    }
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

  // When new genre changed
  onGenreChange = selectedGenre => {
    this.setState({ selectedGenre: selectedGenre }, () =>
      this.getNewRecommendation()
    );
  };

  // Clear all suggestions
  onSuggestionsClearRequested = () => this.setState({ suggestions: [] });

  renderSuggestionsContainer = ({ containerProps, children, query }) => {
    return <Paper {...containerProps}>{children}</Paper>;
  };

  handleSelection = (values, name) => this.setState({ [name]: values });

  handleGenreSelection = (values, name) => {
    this.setState({ state5: values }, () => {
      this.getNewRecommendation();
    });
  };

  handleCustomDisplaySelections = name => values =>
    values.length !== '' ? (
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {values.map(({ label, value: country }, index) => (
          <Chip
            key={index}
            style={{ margin: 5 }}
            onRequestDelete={this.onRequestDelete(index, name)}
          >
            <Avatar
              icon={
                <FontIcon
                  className={`flag-icon 
                    flag-icon-${country['Alpha-2 code'].toLowerCase()}`}
                  style={chipAvatarStyle}
                />
              }
            />
            {label}
          </Chip>
        ))}
      </div>
    ) : (
      <div style={{ minHeight: 42, lineHeight: '42px' }}>Select market</div>
    ); // advice: use one of <option>s' default height as min-height

  handleCustomGenreDisplaySelections = name => values =>
    values.length ? (
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {values.map(({ label, value }, index) => (
          <Chip
            key={index}
            style={{ margin: 5 }}
            onRequestDelete={this.onRequestDelete(index, label)}
          >
            {label}
          </Chip>
        ))}
      </div>
    ) : (
      <div style={{ minHeight: 42, lineHeight: '42px' }}>Select genre</div>
    ); // advice: use one of <option>s' default height as min-height

  onRequestDelete = (key, name) => event => {
    this.setState(
      { state5: this.state.state5.filter((v, i) => i !== key) },
      () => this.getNewRecommendation()
    );
    console.log('new state is ', this.state.state5);
  };

  render() {
    const { classes, recommendations } = this.props;

    const { state5 } = this.state;

    const metrics = [
      'acousticness',
      'danceability',
      'energy',
      'instrumentalness',
      'liveness',
      'speechiness',
      'valence',
    ];

    console.log('recommendations');
    console.log(recommendations);

    const genreLodeList = genresList.map((genresList, genresListIndex) => (
      <div
        key={genresListIndex}
        value={genresList.value}
        label={genresList.label}
        style={menuItemStyle}
      >
        <div style={{ marginRight: 10 }}>
          <span style={{ fontWeight: 'bold' }}>{genresList.label}</span>
        </div>
      </div>
    ));

    // ES6 React.Component doesn't auto bind methods to itself. You need to bind them yourself in constructor.
    // Either write a constructor that binds your function to 'this', or use arrow function () =>
    return (
      <div
        className={classNames(
          classes.root,
          'flex flex-col flex-1 flex-no-shrink p-24 md:flex-row md:p-0 mb-4'
        )}
        style={{ height: 850, overflow: 'hidden' }}
      >
        <Card
          className={classNames(classes.card, 'flex-1 mx-auto m-16 md:m-0')}
          style={{
            backgroundColor: '#272c30',
            maxHeight: '100%',
            overflow: 'hidden',
          }}
        >
          {metrics.map(metrics => (
            <div
              key={metrics}
              className={classNames(classes.root, 'm-16 p-16')}
            >
              <Typography id="label" className="pb-8 text-18 font-300">
                {metrics}
              </Typography>
              <Slider
                id="puta"
                value={this.state[metrics]}
                aria-labelledby="label"
                style={{ width: 500 }}
                max={1}
                onChange={(event, value) =>
                  this.handleChange(event, value, metrics)
                }
                onDragEnd={(event, value) => {
                  this.getNewRecommendation(event, value, metrics);
                }}
              />
            </div>
          ))}
        </Card>

        <Card
          className={classNames(classes.card, 'flex-1 mx-auto m-16 md:m-0')}
          style={{ backgroundColor: '#22272a', overflow: 'hidden' }}
        >
          <CardContent className="flex flex-col items-center justify-center p-32 md:p-48 md:pt-128 ">
            <Typography
              style={{
                fontSize: '80px',
                fontFamily: 'brandon-grotesque, sans-serif',
                fontWeight: '700',
              }}
            >
              Wolf
            </Typography>
            Pick a genre using the form below, adjust the sliders to tune your
            results.
          </CardContent>
          <MuiThemeProvider>
            <section style={containerStyle}>
              <SuperSelectField
                name="asd"
                multiple
                keepSearchOnSelect
                withResetSelectAllButtons
                checkPosition="left"
                value={state5}
                selectionsRenderer={this.handleCustomGenreDisplaySelections()}
                hintText="Complex example"
                style={{ width: 300, marginTop: 20 }}
                hintTextAutocomplete="Find a genre"
                onChange={this.handleGenreSelection}
              >
                {genreLodeList}
              </SuperSelectField>
            </section>
          </MuiThemeProvider>
        </Card>

        <Card
          className={classNames(classes.card, 'flex-1 mx-auto m-16 md:m-0')}
          style={{
            backgroundColor: '#1d2224',
            maxHeight: '100%',
            overflow: 'hidden',
          }}
        >
          {recommendations.state !== undefined ? (
            <TitleBarGridList
              className="p-16 mb-16"
              userRec={recommendations.state}
            />
          ) : null}
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
      getSuggestion: Actions.getSuggestions,
    },
    dispatch
  );
}

function mapStateToProps({ userRecommend }) {
  return {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    recommendations: userRecommend.userRecommendations,
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
