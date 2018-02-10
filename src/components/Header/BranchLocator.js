import React, { Component } from "react";
import Logo from "./Logo";
import * as actions from "../../actions";
import { connect } from "react-redux";

class BranchLocator extends Component {
    render() {
        return (
            <div>
                <div className="col-xs-2">
                    <Logo />
                </div>
                <div className="col-xs-6">
                    <button className="branch-locator-button" onClick={this.props.handleChangePage.bind(this, 2)}>
                        <div className="row">
                            <div className="col-xs-2">
                                <img src="icons8_Region_100px_3.png" className="icon" alt="Branch Locator" />
                            </div>
                            <div className="col-xs-10">
                                <span>
                                    <span className="title">BRANCH LOCATOR</span><br/>
                                    <span className="text">Click to change your branch</span>
                                </span>
                            </div>
                        </div>
                    </button>
                </div>
                <div className="col-xs-4 utransac-switch">
                    <div className="row text-center">
                        <div className="pull-left"><span className="branch-type">Nearest</span></div>
                        <div className="pull-right"><span className="branch-type">Fastest</span></div>
                        <label onChange={this.props.handleChangeQueue.bind(this)} className="switch">
                          <input type="checkbox"/>
                          <span className="slider round"></span>
                        </label>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, actions)(BranchLocator);
