import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Avatar from '@material-ui/core/Avatar'
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
  footer: {
    'align-self': 'flex-end',
    margin: 10,
    width: '100%',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
})

class Login extends Component {
  handleChange = event => {
    const userId = event.target.value
    const user = this.props.users[userId]
    
    this.props.dispatch(setAuthedUser(user))
  }

  render() {
    const { classes, users } = this.props
    const authedUserId = this.props.authedUserId || ''

    // User is logged in. Redirect to start page.
    if (authedUserId) {
      return <Redirect to="/" />
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
                   <Avatar src={user.avatarURL} className={classes.avatar} style={{marginRight: 10}} component='span' /> {user.name}
                 </MenuItem>
               ))}
            </Select>
          </FormControl>
        </form>

        <div className={classes.footer}>
          Icons made by
          <a href="https://www.flaticon.com/authors/freepik" title="Man">Man</a>
          from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
          is licensed by
          <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0">CC 3.0 BY</a>
        </div>

      </div>
    )
  }
}

function mapStateToProps({ authedUser, users }) {
  return {
    authedUserId: authedUser && authedUser.id,
    users,
  }
}

export default connect(mapStateToProps)(withStyles(styles)(Login))