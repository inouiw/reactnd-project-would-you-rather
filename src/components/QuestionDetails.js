import React from 'react'
import { connect } from 'react-redux'
import QuestionDetailsAnswered from './QuestionDetailsAnswered'
import QuestionDetailsUnanswered from './QuestionDetailsUnanswered'

const QuestionDetails = ({ questionId, questions, authedUserId }) => {
  const question = questions[questionId]

  if (!question) {
    return <div>404 Not Found: There is no question with id: "{questionId}"</div>
  }

  const isOption1 = question.optionOne.votes.includes(authedUserId)
  const isOption2 = question.optionTwo.votes.includes(authedUserId)
  const isAnswered = isOption1 || isOption2

  return isAnswered
    ? (<QuestionDetailsAnswered questionId={questionId} isOption1={isOption1} isOption2={isOption2} />)
    : (<QuestionDetailsUnanswered questionId={questionId} />)
}

function mapStateToProps({ questions, authedUserId }, props) {
  const questionId = props.match && props.match.params && props.match.params.id
  return {
    questionId,
    questions,
    authedUserId,
  }
}

export default connect(mapStateToProps)(QuestionDetails)