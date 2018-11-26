import React, { Component } from 'react'
import List from '@material-ui/core/List'
import { withStyles } from '@material-ui/core/styles'
import ListItemLink from './ListItemLink'
import { formatQuestion } from '../utils/format'

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
  },
})

class Questions extends Component {
  render() {
    const { questions, classes } = this.props

    return (
      <div className={classes.root}>
        <List component="nav">
          {questions.map(q => (
            <ListItemLink to={'/questions/' + q.id} key={q.id} primary={formatQuestion(q.optionOne.text, q.optionTwo.text)} />
          ))}
        </List>
      </div>
    )
  }
}

export default withStyles(styles)(Questions)