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
import { saveQuestionAnswer } from '../actions/shared'

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
})

class QuestionDetailsUnanswered extends Component {
  state = {
    value: '',
  }

  handleChange = event => {
    this.setState({ value: event.target.value });
  }

  handleAnswer = event => {
    const { questionId, authedUserId, dispatch } = this.props
    dispatch(saveQuestionAnswer(authedUserId, questionId, this.state.value))
  }

  render() {
    const { classes, questionId, questions, users } = this.props
    const question = questions[questionId]
    const questionAuthor = users[question.author]

    return (
      <div className={classes.root}>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">
            <Avatar src={questionAuthor.avatarURL} className={classes.avatar} style={{ marginRight: 10 }} component='span' />
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

function mapStateToProps({ questions, authedUserId, users }, props) {
  return {
    questionId: props.questionId,
    questions,
    authedUserId,
    users,
  }
}

export default connect(mapStateToProps)(withStyles(styles)(QuestionDetailsUnanswered))