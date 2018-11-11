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
    return (
      <div className="App">
      <Login currentUser={this.state.currentUser.id} onUserChange={this.handleUserChange} />
      {/*
      <header className="App-header">
        <p>
          test
          Edit <code>src/App.js</code> and save to reload.
        </p>
      </header>
      */}
    </div>
    );
  }
}

export default App;
