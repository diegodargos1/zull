import React from 'react';
import Login from '../forms/login';
import { store } from '../../store';
import CustomNavbar from '../../components/navbar';
import Routes from '../../routes';

import { connect } from 'react-redux';
import * as LoginActions from '../../action/login';
import '../../css/home.css';

class Home extends React.Component {
    constructor(props){
        super();
    }

    async componentWillMount(){
        //const login = await this.props.handleLogin(this.props.isLoggedIn, this.props.loginConnected, true);
        //console.log(login)
    }

    render(){
        if(this.props.isLoggedIn.User_id === null){
            return <Login />;
        }
            return "";
    }
  }

  const mapStateToProps = state => ({
    isLoggedIn: state.loginReducer,
    activeNavbar: state.navbarReducer
  })

  const mapDispatchToProps = dispatch => ({
    handleOnChange: (action, event) => dispatch(LoginActions.handleOnChange(action, event)),
    handleLogin: (action, callback, session) => dispatch(LoginActions.handleLogin(action, callback, session)),
    loginConnected: (action, token) => dispatch(LoginActions.loginConnected(action, token)),
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(Home);
  