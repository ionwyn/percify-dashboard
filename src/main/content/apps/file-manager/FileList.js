import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as Actions from './store/actions';
import {
  Hidden,
  Icon,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core';
import classNames from 'classnames';
import { FuseAnimate } from '@fuse';

const styles = theme => ({
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

class FileList extends Component {
  render() {
    const {
      classes,
      files,
      selectedItem,
      setSelectedItem,
      pageLayout
    } = this.props;

    return (
      <FuseAnimate animation="transition.slideUpIn" delay={300}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell className="max-w-64 w-64 p-0 text-center"> </TableCell>
              <TableCell>Track</TableCell>
              <TableCell className="hidden sm:table-cell">Artist</TableCell>
              <TableCell className="hidden sm:table-cell">Genre</TableCell>
              <TableCell className="text-center hidden sm:table-cell">
                BPM
              </TableCell>
              <TableCell className="hidden sm:table-cell">Key</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(files).map(([key, n]) => (
              <TableRow
                key={n.id}
                hover
                onClick={event => setSelectedItem(n.id)}
                selected={n.id === selectedItem}
                className="cursor-pointer"
              >
                <TableCell className="max-w-64 w-64 p-0 text-center">
                  <Icon className={classNames(classes.typeIcon, n.artist)}>
                    play_circle_outline
                  </Icon>
                </TableCell>
                <TableCell>{n.track}</TableCell>
                <TableCell className="hidden sm:table-cell">
                  {n.artist}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  {n.genre}
                </TableCell>
                <TableCell className="text-center hidden sm:table-cell">
                  {n.bpm === '' ? '-' : n.bpm}
                </TableCell>
                <TableCell className="hidden sm:table-cell">{n.key}</TableCell>
                <Hidden lgUp>
                  <TableCell>
                    <IconButton
                      onClick={ev => pageLayout().toggleRightSidebar()}
                      aria-label="open right sidebar"
                    >
                      <Icon>info</Icon>
                    </IconButton>
                  </TableCell>
                </Hidden>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </FuseAnimate>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getFiles: Actions.getFiles,
      setSelectedItem: Actions.setSelectedItem
    },
    dispatch
  );
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
    )(FileList)
  )
);
