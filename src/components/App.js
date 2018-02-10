import React, { Component } from 'react';
import * as actions from "../actions";
import { connect } from "react-redux";

import Header from "./Header/Header";
// import Body from "./Body/Body";
import BranchLocator from "./Header/BranchLocator";
import './App.css';

class App extends Component {
  componentWillMount(){
    this.props.submitLocation();
  }
  
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  render() {
      console.log("current", this.props.current_branch);
    let page = this.props.page;
    let body = [];
    let display_branches = [];
    this.props.branches.map(r=>{
      display_branches.push(
        <tr style={{cursor: "pointer"}} onClick={() => this.props.onClickBranch(r.code)}>
          <td><h4><strong>{r.name}</strong></h4>
              <span>{r.address}</span>
          </td>
          <td><span className="number-queue"><h3><strong>{r.current_queue}</strong></h3><span className="light-font" /></span></td>
          <td><h4>{r.difference }</h4></td>
        </tr>
      );
    });
    if(page === 0){
        body = (<div id="landing-page"><br/><br/><br/><br/>
            <image src="unionbankonline.jpg" />
            <button onClick={this.props.getLatLon.bind(this)} className="btn btn-u-transac-success">Click to experience greatness...</button>
        </div>);
    }
    let display_pref;
    if (this.props.switch_status === 1) {
        display_pref = "NEAREST";
    } else {
        display_pref = "FASTEST";
    }
    
    let transactions;
    let queue_number = this.props.current_transaction.number;
      console.log("transaction", this.props.current_transaction);
    // if (Object.keys(this.props.current_transaction).length > 0) {
        transactions = this.props.current_transaction.actions.map((action, i) => {
            return (
                <tr key={"actions_" + i}>
                    <td><h4><strong>{this.capitalizeFirstLetter(action.attributes.type)}</strong></h4>{action.attributes.account_number} * {action.attributes.amount}</td>
                </tr>
            )
        });

    // }
    
    if(page === 1){
      body = (
          <div id="body">
              <div className="text-center">
                  <h4 className="header">Welcome to Union Bank!</h4>
                  <h4 className="header-description">Select your transaction & branch!</h4>
              </div>
              <div className="col-xs-6 text-center box-choose">
                  <div className="border-div" onClick={this.props.handleChangeTransactionType.bind(this,"withdrawal",3)}>
                      <img width="60px" src="withdrawal1.png"/>
                      <h4>Withdrawal</h4>
                  </div>
              </div>
              <div className="col-xs-6 text-center box-choose">
                  <div className="border-div" onClick={this.props.handleChangeTransactionType.bind(this,"deposit",3)}>
                      <img width="60px" src="a_deposit.png"/>
                      <h4>Deposit</h4>
                  </div>
              </div>
               <div className="col-xs-6 text-center box-choose" onClick={this.props.handleChangeTransactionType.bind(this,"encashment",3)}>
                  <div className="border-div">
                      <img width="60px" src="a_encashment.png"/>
                      <h4>Encashment</h4>
                  </div>
              </div>
               <div className="col-xs-6 text-center box-choose" onClick={this.props.handleChangeTransactionType.bind(this,"payment",3)}>
                  <div className="border-div">
                      <img width="60px" src="a_payment.png"/>
                      <h4>Payment</h4>
                  </div>
              </div>
              <div className="col-xs-12">
                  <span className="font-small-white">{display_pref} BRANCH</span>
              </div>
              <div className="col-xs-12" onClick={this.props.handleChangePage.bind(this, 2)} style={{cursor: "pointer"}}>
                  <div className=" nearest-container">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Branch Name</th>
                          <th>On the counter</th>
                          <th>Remaining</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td><h4><strong>{this.props.current_branch_object.name}</strong></h4>
                          <span>{this.props.current_branch_object.address}</span>
                          </td>
                          <td><h4 className="number-queue"><h3><strong>{this.props.current_branch_object.current_queue}</strong></h3><span className="light-font"></span></h4></td>
                          <td><h4>{this.props.current_branch_object.difference}</h4></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="nearest-container-footer text-center" style={{cursor: "pointer"}}>
                      <span onClick={this.props.handleChangePage.bind(this, 2)}>Or find other branches near you</span>
                  </div>
              </div>
          </div>
      );
    }
    if(page === 2){
      body = (
        <div className="" id="body">
           <div className="col-xs-12 list-branches">
              <div className="back-container">
                <h4><img width="30px" src="fa-long.png" onClick={this.props.handleContinueTransaction.bind(this, 1)}/> Your Branch Location</h4>
              </div>
              <div className=" nearest-container">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Branch Name</th>
                      <th>On the counter</th>
                      <th>Remaining</th>
                    </tr>
                  </thead>
                  <tbody>
                    {display_branches}
                  </tbody>
                </table>
              </div>
          </div>
        </div>
      );
    }
    if(page === 3){
      body = (
        <div className="" id="body">
           <div className="col-xs-12 list-branches">
              <div className="back-container">
              <h4><img onClick={this.props.handleContinueTransaction.bind(this, 1)} width="30px" src="fa-long.png"/> {this.props.transaction_type}</h4>
              </div>
              <div className="nearest-container">
                <div className="container-form">
                  <div className="form-group">
                    <label for="usr">Account Number</label>
                    <input type="text" className="form-control" id="usr" onChange={(e) => this.props.changeAttribute("FORM_ACCOUNT", e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label for="usr">Amount</label>
                    <input type="number" className="form-control" id="usr" onChange={(e) => this.props.changeAttribute("FORM_AMOUNT", e.target.value)} />
                  </div>
                  <button onClick={this.props.handleContinueTransaction.bind(this, 4)}className="btn btn-u-transac-success text-center col-xs-12">CONTINUE</button>
                  <span className="procedure"><i>*Please double check the information before you continue.</i></span>
                </div>
              </div>
          </div>
        </div>
      );
    }
    if(page === 4){
      body = (
        <div className="lastpage" id="body">
          <div className="col-xs-12 list-branches">
              <span>Thank you trusting Union Bank!</span>
          </div>
          <div className="col-xs-12 list-branches">
            <table className="table">
              <thead>
                <tr>
                  <th>Queue No</th>
                  <th>On the counter</th>
                  <th>Remaining</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><h4 className="number-queue"><h3><strong>{queue_number}</strong></h3></h4></td>
                  <td><h4><h3><strong>{this.props.current_branch_object.current_queue}</strong></h3></h4></td>
                  <td className="custom-padding-top"><h4>{this.props.current_branch_object.difference}</h4></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col-xs-12 list-branches">
              <table className="table">
              <thead>
                <tr>
                  <th>Your Transactions</th>
                </tr>
              </thead>
              <tbody>
                {transactions}
              </tbody>
            </table>
          </div>
          <div className="col-xs-12 list-branches">
              <div className="transact-container-sumary">
              <h4><strong>{this.props.current_branch_object.name}</strong></h4>
              <span>{this.props.current_branch_object.address}</span>
              </div>
              <button onClick={this.props.handleContinueTransaction.bind(this, 4)} className="btn btn-u-transac-success text-center col-xs-12">Add other transaction?</button>
          </div>
        </div>
      );
    }
    const getPositionButton = (
      <div>
        <button onClick={() => this.props.getLatLon()}>Click here for a hassle free banking experience</button>
      </div>
    );

    return (
      <div id="app">
        <Header>
          <BranchLocator />
        </Header>
        {body}
        <Timer />
      </div>
    );
  }
}


class Timer extends Component {
    componentWillMount() {
        this.state = {
            secondsElapsed: 0
        };
    }

    tick() {
        this.setState({secondsElapsed: this.state.secondsElapsed + 1});
    }

    componentDidMount(){
        this.interval = setInterval(() => this.tick, 1000);
    }
    componentWillUnmount() {
        this.props.submitLocation();
        clearInterval(this.interval);
    }
    render() {

    return (
        <div />
    );
}
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, actions)(App);
