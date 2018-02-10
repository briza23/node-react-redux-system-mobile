import React, { Component } from "react";
import * as actions from "../../actions";
import { connect } from "react-redux";

class LandingPage extends Component {
    render() {
        return (
            <div id="landing-page">
                <a href="/reserve"><button onClick={this.props.getLatLon.bind(this)} className="btn btn-u-transac-success">Click to start</button></a>
            </div>
        );
    }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, actions)(LandingPage);
