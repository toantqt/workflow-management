import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { login } from "./userFunctions";
import { createHashHistory } from "history";
class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }
  componentDidMount() {
    // const token = localStorage.userToken;
    // if (token) {
    //   this.props.history.push("/home");
    // }
    // this.props.history.push("/login");
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
    const User = {
      email: this.state.email,
      password: this.state.password,
    };
    //console.log(User);
    login(User).then((res) => {
      const history = createHashHistory();
      console.log(res);
      if (res) {
        history.push("/");
      } else {
        alert("thong tin dang nhap khong dung roi");
        history.push("/login");
        return window.location.reload();
      }
    });
    //console.log(this.state);
    // axios
    //   .post("http://localhost:5566/login", {
    //     email: this.state.email,
    //     password: this.state.password,
    //   })
    //   .then((res) => {
    //     if (res.data.accessToken) {
    //       localStorage.setItem("user", JSON.stringify(res.data));
    //     }
    //     //console.log("no access token");
    //     //console.log(res.data);
    //   })
    //   .catch((error) => {
    //     //console.log(error);
    //   });
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
                  Don't have an account? <Link to="/register">Create One</Link>
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
