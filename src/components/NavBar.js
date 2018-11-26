import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import ArrowBackIos from '@material-ui/icons/ArrowBackIos'
import Home from '@material-ui/icons/Home'
import ThumbsUpDown from '@material-ui/icons/ThumbsUpDown'
import Add from '@material-ui/icons/Add'
import { logout } from '../actions/authedUser'
import Tooltip from '@material-ui/core/Tooltip'

const styles = theme => ({
  grow: {
    flexGrow: 1,
  },
})

class NavBar extends Component {
  handleLogout = (event) => {
    this.props.dispatch(logout())
  }

  render() {
    const { classes, authedUserId, users, history } = this.props
    const authedUser = authedUserId && users[authedUserId]

    return (
        <AppBar position="static" className={classes.root}>
          <Toolbar>
            <Tooltip title="Back">
              <div>
                  <Button color="inherit" onClick={history && history.goBack} disabled={!authedUser || (history && history.length === 0)}>
                    <ArrowBackIos />
                  </Button>
              </div>
            </Tooltip>
            <div className={classes.grow} />
            <Tooltip title="Home">
              <div>
                <Button color="inherit" onClick={() => history && history.push('/')} disabled={!authedUser}>
                  <Home />
                </Button>
              </div>
            </Tooltip>
            <Tooltip title="Leaderboard">
              <div>
                <Button color="inherit" onClick={() => history && history.push('/leaderboard')} disabled={!authedUser}>
                  <ThumbsUpDown />
                </Button>
              </div>
            </Tooltip>
            <Tooltip title="Add Question">
              <div>
                <Button color="inherit" onClick={() => history && history.push('/add')} disabled={!authedUser}>
                  <Add />
                </Button>
              </div>
            </Tooltip>
            <div className={classes.grow} />
            <div>{authedUser && authedUser.name}</div>
            <Button color="inherit" onClick={this.handleLogout} disabled={!authedUserId}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
    )
  }
}

function mapStateToProps({ authedUserId, users }) {
  return {
    authedUserId,
    users,
  }
}

export default connect(mapStateToProps)(withRouter(withStyles(styles)(NavBar)))
