import React, { Component } from 'react';
import { Card, Typography } from '@material-ui/core';
import { HorizontalBar } from 'react-chartjs-2';
import { withStyles } from '@material-ui/core/styles/index';
import classNames from 'classnames';

const styles = theme => ({
  root: {}
});

class Widget10 extends Component {
  render() {
    const { classes, data, theme } = this.props;
    const dataWithColors = data.datasets.map(obj => ({
      ...obj,
      borderColor: theme.palette.secondary.main,
      backgroundColor: theme.palette.secondary.main
    }));
    return (
      <Card className={classNames(classes.root, 'w-full')}>
        <div className="relative p-24 flex flex-row items-center justify-between">
          <div className="flex flex-col">
            <Typography className="h2">Most played tracks</Typography>
          </div>
        </div>

        <div className="h-296 w-100-p">
          <HorizontalBar
            data={{
              labels: data.labels,
              datasets: dataWithColors
            }}
            options={data.options}
          />
        </div>
      </Card>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Widget10);
