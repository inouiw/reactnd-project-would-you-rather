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

  onUserChange = (user) => {
    this.setState({
      currentUser: user
    });
  }

  onLogout = () => {
    this.setState({
      currentUser: undefined,
    })
  }

  render() {
    const { currentUser, questions } = this.state
    const { classes } = this.props;

    return (
      <div className={classes.root}>
      {
        currentUser ? 
          <header className="App-header">
            <QuestionsAppBar questions={questions} currentUserId={currentUser.id} 
              currentUserName={currentUser.name} onLogout={this.onLogout} />
        </header>
        : 
        <Login currentUserId={currentUser && currentUser.id} onUserChange={this.onUserChange} />
      }
    </div>
    );
  }
}

export default withStyles(styles)(App);
