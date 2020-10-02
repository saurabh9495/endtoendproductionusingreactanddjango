import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "reactstrap";
import dashboard_logo from "./techa.jpg";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }
  handle_change = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState(prevstate => {
      const newState = { ...prevstate };
      newState[name] = value;
      return newState;
    });
  };

  render() {
    return (
      <div>
        <div className="head_pad">
          <br />
          <Row align="top">
            <Col md="12">
              <div className="header">
                <img src={dashboard_logo} alt="synopsys_logo" />
              </div>
            </Col>
          </Row>
        </div>
        <div className="row">
          <div className="col-md-4 col-md-offset-4"></div>
          <div className="col-md-4 col-md-offset-4">
            <form onSubmit={e => this.props.handle_login(e, this.state)}>
              <h1>Log In</h1>
              <div className="form-group">
                <label className="control-label">Username</label>
                <input
                  type="text"
                  name="username"
                  value={this.state.username}
                  onChange={this.handle_change}
                  className="form-control"
                />
                <br />
                <label className="control-label">Password</label>
                <input
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handle_change}
                  className="form-control"
                />
                <br />
                <div className="form-group">
                  <button className="btn btn-primary btn-lg">Login</button>
                </div>
              </div>
            </form>
          </div>
          <div className="col-md-4 col-md-offset-4"></div>
        </div>
      </div>
    );
  }
}

export default LoginForm;

LoginForm.propTypes = {
  handle_login: PropTypes.func.isRequired
};
