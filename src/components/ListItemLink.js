// see https://material-ui.com/guides/composition/#caveat-with-inlining
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

class ListItemLink extends Component {
  renderLink = itemProps => <Link to={this.props.to} {...itemProps} />

  render() {
    const { icon, primary, secondary } = this.props

    return (
      <li>
        <ListItem button component={this.renderLink}>
          {icon && <ListItemIcon>{icon}</ListItemIcon>}
          <ListItemText inset primary={primary} secondary={secondary} />
        </ListItem>
      </li>
    )
  }
}

export default ListItemLink