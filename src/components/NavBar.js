import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import ArrowBackIos from '@material-ui/icons/ArrowBackIos'
import { logout } from '../actions/authedUser'

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
            <Button color="inherit" onClick={history && history.goBack} disabled={history && history.length === 0}>
              <ArrowBackIos />
            </Button>
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
