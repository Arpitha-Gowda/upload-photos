import React from 'react';
import ReactDOM from 'react-dom';
import FacebookLogin from 'react-facebook-login';
// import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
// import {AuthProvider} from "react-check-auth"

// class Login extends React.Component {


const Login = (props) => {
  const responseFacebook = (response) => {
    props.userData(response)
    console.log(response);
  }
 console.log(props);
 
 return(
      <FacebookLogin
          appId="837099180092875"
          autoLoad={true}
          callback={responseFacebook}
      />
    )
}


export default Login;