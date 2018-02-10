import React, { Component } from "react";
import { connect } from "react-redux";
import FacebookLogin from "react-facebook-login";

class Login extends Component {

    responseFacebook = response => {
        if (response.status !== "unknown") {
            console.log('response: ', response);

        }
    } 

    errorResponse = (response) => {
        alert(response.error);
    }

    render() {
        return (
            <div>
                <FacebookLogin
                    appId = {this.props.FACEBOOKAPPID} //eslint-disable-line
                    autoLoad={false}
                    fields="name,email,picture"
                    callback={this.responseFacebook}
                    icon="fa-facebook-official"
                    size="small"
                    textButton="Login with Facebook"
                    onFailure={this.errorResponse}
                />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps)(Login);