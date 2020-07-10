import React, { Component } from "react";
class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }
  onHandleChange = (event) => {
    let target = event.target;
    let name = target.name;
    let value = target.value;
    this.setState({
      [name]: value,
    });
  };
  onHandleChangeSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
    //this.props.getChange(this.state);
  };

  render() {
    return (
      <div className="global-container">
        <div className="card login-form">
          <div className="card-body">
            <h3 className="card-title text-center login-title">Log in</h3>
            <div className="card-text">
              <form
                action=""
                method="POST"
                onSubmit={this.onHandleChangeSubmit}
                className="loginBox"
              >
                <div className="form-group">
                  <label>Email address</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control form-control-sm"
                    aria-describedby="emailHelp"
                    onChange={this.onHandleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>

                  <input
                    type="password"
                    name="password"
                    className="form-control form-control-sm"
                    onChange={this.onHandleChange}
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block">
                  Sign in
                </button>

                <div className="sign-up">
                  Don't have an account? <a href="#s">Create One</a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginComponent;
