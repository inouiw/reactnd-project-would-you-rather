import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import Button from '@material-ui/core/Button'
import { saveQuestion } from '../actions/questions'

const styles = theme => ({
  container: {
    display: 'flex',
    flexFlow: 'column wrap',
    margin: 24,
    maxWidth: 600,
  },
  formControl: {
    margin: theme.spacing.unit,
  },
})

class Add extends Component {
  state = {
    optionOne: '',
    optionTwo: '',
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleButton = _ => {
    const { authedUserId, dispatch, history } = this.props
    const { optionOne, optionTwo } = this.state
    dispatch(saveQuestion(optionOne, optionTwo, authedUserId))
    history.push('/')
  }

  render() {
    const { classes } = this.props
    const { optionOne, optionTwo } = this.state

    return (
      <div className={classes.container}>
        <div style={{color: "rgba(0, 0, 0, 0.54)"}}>Would You Rather</div>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="optionOne">OptionOne</InputLabel>
          <Input id="optionOne" name="optionOne" value={optionOne} onChange={this.handleChange} />
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="optionTwo">OptionTwo</InputLabel>
          <Input id="optionTwo" name="optionTwo" value={optionTwo} onChange={this.handleChange} />
        </FormControl>
        <div>
          <Button disabled={optionOne === '' || optionTwo === ''} variant="contained" color="primary" 
            className={classes.button} onClick={this.handleButton}>
            Add Question
          </Button>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ authedUserId }) {
  return {
    authedUserId,
  }
}

export default connect(mapStateToProps)(withStyles(styles)(Add))