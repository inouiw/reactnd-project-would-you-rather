import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing.unit * 3,
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
  },
  circle: {
    width: "1.5em",
    height: "1.5em",
    "border-radius": "0.75em",
    "font-size": "1em",
    color: "#fff",
    "line-height": "1.5em",
    "text-align": "center",
    background: "#2196f3",
    display: 'inline-block',
    },
    answeredRoot: {
      margin: 24
    },
})

const Circle = withStyles(styles)(props => {
  return (<div className={props.classes.circle}>{props.value}</div>)
})

const AnsweredListItem = withStyles(styles)(props => {
  const { isBorder, votes, votePercent, text } = props
  const style = {
    "margin-left": -5, 
    padding: 5, 
    border: isBorder ? "2px solid black" : "none", 
    "border-radius": 15
  }
  return (
    <ListItem>
      <div style={style}>
        <Circle value={votes} />
        <span style={{"margin-left": 6, "min-width": "4ch", "display": "inline-block"}}>
          {votePercent + "% "}
        </span>
        <span style={{"margin-left": 12}}>
          {text}
        </span>
      </div>
    </ListItem>)
})

class QuestionDetails extends Component {
  state = {
    value: '',
  }

  handleChange = event => {
    this.setState({ value: event.target.value });
  }

  handleAnswer = event => {
    alert('thanks')
  }

  render() {
    const { classes, questionId, questions, users, authedUser } = this.props
    const question = questions[questionId]

    if (!question || !authedUser) {
      return <div>!question || !authedUser</div>
    }

    const isOption1 = question.optionOne.votes.includes(authedUser.id)
    const isOption2 = question.optionTwo.votes.includes(authedUser.id)
    const isAnswered = isOption1 || isOption2
    const questionAuthor = users[question.author]

    if (!questionAuthor) {
      return <div>no questionAuthor</div>
    }

    const votesOption1 = question.optionOne.votes.length
    const votesOption2 = question.optionTwo.votes.length
    const votePercOption1 = Math.round((votesOption1 / (votesOption1+votesOption2)) * 100)
    const votePercOption2 = Math.round((votesOption2 / (votesOption1+votesOption2)) * 100)

    if (isAnswered) {
      return (
        <div className={classes.answeredRoot}>
          <Avatar src={questionAuthor.avatarURL} className={classes.avatar} style={{marginRight: 10}} component='span' />
          <span style={{color: "rgba(0, 0, 0, 0.54)"}}>Would You Rather</span>
          <List>
            <AnsweredListItem isBorder={isOption1} votes={votesOption1} votePercent={votePercOption1} text={question.optionOne.text + " or"} />
            <AnsweredListItem isBorder={isOption2} votes={votesOption2} votePercent={votePercOption2} text={question.optionTwo.text} />
          </List>
        </div>
      )
    }
    else {
      return (
        <div className={classes.root}>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">
              <Avatar src={questionAuthor.avatarURL} className={classes.avatar} style={{marginRight: 10}} component='span' />
              Would You Rather
            </FormLabel>
            <RadioGroup name="woudYouRatherGroup" className={classes.group}
              value={this.state.value} onChange={this.handleChange}>
              <FormControlLabel value="optionOne" control={<Radio color="primary" />} 
                label={question.optionOne.text + " or"} />
              <FormControlLabel value="optionTwo" control={<Radio color="primary" />}
                label={question.optionTwo.text} />
            </RadioGroup>
            <Button disabled={this.state.value === ''} variant="contained" color="primary" className={classes.button}
              onClick={this.handleAnswer}>
              Answer
            </Button>
          </FormControl>
        </div>
      )
    }
    }
}

function mapStateToProps({ questions, users, authedUser }, props) {
  const questionId = props.match && props.match.params && props.match.params.id
  return {
    questionId,
    questions,
    users,
    authedUser,
  }
}

export default connect(mapStateToProps)(withStyles(styles)(QuestionDetails))