import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Avatar from '@material-ui/core/Avatar'
import Footer from './Footer'
import { setAuthedUser } from '../actions/authedUser'

const styles = theme => ({
  root: {
    display: 'flex',
    'flex-flow': 'row wrap',
    height: '100%',
  },
  form: {
    margin: 'auto',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
})

class Login extends Component {
  handleChange = event => {
    const authedUserId = event.target.value
    this.props.dispatch(setAuthedUser(authedUserId))
  }

  render() {
    const { classes, users, referrer } = this.props
    const authedUserId = this.props.authedUserId || ''

    // User is logged in. Redirect to referrer or start page.
    if (authedUserId) {
      return <Redirect to={referrer || "/"} />
    }

    return (
      <div className={classes.root}>
        <form className={classes.form} autoComplete="off">
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="user">User</InputLabel>
            <Select
              value={authedUserId}
              onChange={this.handleChange}
              autoWidth={true}
              inputProps={{
                id: 'user',
              }}>
              {Object.values(users).map((user) => (
                <MenuItem key={user.id} value={user.id}>
                  <Avatar src={user.avatarURL} className={classes.avatar} style={{ marginRight: 10 }} component='span' /> {user.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </form>

        <Footer />
      </div>
    )
  }
}

function mapStateToProps({ authedUserId, users }, props) {
  return {
    authedUserId,
    users,
    referrer: props && props.location.state && props.location.state.referrer,
  }
}

export default connect(mapStateToProps)(withStyles(styles)(Login))