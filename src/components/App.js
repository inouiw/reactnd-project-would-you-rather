import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Login from './Login'
import QuestionsAppBar from './QuestionsAppBar'
import * as data from '../utils/_DATA'

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '100%',
    backgroundColor: theme.palette.background.paper,
  },
});

class App extends Component {
  state = { 
    currentUser: undefined,
    questions: {},
  }

  componentDidMount() {
    data._getQuestions().then(questions => {
      this.setState({
        questions
      });
    })
  }

  handleUserChange = (user) => {
    this.setState({
      currentUser: user
    });
  }

  render() {
    const { currentUser, questions } = this.state
    const { classes } = this.props;

    return (
      <div className={classes.root}>
      {
        currentUser ? 
          <header className="App-header">
            <QuestionsAppBar questions={questions} currentUserId={currentUser.id} />
            <p>
              You are logged in as {currentUser.name}.
            </p>
        </header>
        : 
        <Login currentUserId={currentUser && currentUser.id} onUserChange={this.handleUserChange} />
      }
    </div>
    );
  }
}

export default withStyles(styles)(App);
