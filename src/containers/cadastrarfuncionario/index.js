import React from 'react';
import {connect} from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import RegisterCol1 from '../../components/forms/register-col-1';
import RegisterAddContato from '../../components/forms/register-add-contato';
import RegisterAddFinanceiro from '../../components/forms/register-add-financeiro';
import RegisterAddEndereco from '../../components/forms/register-add-endereco';
import RegisterAddInfoPessoal from '../../components/forms/register-add-infopessoal';
import {Funcionario} from '../../components/fields/forms/cadastrarfuncionario';
import RegisterAddBeneficio from '../../components/forms/register-add-beneficio';
import RegisterAddContrato from '../../components/forms/register-add-contrato';
import RegisterAddIdioma from '../../components/forms/register-add-idioma';
import { postRegister } from '../../action/register-post';
import * as NavbarActions from '../../action/navbar';
import 'bootstrap/dist/css/bootstrap.min.css';


class CadastrarFuncionario extends React.Component{
    constructor(props){
        super();
        this.state = {
            "User_id": props.isLoggedIn.User_id,
            "Empresa": props.isLoggedIn.Empresa,
            "TipoCliente": "Funcionario"
        }
        this.onChangeFunction = this.onChangeFunction.bind(this);
        this.onChangeFunctionById = this.onChangeFunctionById.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    onChangeFunction(e){
        if(e.target.type == "checkbox"){
            this.setState({
                [e.target.name]: e.target.checked
            })
        }else{
            this.setState({
                [e.target.name]: e.target.value
            })
        }
    }

    onChangeFunctionById(e){
        this.setState({
            "checkbox": e
        })
    }
    async onClick(e){
        document.getElementById("loading").style.display = "block";
        await this.setState({
            "User_id": this.props.isLoggedIn.User_id,
            "Empresa": this.props.isLoggedIn.Empresa,
        })
        const {error, msg} = await postRegister(this.state, 'funcionario');
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
                        Cadastro de Funcionário!
                    </h2>
                </div>
                <Form className="row w-75 border-top pt-5">
                    <RegisterCol1 fields={ Funcionario }  name="funcionario" onChangeFunction={ this.onChangeFunction } ></RegisterCol1>
                    <RegisterAddFinanceiro onChangeFunction={ this.onChangeFunction } fields={this.state} name="financeiro" />
                    <RegisterAddContato onChangeFunction={ this.onChangeFunction } fields={this.state} title="Atendimento" name="atendimento" />
                    <RegisterAddContato onChangeFunction={ this.onChangeFunction } fields={this.state} title="Emergência" name="emergencia" />
                    <RegisterAddContato onChangeFunction={ this.onChangeFunction } fields={this.state} title="Referências Comerciais" name="comercial" />
                    <RegisterAddEndereco onChangeFunction={ this.onChangeFunction } fields={this.state} name="endereco_1" />
                    <RegisterAddIdioma onChangeFunction={ this.onChangeFunction } fields={this.state} type="funcionario" name="idioma" />
                    <RegisterAddBeneficio onChangeFunction={ this.onChangeFunction } fields={this.state} type="funcionario" name="beneficio" title="Beneficios" />
                    <RegisterAddContrato onChangeFunction={ this.onChangeFunction } fields={this.state} type="funcionario" name="contrato" title="Contrato" />
                    <RegisterAddInfoPessoal onChangeFunction={ this.onChangeFunction } fields={this.state} type="funcionario" name="contrato" title="Contrato" />
                </Form>
                <Button id="Inicio" variant="primary" type="submit" onClick={(element) => this.onClick(element)}>
                    Submit
                </Button> 
            </div>
        )
    }
}



const mapDispatchToProps = dispatch => ({
    handleNavbar: (e) => dispatch(NavbarActions.handleNavbar(e))
})

const mapStateToProps = state => ({
    isLoggedIn: state.loginReducer,
    navbars: state.navbarReducer.Navbars
  })

export default connect(mapStateToProps, mapDispatchToProps)(CadastrarFuncionario);