import React, { Component } from 'react';
import Login from './Login'

class App extends Component {
  state = { currentUser: {} }

  handleUserChange = (id, name) => {
    this.setState({
      currentUser: { id, name }
    });
  }

  render() {
    const { currentUser } = this.state

    return (
      <div className="App">
      {
        currentUser.id ? 
          <header className="App-header">
          <p>
            You are logged in as {currentUser.name}.
          </p>
        </header>
        : 
        <Login currentUser={this.state.currentUser.id} onUserChange={this.handleUserChange} />
      }
    </div>
    );
  }
}

export default App;
