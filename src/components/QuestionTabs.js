import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { withStyles } from '@material-ui/core/styles'
import { logout } from '../actions/authedUser'
import Questions from './Questions'

// returns an array of question values containing all answered questions of the provided user.
function filterAnsweredQuestions(questions, currentUserId) {
  return Object.values(questions).filter(q => q.optionOne.votes.includes(currentUserId)
    || q.optionTwo.votes.includes(currentUserId))
    .sort((a, b) => b.timestamp - a.timestamp)
}

// returns an array of question values containing all unanswered questions of the provided user.
function filterUnansweredQuestions(questions, currentUserId) {
  return Object.values(questions).filter(q => !q.optionOne.votes.includes(currentUserId)
    && !q.optionTwo.votes.includes(currentUserId))
    .sort((a, b) => b.timestamp - a.timestamp)
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
    const { classes, questions, authedUser } = this.props

    return (
      <Fragment>
        <AppBar position="static" color="default">
          <Tabs value={selectedTab} onChange={this.handleChange}>
            <Tab value='unansweredTab' label="Unanswered" />
            <Tab value='answeredTab' label="Answered" />
          </Tabs>
        </AppBar>

        {selectedTab === 'unansweredTab' && <Questions questions={filterUnansweredQuestions(questions, authedUser.id)} />}
        {selectedTab === 'answeredTab' && <Questions questions={filterAnsweredQuestions(questions, authedUser.id)} />}
      </Fragment>
    );
  }
}

function mapStateToProps({ questions, authedUser }) {
  return {
    questions: questions,
    authedUser: authedUser,
  }
}

export default connect(mapStateToProps)(withStyles(styles)(QuestionsAppBar))
