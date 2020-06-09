import React from 'react';
import { connect } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import RegisterCol1 from '../../components/forms/register-col-1';
import RegisterAddContato from '../../components/forms/register-add-contato';
import RegisterAddFinanceiro from '../../components/forms/register-add-financeiro';
import RegisterAddEndereco from '../../components/forms/register-add-endereco';
import RegisterAddExpViagem from '../../components/forms/register-add-viagemexp';
import RegisterAddHabito from '../../components/forms/register-add-habito';
import RegisterAddIdioma from '../../components/forms/register-add-idioma';
import RegisterAddDocumento from '../../components/forms/register-add-documento';
import {ClientePf} from '../../components/fields/forms/cadastrarclientepf';
import * as NavbarActions from '../../action/navbar';
import { postRegister } from '../../action/register-post';

class CadastrarClientePF extends React.Component{
    constructor(props){
        super();
        this.state = {
            "User_id": props.isLoggedIn.User_id,
            "Empresa": props.isLoggedIn.Empresa,
            "TipoCliente": "Pessoa Fisica"
        }
        this.onChangeFunction = this.onChangeFunction.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    onChangeFunction(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    
    async onClick(e){
        document.getElementById("loading").style.display = "block";
        
        await this.setState({
                "User_id": this.props.isLoggedIn.User_id,
                "Empresa": this.props.isLoggedIn.Empresa,
                "TipoCliente": "Pessoa Fisica"
        })
        const {error, msg} = await postRegister(this.state, 'cliente');
        if(error){
            alert(msg);
            document.getElementById("loading").style.display = "none";
            window.location.reload();
        }else{
            alert(msg);
        }
        document.getElementById("loading").style.display = "none";
    }

    render(){
        return (
            <div className="wrapper">
                <div className="">
                    <h2>
                        Cadastro de Cliente Pessoa Fisica!
                    </h2>
                </div>
                <Form className="row w-75 border-top pt-5">
                    <RegisterCol1 fields={ ClientePf } name="clientepf" onChangeFunction={ this.onChangeFunction } ></RegisterCol1>
                    <RegisterAddFinanceiro onChangeFunction={ this.onChangeFunction } fields={this.state} name="financeiro" />
                    <RegisterAddContato onChangeFunction={ this.onChangeFunction } fields={this.state} title="Atendimento" name="atendimento" />
                    <RegisterAddContato onChangeFunction={ this.onChangeFunction } fields={this.state} title="Emergência e Saúde" name="emergencia" />
                    <RegisterAddEndereco onChangeFunction={ this.onChangeFunction } fields={this.state} name="endereco_1" />
                    <RegisterAddDocumento onChangeFunction={ this.onChangeFunction } fields={this.state} name="documento" />
                    <RegisterAddIdioma onChangeFunction={ this.onChangeFunction } fields={this.state} type="pessoafisica" name="idioma" />
                    <RegisterAddHabito onChangeFunction={ this.onChangeFunction } fields={this.state} type="pessoafisica" name="habito" />
                    <RegisterAddExpViagem onChangeFunction={ this.onChangeFunction } fields={this.state} name="expviagem" />
                </Form>
                <Button variant="primary" type="submit" id="Inicio" onClick={(e) => this.onClick(e)}>
                    Submit
                </Button> 
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    handleNavbar: (e) => dispatch(NavbarActions.handleNavbar(e))
})

const mapStateToProps = state => ({
    isLoggedIn: state.loginReducer,
    navbars: state.navbarReducer.Navbars
  })

export default connect(mapStateToProps, mapDispatchToProps)(CadastrarClientePF);