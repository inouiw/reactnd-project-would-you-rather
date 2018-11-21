import React, { Component } from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText'

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
            <ListItem key={q.id} button>
              <ListItemText primary={formatQuestion(q.optionOne.text, q.optionTwo.text)} />
            </ListItem>
          ))
        }
        </List>
      </div>
    )
  }
}

export default Questions