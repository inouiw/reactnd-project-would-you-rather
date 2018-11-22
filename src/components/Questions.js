import React, { Component } from 'react'
import List from '@material-ui/core/List'
import ListItemLink from './ListItemLink'

function formatQuestion(optionA, optionB) {
  return `Would you rather ${optionA} or ${optionB}?`
}

class Questions extends Component {
  render() {
    const { questions } = this.props

    return (
      <div>
        <List component="nav">
        {
          questions.map(q => (
            <ListItemLink to={'/questions/' + q.id} key={q.id} primary={formatQuestion(q.optionOne.text, q.optionTwo.text)} />
          ))
        }
        </List>
      </div>
    )
  }
}

export default Questions