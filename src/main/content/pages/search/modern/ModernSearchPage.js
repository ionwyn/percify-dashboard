import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles/index';
import classNames from 'classnames';
import { FusePageSimple, FuseAnimate, FuseAnimateGroup } from '@fuse';
import axios from 'axios/index';
import {
  Button,
  colors,
  Icon,
  IconButton,
  Input,
  MuiThemeProvider,
  Paper,
  Typography
} from '@material-ui/core';

const styles = theme => ({
  layoutRoot: {},
  title: {
    color: colors.blue[800]
  },
  url: {
    color: colors.green[800]
  },
  excerpt: {}
});

class ModernSearchPage extends Component {
  state = {
    data: []
  };

  componentDidMount() {
    axios.get('/api/search').then(res => {
      this.setState({ data: res.data });
    });
  }

  render() {
    const { classes } = this.props;
    const { data } = this.state;
    return (
      <FusePageSimple
        classes={{
          root: classes.layoutRoot
        }}
        header={
          <div className="flex flex-1 items-center p-24 max-w-md">
            <MuiThemeProvider theme={this.props.theme}>
              <Paper
                className={'flex items-center h-44 w-full'}
                elevation={1}
                square
              >
                <Input
                  placeholder="Search..."
                  className="pl-16"
                  disableUnderline
                  fullWidth
                  inputProps={{
                    'aria-label': 'Search'
                  }}
                />
                <Icon color="action" className="mr-16">
                  search
                </Icon>
              </Paper>
            </MuiThemeProvider>
          </div>
        }
        content={
          <div className="p-24 pt-0 max-w-md">
            <FuseAnimate delay={200}>
              <Typography color="textSecondary" className="text-13 ml-16 my-24">
                {data.length} results
              </Typography>
            </FuseAnimate>

            <FuseAnimateGroup
              enter={{
                animation: 'transition.slideUpBigIn'
              }}
            >
              {data.map(item => (
                <Paper className="p-16 mb-16" elevation={1} key={item.id}>
                  <Typography
                    className={classNames(
                      classes.title,
                      'text-18 cursor-pointer'
                    )}
                  >
                    {item.title}
                  </Typography>
                  <Typography className={classNames(classes.url)}>
                    {item.url}
                  </Typography>
                  <Typography
                    className={classNames(classes.excerpt, 'text-13')}
                  >
                    {item.excerpt}
                  </Typography>
                </Paper>
              ))}
            </FuseAnimateGroup>
            <div className="flex justify-center mt-48">
              <Paper elevation={1}>
                <IconButton>
                  <Icon>chevron_left</Icon>
                </IconButton>
                <Button className="min-w-48 h-48 p-0 px-16">1</Button>
                <Button className="min-w-48 h-48 p-0 px-16">2</Button>
                <Button className="min-w-48 h-48 p-0 px-16">3</Button>
                <Button className="min-w-48 h-48 p-0 px-16">4</Button>
                <Button className="min-w-48 h-48 p-0 px-16">5</Button>
                <IconButton>
                  <Icon>chevron_right</Icon>
                </IconButton>
              </Paper>
            </div>
          </div>
        }
      />
    );
  }
}

export default withStyles(styles, { withTheme: true })(ModernSearchPage);
