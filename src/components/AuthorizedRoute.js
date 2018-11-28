import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

// Idea for Component from https://css-tricks.com/react-router-4/
class AuthorizedRoute extends Component {
  render() {
    const { component: Comp, pending, logged, exact, path } = this.props

    return (
      <Route exact={exact} path={path} render={props => {
        if (pending) {
          return (<div>Loading...</div>)
        }
        return logged
          ? <Comp {...props} />
          : <Redirect to={{
              pathname: "/login",
              state: { referrer: this.props.location.pathname }
            }} />
      }} />
    )
  }
}

const stateToProps = ({ authedUserId }) => {
  return {
    pending: false,
    logged: authedUserId !== null,
  }
}

export default connect(stateToProps)(AuthorizedRoute)