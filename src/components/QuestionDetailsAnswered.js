import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'

const styles = theme => ({
  root: {
    margin: 24,
  },
  circle: {
    width: "1.5em",
    height: "1.5em",
    borderRadius: "0.75em",
    fontSize: "1em",
    color: "#fff",
    lineHeight: "1.5em",
    textAlign: "center",
    background: "#2196f3",
    display: 'inline-block',
  },
})

const Circle = withStyles(styles)(props => {
  return (<div className={props.classes.circle}>{props.value}</div>)
})

const AnsweredListItem = withStyles(styles)(props => {
  const { isBorder, votes, votePercent, text, isLast } = props
  const style = {
    marginLeft: -5,
    padding: 5,
    border: isBorder ? "2px solid black" : "none",
    borderRadius: 15,
  }
  return (
    <ListItem>
      <div style={style}>
        <Circle value={votes} />
        <span style={{ marginLeft: 6, minWidth: "4ch", display: "inline-block" }}>
          {votePercent + "% "}
        </span>
        <span style={{ marginLeft: 12 }}>
          {text}
        </span>
      </div>
      <span style={{ marginLeft: 6 }}>
        {isLast ? "" : " or"}
      </span>
    </ListItem>)
})

const QuestionDetailsAnswered = ({ classes, questionId, questions, users, isOption1, isOption2 }) => {
  const question = questions[questionId]
  const questionAuthor = users[question.author]
  const votesOption1 = question.optionOne.votes.length
  const votesOption2 = question.optionTwo.votes.length
  const votePercOption1 = Math.round((votesOption1 / (votesOption1 + votesOption2)) * 100)
  const votePercOption2 = Math.round((votesOption2 / (votesOption1 + votesOption2)) * 100)

  return (
    <div className={classes.root}>
      <Avatar src={questionAuthor.avatarURL} className={classes.avatar} style={{ marginRight: 10 }} component='span' />
      <span style={{ color: "rgba(0, 0, 0, 0.54)" }}>Would You Rather</span>
      <List>
        <AnsweredListItem isBorder={isOption1} votes={votesOption1} votePercent={votePercOption1} text={question.optionOne.text} />
        <AnsweredListItem isBorder={isOption2} votes={votesOption2} votePercent={votePercOption2} text={question.optionTwo.text} isLast={true} />
      </List>
    </div>
  )
}

function mapStateToProps({ questions, users, authedUserId }, props) {
  return {
    questionId: props.questionId,
    isOption1: props.isOption1,
    isOption2: props.isOption2,
    questions,
    users,
  }
}

export default connect(mapStateToProps)(withStyles(styles)(QuestionDetailsAnswered))