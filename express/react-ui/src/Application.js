import React, { Component } from "react";
import LoginForm from "./LoginForm";
import "./App.css";
import { api_login_url } from "./components/global_api";
import LoggedInDashboard from "./App";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logged_in: localStorage.getItem("access") ? true : false
    };
  }

  handle_login = (e, data) => {
    console.log(data);
    e.preventDefault();
    fetch(api_login_url + "/api/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        localStorage.setItem("access", json.access);
        localStorage.setItem("refresh", json.refresh);
        if (json.valid === "true") {
          localStorage.setItem("validity", json.valid);
          this.setState({ validity: json.valid });
        }
        // console.log(data.username)
        if (json.access)
          this.setState({
            logged_in: true
          });
        else {
          this.setState({
            logged_in: false
          });
          // console.log(json);
          alert("Invalid Credentials");
        }
      });
  };

  handle_logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("validity");
    this.setState({ logged_in: false, validity: false });
  };

  render() {
    return (
      <div className="App">
        <h3>
          {this.state.logged_in ? (
            <LoggedInDashboard Logout={this.handle_logout} />
          ) : (
            <LoginForm handle_login={this.handle_login} />
          )}
        </h3>
      </div>
    );
  }
}

export default App;
