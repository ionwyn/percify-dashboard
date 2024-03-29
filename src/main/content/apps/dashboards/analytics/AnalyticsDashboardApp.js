import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as Actions from './store/actions';
import { bindActionCreators } from 'redux';
import { Typography } from '@material-ui/core';
import { Chart } from 'react-chartjs-2';
import Widget1 from './widgets/Widget1';
import Widget2 from './widgets/Widget2';
import Widget3 from './widgets/Widget3';
import Widget4 from './widgets/Widget4';
import Widget5 from './widgets/Widget5';
import Widget7 from './widgets/Widget7';
import { FuseAnimate } from '@fuse';
import qs from 'qs';

const request = require('request'); // "Request" library

// Root style
const styles = theme => ({
  root: {},
});

class AnalyticsDashboardApp extends Component {
  constructor(props) {
    super(props);

    Chart.pluginService.register({
      afterDatasetsDraw(chart, easing) {
        // Only activate the plugin if it's made available
        // in the options
        if (
          !chart.options.plugins.xLabelsOnTop ||
          (chart.options.plugins.xLabelsOnTop &&
            chart.options.plugins.xLabelsOnTop.active === false)
        ) {
          return;
        }

        // To only draw at the end of animation, check for easing === 1
        const ctx = chart.ctx;

        chart.data.datasets.forEach((dataset, i) => {
          const meta = chart.getDatasetMeta(i);

          if (!meta.hidden) {
            meta.data.forEach((element, index) => {
              // Draw the text in black, with the specified font
              ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
              const fontSize = 13;
              const fontStyle = 'normal';
              const fontFamily = 'Roboto, Helvetica Neue, Arial';
              ctx.font = Chart.helpers.fontString(
                fontSize,
                fontStyle,
                fontFamily
              );

              // Just naively convert to string for now
              const dataString = dataset.data[index].toString() + 'k';

              // Make sure alignment settings are correct
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              const padding = 15;
              const startY = 24;
              const position = element.tooltipPosition();
              ctx.fillText(dataString, position.x, startY);

              ctx.save();

              ctx.beginPath();
              ctx.setLineDash([5, 3]);
              ctx.moveTo(position.x, startY + padding);
              ctx.lineTo(position.x, position.y - padding);
              ctx.strokeStyle = 'rgba(255,255,255,0.54)';
              ctx.stroke();

              ctx.restore();
            });
          }
        });
      },
    });
  }

  componentDidMount() {
    this.props.getWidgets();

    // Get JSON Object from URL Querystring
    const tokens = qs.parse(this.props.location.pathname.split('/').pop());
    const { access_token: accessToken, refresh_token: refreshToken } = tokens;
    // Set tokens and get user info by calling dispatching corresponding Actions
    this.props.setTokens({ accessToken, refreshToken });
    this.props.getMyInfo();
  }

  render() {
    const { widgets, classes } = this.props;

    if (!widgets) {
      return 'Loading..';
    }
    return (
      <div className={classes.root}>
        <Widget1 data={widgets.widget1} />
        <FuseAnimate animation="transition.slideUpIn" delay={200}>
          <div className="flex flex-col md:flex-row p-16">
            <div className="flex flex-1 flex-col min-w-0">
              <FuseAnimate delay={600}>
                <Typography className="p-16 pb-8 text-18 font-300">
                  How do you listen over the week?
                </Typography>
              </FuseAnimate>

              <div className="flex flex-col sm:flex sm:flex-row pb-32">
                <div className="widget flex w-full sm:w-1/3 p-16">
                  <Widget2 data={widgets.widget2} />
                </div>

                <div className="widget flex w-full sm:w-1/3 p-16">
                  <Widget3 data={widgets.widget3} />
                </div>

                <div className="widget w-full sm:w-1/3 p-16">
                  <Widget4 data={widgets.widget4} />
                </div>
              </div>

              <FuseAnimate delay={600}>
                <Typography className="px-16 pb-8 text-18 font-300">
                  How do you listen throughout the day?
                </Typography>
              </FuseAnimate>

              <div className="widget w-full p-16 pb-32">
                <Widget5 data={widgets.widget5} />
              </div>
            </div>

            <div className="flex flex-wrap w-full md:w-320 pt-16">
              <div className="mb-32 w-full sm:w-1/2 md:w-full">
                <FuseAnimate delay={600}>
                  <Typography className="px-16 pb-8 text-18 font-300">
                    What are your top devices?
                  </Typography>
                </FuseAnimate>

                <div className="widget w-full p-16">
                  <Widget7 data={widgets.widget7} />
                </div>
              </div>
            </div>
          </div>
        </FuseAnimate>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getWidgets: Actions.getWidgets,
      getMyInfo: Actions.getMyInfo,
      setTokens: Actions.setTokens,
    },
    dispatch
  );
}

function mapStateToProps({ analyticsDashboardApp }) {
  return {
    widgets: analyticsDashboardApp.widgets.data,
    user: analyticsDashboardApp.spotilogin,
  };
}

export default withStyles(styles, { withTheme: true })(
  withRouter(
    connect(mapStateToProps, mapDispatchToProps)(AnalyticsDashboardApp)
  )
);
