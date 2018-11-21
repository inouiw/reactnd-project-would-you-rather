import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import { logout } from '../actions/authedUser'
import Questions from './Questions'

// returns an array of question values containing all unanswered questions of the provided user.
function filterUnansweredQuestions(questions, currentUserId) {
  return Object.values(questions).filter(q => q.optionOne.votes.includes(currentUserId)
    || q.optionTwo.votes.includes(currentUserId))
}

// returns an array of question values containing all answered questions of the provided user.
function filterAnsweredQuestions(questions, currentUserId) {
  return Object.values(questions).filter(q => !q.optionOne.votes.includes(currentUserId)
    && !q.optionTwo.votes.includes(currentUserId))
}

const styles = theme => ({
  grow: {
    flexGrow: 1,
  }
})

class QuestionsAppBar extends Component {
  state = {
    selectedTab: 'unansweredTab'
  }

  handleChange = (event, selectedTab) => {
    this.setState({ selectedTab });
  }

  handleLogout = (event) => {
    this.props.dispatch(logout())
  }

  render() {
    const { selectedTab } = this.state
    const { classes, questions, currentUserId, currentUserName } = this.props

    if (!currentUserId) {
      return <Redirect to='/login' />
    }

    return (
      <Fragment>
        <AppBar position="static">
          <Toolbar>
            <Tabs value={selectedTab} onChange={this.handleChange}>
              <Tab value='unansweredTab' label="Unanswered" />
              <Tab value='answeredTab' label="Answered" />
            </Tabs>
            <div className={classes.grow} />
            <div>{currentUserName}</div>
            <Button color="inherit" onClick={this.handleLogout}>Logout</Button>
          </Toolbar>
        </AppBar>

        {selectedTab === 'unansweredTab' && <Questions questions={filterUnansweredQuestions(questions, currentUserId)} />}
        {selectedTab === 'answeredTab' && <Questions questions={filterAnsweredQuestions(questions, currentUserId)} />}
      </Fragment>
    );
  }
}

function mapStateToProps({ questions, authedUser }) {
  return {
    questions: questions,
    currentUserId: authedUser && authedUser.id,
    currentUserName: authedUser && authedUser.name,
  }
}

export default connect(mapStateToProps)(withStyles(styles)(QuestionsAppBar))
