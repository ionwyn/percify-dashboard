import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormControlLabel, Icon, Switch, Typography } from '@material-ui/core';
import classNames from 'classnames';
import { FuseAnimate } from '@fuse';

const styles = theme => ({
  table: {
    width: '100%',
    textAlign: 'left',
    '& th': {
      padding: '16px 0'
    }
  },
  typeIcon: {
    '&.folder:before': {
      content: "'folder'",
      color: '#FFB300'
    },
    '&.document:before': {
      content: "'insert_drive_file'",
      color: '#1565C0'
    },
    '&.spreadsheet:before': {
      content: "'insert_chart'",
      color: '#4CAF50'
    }
  }
});

class DetailSidebarContent extends Component {
  render() {
    const { classes, files, selectedItem } = this.props;
    const selected = files[selectedItem];

    if (!selected) {
      return '';
    }

    return (
      <FuseAnimate animation="transition.slideUpIn" delay={200}>
        <div className="file-details p-24">
          <div className="preview h-256 file-icon flex items-center justify-center">
            <FuseAnimate animation="transition.expandIn" delay={300}>
              <Icon
                className={classNames(
                  classes.typeIcon,
                  selected.type,
                  'text-48'
                )}
              />
            </FuseAnimate>
          </div>

          <FormControlLabel
            className="offline-switch"
            control={
              <Switch
                checked={selected.offline}
                aria-label="Available Offline"
              />
            }
            label="Available Offline"
          />

          <Typography variant="subheading" className="py-16">
            Info
          </Typography>

          <table className={classes.table}>
            <tbody>
              <tr className="type">
                <th>Artist</th>
                <td>{selected.artist}</td>
              </tr>

              <tr className="size">
                <th>BPM</th>
                <td>{selected.bpm === '' ? '-' : selected.bpm}</td>
              </tr>

              <tr className="location">
                <th>Location</th>
                <td>{selected.location}</td>
              </tr>

              <tr className="owner">
                <th>Genre</th>
                <td>{selected.genre}</td>
              </tr>

              <tr className="modified">
                <th>Key</th>
                <td>{selected.key}</td>
              </tr>

              <tr className="opened">
                <th>Played</th>
                <td>{selected.opened}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </FuseAnimate>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

function mapStateToProps({ fileManagerApp }) {
  return {
    files: fileManagerApp.files,
    selectedItem: fileManagerApp.selectedItem
  };
}

export default withStyles(styles, { withTheme: true })(
  withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(DetailSidebarContent)
  )
);
