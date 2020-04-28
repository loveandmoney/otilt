/* eslint-disable react/prop-types */

import React, { Component, useContext } from "react";
import { Link } from "gatsby";
import { AppContext } from "~context/AppContext";

class HeaderComponent extends Component {
  state = {};

  //

  render() {
    // const { appContext } = this.props;

    return (
      <header className="header w-full fixed top-0 right-0 left-0 z-30 py-2 bg-white border-b-black">
        <nav className="grid">
          <div className="grid-end-12 flex items-center justify-between">
            <Link to="/" className="block text-black">
              <h2 className="f5">OTILT</h2>
            </Link>
          </div>
        </nav>
      </header>
    );
  }
}

const Header = () => {
  const appContext = useContext(AppContext);

  return <HeaderComponent appContext={appContext} />;
};

export default Header;
