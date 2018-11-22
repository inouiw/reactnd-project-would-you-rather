// see https://css-tricks.com/react-router-4/
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

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
          : <Redirect to="/login" />
      }} />
    )
  }
}

const stateToProps = ({ authedUser }) => {
  return {
    pending: false,
    logged: authedUser !== null,
  }
}

export default connect(stateToProps)(AuthorizedRoute)