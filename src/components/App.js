import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Login from './Login'
import NavBar from './NavBar'
import QuestionTabs from './QuestionTabs'
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
    // see https://material-ui.com/style/typography/#migration-to-typography-v2
    window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true

    this.props.dispatch(loadQuestions())
    this.props.dispatch(loadUsers())
  }

  render() {
    const { classes } = this.props

    return (
      <BrowserRouter>
        <div className={classes.root}>
          <NavBar />
          <Switch>
              <Route path="/login" component={Login} />
              <AuthorizedRoute path="/questions/:id" component={QuestionDetails} />
              <AuthorizedRoute exact path="/" component={QuestionTabs} />
              <Route render={() => <h1>Page not found</h1>} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

function mapStateToProps({ authedUserId }) {
  return {
  }
}

export default connect(mapStateToProps)(withStyles(styles)(App))
