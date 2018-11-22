import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Login from './Login'
import QuestionsAppBar from './QuestionsAppBar'
import QuestionDetails from './QuestionDetails'
import AuthorizedRoute from './AuthorizedRoute'
import { loadQuestions } from '../actions/questions'
import { loadUsers } from '../actions/users'

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '100%',
    backgroundColor: theme.palette.background.paper,
  },
});

class App extends Component {
  componentDidMount() {
    this.props.dispatch(loadQuestions())
    this.props.dispatch(loadUsers())
  }

  render() {
    const { classes } = this.props

    return (
      <BrowserRouter>
        <div className={classes.root}>
          <Switch>
              <Route path="/login" component={Login} />
              <AuthorizedRoute path="/questions/:id" component={QuestionDetails} />
              <AuthorizedRoute exact path="/" component={QuestionsAppBar} />
              <Route render={() => <h1>Page not found</h1>} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

function mapStateToProps({ authedUser }) {
  return {
    currentUserId: authedUser,
  }
}

export default connect(mapStateToProps)(withStyles(styles)(App))
