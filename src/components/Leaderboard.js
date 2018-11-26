import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
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
    alignItems: 'flex-start',
    marginTop: theme.spacing.unit * 3,


  },
  paper: {
    overflow: 'auto',
  },
  table: {
  },
})

class Leaderboard extends Component {
  render() {
    const { classes, users } = this.props

    const usersOrdered = Object.values(users).sort((a, b) => {
      const aQuestionAnswerCount = a.questions.length + Object.keys(a.answers).length
      const bQuestionAnswerCount = b.questions.length + Object.keys(b.answers).length
      return bQuestionAnswerCount - aQuestionAnswerCount
    })

    return (
      <div className={classes.root}>
          <Paper className={classes.paper}>
            <Table className={classes.table} aria-labelledby="tableTitle">
              <TableHead>
                <TableRow>
                  <CustomTableCell>
                    User
                  </CustomTableCell>
                  <CustomTableCell>
                    <Tooltip title="Sort by questions asked">
                      <TableSortLabel>
                        Questions asked
                      </TableSortLabel>
                    </Tooltip>
                  </CustomTableCell>
                  <CustomTableCell>
                    <Tooltip title="Sort by questions answered">
                      <TableSortLabel>
                        Questions answered
                      </TableSortLabel>
                    </Tooltip>
                  </CustomTableCell>
                </TableRow>
              </TableHead>

              <TableBody>
              { usersOrdered.map(user => (
                <TableRow key={user.id} className={classes.row}>
                  <CustomTableCell>
                    <Avatar src={user.avatarURL} className={classes.avatar} style={{ marginRight: 10 }} component='span' /> {user.name}
                  </CustomTableCell>
                  <CustomTableCell>
                    {user.questions.length}
                  </CustomTableCell>
                  <CustomTableCell>
                    {Object.keys(user.answers).length}
                  </CustomTableCell>
                </TableRow>
              ))}
              </TableBody>
            </Table>
          </Paper>

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