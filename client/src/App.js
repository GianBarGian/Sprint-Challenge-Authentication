import React, { Component } from 'react';
import {Route, NavLink, withRouter} from 'react-router-dom';
import LoginSignup from './components/LoginSignup';
import Jokes from './components/Jokes';


class App extends Component {
  logout = e => {
    e.preventDefault();
    localStorage.removeItem('token');
    this.props.history.replace('/');
  }

  render() {
    return (
      <div className="App">
        <nav>
          <NavLink to="/jokes">Jokes</NavLink>
          {
            localStorage.getItem('token')
              ? <button onClick={e => this.logout(e)} >Logout</button>
              : null
          }
        </nav>

        <Route exact path="/" component={LoginSignup} />
        <Route path="/jokes" component={Jokes}/>
      </div>
    );
  }
}

export default withRouter(App);
