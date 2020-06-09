import React from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/login.css';
import {setup} from './coalesce';
import './util';
import logo from '../../image/logo.png';
import * as LoginActions from '../../action/login';

async function onClick(callback, isLoggedIn){
  const login = await callback();
  let user_id = await localStorage.getItem('user');
}

const Login = ({isLoggedIn, handleOnChange, handleLogin, loginConnected}) => {
  window.addEventListener('load', setup);
  return(
    <div className="">
      <div className="content content--canvas"></div>
      <div className="wrapper-login fadeInDown">
        <div id="formContent">
          <div className="fadeIn first">
            <img src={logo} id="icon" alt="User Icon" />
          </div>
          <form>
            <input type="text" id="login" className="fadeIn second" name="login" onChange={(event) => handleOnChange(isLoggedIn, event)} placeholder="login"  ></input>
            <input type="password" id="password" className="fadeIn third" name="password" onChange={(event) => handleOnChange(isLoggedIn, event)} placeholder="password" ></input>
            <input type="button" id="loginBtn" className="fadeIn fourth" value="Log In" onClick={() => onClick(async function(){return await handleLogin(isLoggedIn, loginConnected)}, isLoggedIn) } />
          </form>
          <div id="formFooter">
            <a className="underlineHover"></a>
            Esta página é para acesso restrito, por favor acesse <a href="http://www.zull.com.br">www.zull.com.br</a>
          </div>

        </div>
      </div>
      </div>
    )};

const mapStateToProps = state => ({
  isLoggedIn: state.loginReducer
})

const mapDispatchToProps = dispatch => ({
  handleOnChange: (action, event) => dispatch(LoginActions.handleOnChange(action, event)),
  handleLogin: (action, callback) => dispatch(LoginActions.handleLogin(action, callback)),
  loginConnected: (action, token) => dispatch(LoginActions.loginConnected(action, token)),
});



export default connect(mapStateToProps, mapDispatchToProps)(Login);
