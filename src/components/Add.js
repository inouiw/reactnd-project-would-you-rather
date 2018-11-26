import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import Button from '@material-ui/core/Button'
import { saveQuestion } from '../actions/questions'

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
  },
  container: {
    display: 'flex',
    flexFlow: 'column wrap',
    margin: 24,
    // minWidth set in render method //()minWidth: document.documentElement.clientWidth > 1000 ? 800 : 200,
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
    const { classes, clientWidth } = this.props
    const { optionOne, optionTwo } = this.state

    const containerMinWidth = clientWidth > 700 ? 600 : clientWidth - 50

    return (
      <div className={classes.root}>
        <div className={classes.container} style={{minWidth: containerMinWidth}}>
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
      </div>
    )
  }
}

function mapStateToProps({ authedUserId, dom }) {
  return {
    authedUserId,
    clientWidth: dom && dom.clientWidth,
  }
}

export default connect(mapStateToProps)(withStyles(styles)(Add))