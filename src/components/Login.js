import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import * as data from '../utils/_DATA'

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
});

class Login extends Component {
  state = {
    users: {}
  };

  componentDidMount() {
    data._getUsers().then(users => {
      this.setState({
        users
      });
    })
  }

  handleChange = event => {
    const userId = event.target.value
    const user = this.state.users[userId]
    this.props.onUserChange(user)
  };

  render() {
    const { classes, currentUserId='' } = this.props;
    const { users } = this.state;

    return (
      <div className={classes.root}>
        <form className={classes.form} autoComplete="off">
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="user">User</InputLabel>
            <Select
              value={currentUserId}
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

export default withStyles(styles)(Login)