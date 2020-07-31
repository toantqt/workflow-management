import React, { Component } from "react";

class FooterComponent extends Component {
  render() {
    return (
      <div className="container position-absolute fixed-bottom">
        <footer className="page-footer font-small">
          <div className="footer-copyright text-center py-3">
            © 2020 Copyright:
            <a href="https://mdbootstrap.com/"> tqt-hhp</a>
          </div>
        </footer>
      </div>
    );
  }
}

export default FooterComponent;
