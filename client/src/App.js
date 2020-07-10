import React from "react";
import "./components/login-register/login.component.css";
import LoginComponent from "./components/login-register/login.component";
import RegisterComponent from "./components/login-register/register.component";

function App() {
  return (
    <div className="app">
      <LoginComponent />
      <RegisterComponent />
    </div>
  );
}
export default App;
