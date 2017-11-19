import React, { Component } from "react";
import { addListener, removeListener } from "./AuthorizeApi";

class Home extends Component {
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
    const { isAuthorized } = this.state;

    return (
      <div className="container">
        <h3>Home page</h3>
        <p>Welcome to the main page!</p>

        <p
          style={{ visibility: isAuthorized ? "visible" : "hidden" }}
        >
          You are logged in!
        </p>
      </div>
    );
  }
}

export default Home;
