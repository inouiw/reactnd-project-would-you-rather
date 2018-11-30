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
import Add from './Add'
import Leaderboard from './Leaderboard'
import { loadQuestions } from '../actions/questions'
import { loadUsers } from '../actions/users'
import { setDocumentSize } from '../actions/dom'

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '100%',
    backgroundColor: theme.palette.background.paper,
  },
})

class App extends Component {
  componentDidMount() {
    this.props.dispatch(loadQuestions())
    this.props.dispatch(loadUsers())

    // For responsive design, elements that depend on clientWidth, clientHeight 
    // must rerender when the document is resized.
     window.addEventListener('resize', () => {
      this.props.dispatch(setDocumentSize(document.documentElement.clientWidth, document.documentElement.clientHeight))
    })
    this.props.dispatch(setDocumentSize(document.documentElement.clientWidth, document.documentElement.clientHeight))
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
              <AuthorizedRoute path="/add" component={Add} />
              <AuthorizedRoute path="/leaderboard" component={Leaderboard} />
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
