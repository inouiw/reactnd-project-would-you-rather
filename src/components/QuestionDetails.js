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

    const isQuestionAnswered = question.optionOne.votes.includes(authedUser.id)
      || question.optionTwo.votes.includes(authedUser.id)

    const questionAuthor = users[question.author]

    if (!questionAuthor) {
      return <div>no questionAuthor</div>
    }

    if (isQuestionAnswered) {
      return <div>todo: answered</div>
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