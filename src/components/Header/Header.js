import React, { Component } from "react";

class Header extends Component {
    render() {
        return (
            <div id="header">
                {this.props.children}
            </div>
        );
    }
}

export default Header;