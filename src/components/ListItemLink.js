// see https://material-ui.com/guides/composition/#caveat-with-inlining
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ListItem from '@material-ui/core/ListItem'

class ListItemLink extends Component {
  renderLink = itemProps => <Link to={this.props.to} {...itemProps} />

  render() {
    const { primary } = this.props

    return (
      <li>
        <ListItem button component={this.renderLink}>
          {primary}
        </ListItem>
      </li>
    )
  }
}

export default ListItemLink