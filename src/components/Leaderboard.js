import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import Tooltip from '@material-ui/core/Tooltip'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import Footer from './Footer'

const CustomTableCell = withStyles(theme => ({
  head: {
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.54)',
    backgroundColor: '#f5f5f5',
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    display: 'flex',
    'flex-flow': 'row wrap',
    height: '100%',
    justifyContent: 'center',
    marginTop: theme.spacing.unit * 3,
  },
  paper: {
    minWidth: 600,
    maxWidth: 800,
  },
  table: {
    minWidth: 600,
    maxWidth: 800,
  },
})

class Leaderboard extends Component {
  render() {
    const { classes, users } = this.props

    return (
      <div className={classes.root}>
        {/* <List>
          { Object.values(users).map(user => (
            <ListItem>
              <Avatar src={user.avatarURL} className={classes.avatar} style={{ marginRight: 10 }} component='span' /> {user.name}
              <ListItemText primary="Photos" />
            </ListItem>
          ))}
        </List> */}
        <div>
          <Paper className={classes.paper}>
            <Table className={classes.table} aria-labelledby="tableTitle">
              <TableHead>
                <TableRow>
                  <CustomTableCell>
                    test
              </CustomTableCell>
                  <CustomTableCell>
                    <Tooltip title="Sort">
                      <TableSortLabel>
                        test2
                  </TableSortLabel>
                    </Tooltip>
                  </CustomTableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                <TableRow className={classes.row}>
                  <CustomTableCell>
                    eins
              </CustomTableCell>
                  <CustomTableCell>
                    3
              </CustomTableCell>
                </TableRow>
                <TableRow className={classes.row}>
                  <CustomTableCell>
                    eins
              </CustomTableCell>
                  <CustomTableCell>
                    3
              </CustomTableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>
        </div>

        <Footer />
      </div>
    )
  }
}

function mapStateToProps({ authedUserId, users }) {
  return {
    authedUserId,
    users,
  }
}

export default connect(mapStateToProps)(withStyles(styles)(Leaderboard))