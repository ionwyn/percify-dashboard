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
import SingleLineItemList from 'main/content/components/item-list/SingleLineItemList';
import Paper from '@material-ui/core/Paper';
import Select from 'react-select';
import SuperSelectField from 'material-ui-superselectfield';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { genreOptions } from './assets/genres';
import continents from './assets/continents';
import countries from './assets/countries';
import flagIconCSSCountryCodes from './assets/flagIconCSSCountryCodes';
import FontIcon from 'material-ui/FontIcon/FontIcon';
import Avatar from 'material-ui/Avatar/Avatar';
import Chip from 'material-ui/Chip/Chip';
import './assets/flag-icon.css';

const styles = theme => ({
  root: {
    backgroundColor: '#000000',
    backgroundSize: 'cover',
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

const customStyles = {
  option: (base, state) => ({
    ...base,
    borderBottom: '1px dotted pink',
    color: state.isFullscreen ? 'red' : 'blue',
    padding: 20,
  }),
  control: (base, state) => {
    return {
      ...base,
      borderRadius: 2,
      background: state.isDisabled ? '#f0f0f0' : 'white',
      minHeight: 40,
      borderColor: state.isFocused ? '#aaaaaa' : '#e1e1e1',
      boxShadow: 'none',
    };
  },
  singleValue: (base, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';

    return { ...base, opacity, transition };
  },
};

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

const displayState = state =>
  state && state.length
    ? [...state].map(({ value, label }) => label || value).join(', ')
    : 'empty state';

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
      state4: [
        {
          label: 'France',
          value: {
            'English short name': 'France',
            'French short name': 'France (la)',
            'Alpha-2 code': 'FR',
            'Alpha-3 code': 'FRA',
            Numeric: 250,
            Capital: 'Paris',
            Continent: 4,
          },
        },
      ],
    };
  }

  handleChange = (event, value, metrics) => {
    this.setState({ [metrics]: value });
  };

  handleTypeChange = event => {
    // do shit with event
  };

  getNewRecommendation = (event, value, metrics) => {
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
      });
      console.log(allGenre.join());
    } else {
      this.props.getRecommendation({
        seed_genres: this.state.selectedGenre,
        acousticness: this.state.acousticness,
        danceability: this.state.danceability,
        energy: this.state.energy,
        instrumentalness: this.state.instrumentalness,
        liveness: this.state.liveness,
        speechiness: this.state.speechiness,
        valence: this.state.valence,
      });
      console.log(this.state.selectedGenre);
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
    console.log('Current state is ', this.state.selectedGenre);
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

  handleCustomDisplaySelections = name => values =>
    values.length ? (
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
      <div style={{ minHeight: 42, lineHeight: '42px' }}>
        Select some values
      </div>
    ); // advice: use one of <option>s' default height as min-height

  onRequestDelete = (key, name) => event => {
    this.setState({ [name]: this.state[name].filter((v, i) => i !== key) });
  };

  render() {
    const { classes, recommendations } = this.props;

    const { selectedGenre, state4 } = this.state;
    console.debug('state4', state4); // eslint-disable-line no-console

    const metrics = [
      'acousticness',
      'danceability',
      'energy',
      'instrumentalness',
      'liveness',
      'speechiness',
      'valence',
    ];

    const countriesNodeList = continents.map((continent, continentIndex) => (
      <optgroup key={continentIndex} label={continent}>
        {countries
          .sort((a, b) => b.Continent - a.Continent)
          .filter(c => continents[c.Continent] === continent)
          .map((country, index) => {
            const countryCode = country['Alpha-2 code'].toLowerCase();
            const countryLabel = country['English short name'];
            if (!flagIconCSSCountryCodes.includes(countryCode)) return null;

            return (
              <div
                key={index}
                value={country}
                label={countryLabel}
                style={menuItemStyle}
              >
                <div style={{ marginRight: 10 }}>
                  <span style={{ fontWeight: 'bold' }}>{countryLabel}</span>
                  <br />
                  <span style={{ fontSize: 12 }}>{country.Capital}</span>
                </div>
                <FontIcon className={`flag-icon flag-icon-${countryCode}`} />
              </div>
            );
          })}
      </optgroup>
    ));

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
                onDragEnd={(event, value) => {
                  this.getNewRecommendation(event, value, metrics);
                }}
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
                fontWeight: '700',
              }}
            >
              Wolf
            </Typography>
            Pick a genre using the form below, adjust the sliders to tune your
            results.
          </CardContent>
          <Select
            options={genreOptions}
            styles={customStyles}
            isMulti
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={this.onGenreChange}
            value={selectedGenre}
          />
          <MuiThemeProvider>
            <section style={containerStyle}>
              <fieldset style={{ marginBottom: 40 }}>
                <legend>Selected values</legend>
                <div>State 4: {displayState(state4)}</div>
              </fieldset>

              <SuperSelectField
                name="state4"
                multiple
                keepSearchOnSelect
                withResetSelectAllButtons
                checkPosition="left"
                hintText="Complex example"
                onChange={this.handleSelection}
                value={state4}
                elementHeight={58}
                selectionsRenderer={this.handleCustomDisplaySelections(
                  'state4'
                )}
                style={{ width: 300, marginTop: 20 }}
              >
                {countriesNodeList}
              </SuperSelectField>
            </section>
          </MuiThemeProvider>
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
