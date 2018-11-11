import React, { Component, Fragment } from 'react'
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
    flexWrap: 'wrap',
    'justify-content': 'center',
    'align-items': 'center',
    height: '90%',
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
    const userName = this.state.users[userId].name
    this.props.onUserChange(userId, userName)
  };

  render() {
    const { classes, currentUser='' } = this.props;
    const { users } = this.state;

    return (
      <Fragment>
        <form className={classes.root} autoComplete="off">
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="user">User</InputLabel>
            <Select
              value={currentUser}
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

        <div>
          Icons made by
          <a href="https://www.flaticon.com/authors/freepik" title="Man">Man</a>
          from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
          is licensed by
          <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0">CC 3.0 BY</a>
        </div>

      </Fragment>
    )
  }
}

export default withStyles(styles)(Login)