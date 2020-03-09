import React from 'react';
import FacebookLogin from 'react-facebook-login';
// import {AuthProvider} from "react-check-auth"
class Login extends React.Component {
  responseFacebook(response) {

    console.log('abc',response)
  }
 
  render(props) {
    return (
      <FacebookLogin
        appId="837099180092875"
        autoLoad={true}
        fields="name,email,picture"
        callback={this.responseFacebook}
      />
    )
  }
}

export default Login;