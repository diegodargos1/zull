import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './containers/home';
import Inicio from './containers/inicio';
import Login from './containers/forms/login';
import CadastrarClientePF from './containers/cadastrarclientepf';
import CadastrarClientePJ from './containers/cadastrarclientepj';
import CadastrarFornecedorPJ from './containers/cadastrarfornecedorpj';
import CadastrarFornecedorPF from './containers/cadastrarfornecedorpf';
import CadastrarFuncionario from './containers/cadastrarfuncionario';
import ConsultaCliente from './containers/consultacliente';
import ConsultaFornecedor from './containers/consultafornecedor';
import OrcamentoPromocao from './containers/orcamento/orcamentopromocao';
import OrcamentoConsulta from './containers/orcamento/orcamentoconsulta';
import OrcamentoConsultaPadrao from './containers/orcamento/orcamentoconsultapadrao';
import OrcamentoPadrao from './containers/orcamento/orcamentopromocaopadrao';
import OrcamentoViagem from './containers/orcamento/orcamentoviagem';
// import OrcamentoConsultaViagem from './containers/orcamento/orcamentoconsultaviagem';
import CustomNavbar from './components/navbar';
import React, { useState, useEffect} from 'react';
import { connect } from 'react-redux';
import * as LoginActions from './action/login';


function Routes({isLoggedIn, handleLogin, loginConnected}){
    const [auth, setAuthentication] = useState(false);
    const [tentativas, setTentativas] = useState(0);
    useEffect(() => {
        async function getSession(){
            if(!auth && tentativas === 0){
                setTentativas(1);
                const loginConex = await handleLogin(isLoggedIn, loginConnected, true);
            }
            
            const user_id = await localStorage.getItem('user');
            const empresa = await localStorage.getItem('empresa');
            if((user_id === null || empresa === null ) && !isLoggedIn.isLoggedIn && !isLoggedIn.User_id){
                setAuthentication(false);
            }else{
                setAuthentication(true);
            }
        }
        
        getSession();
    }, [auth, handleLogin, isLoggedIn, loginConnected, tentativas]);

    

    if(!auth){
        return(
            <BrowserRouter>
                <Switch> 
                    <Route path="/" component={Home} />
                </Switch>
            </BrowserRouter>
            
            )
    }else{
        return ( 
            <div>
                <div id="loading">
                    <div className="loadBox">
                        <div id="spin-loading"></div>
                    </div>
                </div>
                <CustomNavbar /> 

            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={Inicio} />
                    <Route path="/cadastroclientepf" component={CadastrarClientePF} />
                    <Route path="/cadastroclientepj" component={CadastrarClientePJ} />
                    <Route path="/cadastrofornecedorpj" component={CadastrarFornecedorPJ} />
                    <Route path="/cadastrofornecedorpf" component={CadastrarFornecedorPF} />
                    <Route path="/cadastrofuncionario" component={CadastrarFuncionario} />
                    <Route path="/consultacliente" component={ConsultaCliente} />
                    <Route path="/consultafornecedor" component={ConsultaFornecedor} />
                    <Route path="/orcamentopromocao" component={OrcamentoPromocao} />
                    <Route path="/orcamentoconsulta" component={OrcamentoConsulta} />
                    <Route path="/orcamentoviagem" component={OrcamentoViagem} />
                    <Route path="/orcamentoconsultapadrao" component={OrcamentoConsultaPadrao} />
                    <Route path="/orcamentopadrao" component={OrcamentoPadrao} />
                    
                </Switch>
            </BrowserRouter>
            </div>)
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
  export default connect(mapStateToProps, mapDispatchToProps)(Routes);