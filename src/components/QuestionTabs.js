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
  tabs: {
    display: 'flex',
    justifyContent: 'center',
  },
})

class QuestionsAppBar extends Component {
  state = {
    selectedTab: 'unansweredTab'
  }

  handleChange = (_, selectedTab) => {
    this.setState({ selectedTab });
  }

  handleLogout = (_) => {
    this.props.dispatch(logout())
  }

  render() {
    const { selectedTab } = this.state
    const { questions, authedUserId, classes } = this.props

    return (
      <Fragment>
        <AppBar position="static" color="default">
          <Tabs value={selectedTab} onChange={this.handleChange} className={classes.tabs}>
            <Tab value='unansweredTab' label="Unanswered" />
            <Tab value='answeredTab' label="Answered" />
          </Tabs>
        </AppBar>

        {selectedTab === 'unansweredTab' && <Questions questions={filterUnansweredQuestions(questions, authedUserId)} />}
        {selectedTab === 'answeredTab' && <Questions questions={filterAnsweredQuestions(questions, authedUserId)} />}
      </Fragment>
    );
  }
}

function mapStateToProps({ questions, authedUserId }) {
  return {
    questions,
    authedUserId,
  }
}

export default connect(mapStateToProps)(withStyles(styles)(QuestionsAppBar))
