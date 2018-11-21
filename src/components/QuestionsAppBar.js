import React, { Component, Fragment } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Questions from './Questions'

// returns an array of question values containing all unanswered questions of the provided user.
function filterUnansweredQuestions(questions, currentUserId) {
  return Object.values(questions).filter(q => q.optionOne.votes.includes(currentUserId)
    || q.optionTwo.votes.includes(currentUserId) )
}

// returns an array of question values containing all answered questions of the provided user.
function filterAnsweredQuestions(questions, currentUserId) {
  return Object.values(questions).filter(q => !q.optionOne.votes.includes(currentUserId)
    && !q.optionTwo.votes.includes(currentUserId) )
}

class QuestionsAppBar extends Component {
  state = {
    selectedTab: 'unansweredTab'
  }

  handleChange = (event, selectedTab) => {
    this.setState({ selectedTab });
  }

  render() {
    const { selectedTab } = this.state
    const { questions, currentUserId } = this.props

    return (
      <Fragment>
        <AppBar position="static">
          <Tabs value={selectedTab} onChange={this.handleChange}>
            <Tab value='unansweredTab' label="Unanswered" />
            <Tab value='answeredTab' label="Answered" />
          </Tabs>
        </AppBar>

        { selectedTab === 'unansweredTab' && <Questions questions={filterUnansweredQuestions(questions, currentUserId)} /> }
        { selectedTab === 'answeredTab' && <Questions questions={filterAnsweredQuestions(questions, currentUserId)} /> }
      </Fragment>
    );
  }
}

export default QuestionsAppBar
