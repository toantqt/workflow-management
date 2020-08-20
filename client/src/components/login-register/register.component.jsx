import React, { Component } from "react";
import "./register.component.css";
import { Link } from "react-router-dom";
import { register } from "./userFunctions";
import { createHashHistory } from "history";
class registerComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
    };
  }

  //handle change input
  onHandleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value,
    });
  };

  //handle submit form
  onHandleSubmit = (event) => {
    event.preventDefault();
    const history = createHashHistory();
    if (
      this.state.email === "" ||
      this.state.username === "" ||
      this.state.password === ""
    ) {
      return alert("ban chua nhap day du thong tin dang ky");
    }
    const newUser = {
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
    };
    register(newUser)
      .then((res) => {
        const history = createHashHistory();
        //console.log(res);
        alert(res.createUser.message);
        if (res.createUser.succeed) {
          history.goBack();
          // return history.push("/login");
        } else {
          // history.push("/register");
          return window.location.reload();
        }
      })
      .catch((error) => {
        //console.log(error);
      });

    // axios
    //   .post("http://localhost:5566/register", {
    //     email: this.state.email,
    //     username: this.state.username,
    //     password: this.state.password,
    //   })
    //   .then((res) => {
    //     //console.log(res);
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
            <h3 className="card-title text-center register-title">Register</h3>
            <div className="card-text">
              <form onSubmit={this.onHandleSubmit}>
                <div className="form-group">
                  <label>Email address</label>
                  <input
                    name="email"
                    type="email"
                    className="form-control form-control-sm"
                    aria-describedby="emailHelp"
                    onChange={this.onHandleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Username</label>
                  <input
                    name="username"
                    type="text"
                    className="form-control form-control-sm"
                    aria-describedby="emailHelp"
                    onChange={this.onHandleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    name="password"
                    type="password"
                    className="form-control form-control-sm"
                    onChange={this.onHandleChange}
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block">
                  Register
                </button>

                <div className="sign-up">
                  Do have an account? <Link to="/login">Sign in</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default registerComponent;
