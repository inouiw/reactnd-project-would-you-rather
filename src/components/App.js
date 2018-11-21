import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Login from './Login'
import QuestionsAppBar from './QuestionsAppBar'
import { loadQuestions } from '../actions/questions'

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
  }

  render() {
    const { classes } = this.props;

    return (
      <Router>
        <div className={classes.root}>
          <Route exact path="/" component={QuestionsAppBar} />
          <Route path="/login" component={Login} />
        </div>
    </Router>
    );
  }
}

export default connect()(withStyles(styles)(App))
