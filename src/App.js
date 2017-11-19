import React, { Component } from "react";
import "./App.css";
import { addListener, removeListener } from "./AuthorizeApi";
import { Link, Route, Switch, Redirect } from "react-router-dom";
import Home from "./Home";
import Public from "./Public";
import Private from "./Private";
import Auth from "./Auth";

class App extends Component {
  state = {
    isAuthorized: false
  };

  componentDidMount() {
    addListener(this.handleAuthorize);
  }

  componentWillUnmount() {
    removeListener(this.handleAuthorize);
  }

  handleAuthorize = isAuthorized => {
    this.setState({ isAuthorized });
  };

  render() {

    const {isAuthorized} = this.state;
    let authRedirect = '';
    let privateRoute = '';

    if (isAuthorized) {
      authRedirect = <Redirect from="/auth" to="/" />;
      privateRoute = <Route path="/private" component={Private} />      
    } else {
      authRedirect = <Redirect from="/private" to="/auth" />;
      privateRoute = <Route path="/auth" component={Auth} />      
    }

    return (
      <div>
        <nav className="navigation">
          <Link to="/">Home</Link>
          <Link to="/public">Public</Link>
          <Link to="/private">Private</Link>
          <Link to="/auth">Login</Link>
        </nav>

        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/public" component={Public} />
          {authRedirect}
          {privateRoute}
          <Route component={Home} />
        </Switch>
      </div>
    );
  }
}

export default App;
