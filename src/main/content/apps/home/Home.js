import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { FusePageCarded, DemoContent } from '@fuse';
import { Tab, Tabs } from '@material-ui/core';

const styles = theme => ({
  layoutRoot: {},
  layoutToolbar: {
    padding: 0
  },
  tabsRoot: {
    height: 64
  },
  tabRoot: {
    height: 64
  }
});

class Home extends Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <FusePageCarded
        classes={{
          root: classes.layoutRoot,
          toolbar: classes.layoutToolbar
        }}
        header={
          <div className="py-24">
            <h4>Header</h4>
          </div>
        }
        contentToolbar={
          <Tabs
            value={value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            classes={{
              root: classes.tabsRoot
            }}
          >
            <Tab
              classes={{
                root: classes.tabRoot
              }}
              label="Tracks"
            />
            <Tab
              classes={{
                root: classes.tabRoot
              }}
              label="Artists"
            />
            <Tab
              classes={{
                root: classes.tabRoot
              }}
              label="Genres"
            />
            <Tab
              classes={{
                root: classes.tabRoot
              }}
              label="Vibe"
            />
          </Tabs>
        }
        content={
          <div className="p-24">
            {value === 0 && (
              <div>
                <h3 className="mb-16">Your favourite tracks</h3>
              </div>
            )}
            {value === 1 && (
              <div>
                <h3 className="mb-16">Your favourite artists</h3>
              </div>
            )}
            {value === 2 && (
              <div>
                <h3 className="mb-16">Your favourite genres</h3>
              </div>
            )}
            {value === 3 && (
              <div>
                <h3 className="mb-16">Your vibe</h3>
              </div>
            )}
          </div>
        }
        innerScroll
      />
    );
  }
}

export default withStyles(styles, { withTheme: true })(Home);
