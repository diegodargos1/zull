import React from 'react';
import { Form, Button } from 'react-bootstrap';
import RegisterSelect from '../../forms/register-select-post';
import FieldEdit from '../field-edit';
import Contato from '../contato';
import Endereco from '../endereco';
import Financeiro from '../financeiro';
import Saude from '../saude';
import Documento from '../documento';
import Escolaridade from '../escolaridade';
import Viagem from '../viagem';
import Habito from '../habito';
import {updateRegister} from '../../../action/register-post';
import "../style.css";

class DetalheEdit extends React.Component{
    constructor(props){
        super();
        this.state = {
            maskCnpj: "999.999.999-99",
            bancos: [],
            components: FieldEdit,
            edit: true,
            edited: "",
            prev: props.cliente,
            User_id: localStorage.getItem('user'),
            Empresa: localStorage.getItem('empresa'),
            
        }

        this.onChangeFunction = this.onChangeFunction.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    async componentWillMount(){
        if(this.props.cliente.TipoCliente === "Pessoa Juridica"){
            this.setState({
                maskCnpj: "99.999.999/0009-99",
            })
        }
    }

    componentDidMount(){
        let emails = document.querySelectorAll("input[type=email]");
        for(let k = 0; k < emails.length ; k++){
            emails[k].addEventListener('blur', function(){
                if(emails[k].value != ""){
                    if(!(/\S+@\S+\.\S+/.test(emails[k].value))){
                        alert('Email inválido.');
                        emails[k].value = "";
                    }
                }
            })
        }
    }

    onChangeFunction(e){
        let name;
        let value;
        if(e.target){
            name = e.target.name
            value = e.target.value
        }else{
            name = e.name
            value = e.value
        }
        this.setState({
            edited:{
                ...this.state.edited,
                [name]: value
            }
            
        })
    }

    async handleClick(){
       
        document.getElementById("loading").style.display = "block";
        const {error, msg} = await updateRegister(this.state, 'cliente');
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
        const Component = this.state.components;
        return (
            <>
            <Form.Group className="row detalhes" controlId="formBasic">
                    <Component 
                    title="Nome"
                    onChangeFunction={this.onChangeFunction}
                    name="nome"
                    size="5"
                    value={(this.props.cliente.Nome) ? this.props.cliente.Nome : "" }
                    />

                    <Component 
                    mask={this.state.maskCnpj} 
                    title="Cnpj/Cpf"
                    onChangeFunction={this.onChangeFunction}
                    name="cnpj"
                    size="5"
                    value={(this.props.cliente.Cnpj) ? this.props.cliente.Cnpj : "" }
                    />

                    <Component 
                    title="Telefone"
                    onChangeFunction={this.onChangeFunction}
                    name="telefone"
                    size="5"
                    phone={true}
                    value={(this.props.cliente.Telefone) ? this.props.cliente.Telefone : "" }
                    />

                    <Component 
                    title="Celular"
                    onChangeFunction={this.onChangeFunction}
                    name="celular"
                    size="5"
                    phone={true}
                    value={(this.props.cliente.Celular) ? this.props.cliente.Celular : "" }
                    />

                {(this.props.cliente.TipoCliente === "Pessoa Juridica") ? 
                    <> 
                    <Component 
                    title="Ramo de Atividade"
                    onChangeFunction={this.onChangeFunction}
                    name="ramoatividade"
                    type="text"
                    size="5"
                    value={(this.props.cliente.RamoAtividade) ? this.props.cliente.RamoAtividade : "" }
                    />
                    <Component 
                    title="Grupo"
                    onChangeFunction={this.onChangeFunction}
                    name="grupo"
                    size="5"
                    type="select"
                    grupo={true}
                    value={(this.props.cliente.FK_Grupo) ? this.props.cliente.FK_Grupo : "" }
                    />
                    <Component 
                    title="Razão Social"
                    onChangeFunction={this.onChangeFunction}
                    name="razaosocial"
                    type="text"
                    size="5"
                    value={(this.props.cliente.RazaoSocial) ? this.props.cliente.RazaoSocial : "" }
                    />
                    
                    <Component 
                    title="Inscrição Estadual"
                    onChangeFunction={this.onChangeFunction}
                    name="inscricaoestadual"
                    size="5"
                    value={(this.props.cliente.InscricaoEstadual) ? this.props.cliente.InscricaoEstadual : "" }
                    /> 
                    <Component 
                    title="Telefone PABX"
                    onChangeFunction={this.onChangeFunction}
                    name="telefone"
                    size="5"
                    value={(this.props.cliente.Telefone) ? this.props.cliente.Telefone : "" }
                    /> 
                    <Component 
                    title="Regra Faturamento"
                    onChangeFunction={this.onChangeFunction}
                    name="regrafaturamento"
                    size="5"
                    value={(this.props.cliente.RegraFaturamento) ? this.props.cliente.RegraFaturamento : "" }
                    />
                    </>
                    : ""}

                {(this.props.cliente.TipoCliente === "Pessoa Fisica") ? 
                    <> 
                    <Component 
                    mask="99.999.999-9"
                    title="Rg"
                    onChangeFunction={this.onChangeFunction}
                    name="rg"
                    size="5"
                    value={(this.props.cliente.Rg) ? this.props.cliente.Rg : "" }
                    />
                    <Component 
                    title="Data de Nascimento"
                    onChangeFunction={this.onChangeFunction}
                    name="datanascimento"
                    type="date"
                    size="5"
                    value={(this.props.cliente.DataNascimento) ? this.props.cliente.DataNascimento : "" }
                    />
                    <Component 
                    title="Email"
                    onChangeFunction={this.onChangeFunction}
                    name="clienteEmail"
                    type="email"
                    size="5"
                    value={(this.props.cliente.Email) ? this.props.cliente.Email : "" }
                    />
                    <Component 
                    title="Profissão"
                    onChangeFunction={this.onChangeFunction}
                    name="profissao"
                    size="5"
                    value={this.props.cliente.escolaridade[0].Profissao}
                    /> </>
                    : ""}

                    <RegisterSelect fields="forma-pagamento" 
                    value={(this.props.cliente.FK_FormaPagamento) ? this.props.cliente.FK_FormaPagamento : "" }
                    title="Forma de Pagamento" 
                    name="formapagamento"
                    size="5"
                    onChangeFunction={ this.onChangeFunction }></RegisterSelect>

                    <div className="col-md-12">
                        <Contato 
                        edit={this.state.edit}
                        fields={this.props.cliente.contato} 
                        validation={true}
                        onChangeFunction={this.onChangeFunction}
                        />
                    </div>
                    <div className="col-md-12">
                        <Endereco 
                        edit={this.state.edit}
                        fields={this.props.cliente.endereco} 
                        validation={true}
                        onChangeFunction={this.onChangeFunction}
                        />
                    </div>
                    <div className="col-md-12">
                        <Financeiro 
                        edit={this.state.edit}
                        fields={this.props.cliente.financeiro} 
                        validation={true}
                        bancos={this.state.bancos}
                        onChangeFunction={this.onChangeFunction}
                        />
                    </div>
                    {(this.props.cliente.TipoCliente === "Pessoa Fisica") ? 
                    <>
                    <div className="col-md-12">
                        <Documento 
                        edit={this.state.edit}
                        fields={this.props.cliente.documento} 
                        validation={true}
                        onChangeFunction={this.onChangeFunction}
                        />
                    </div>
                    <div className="col-md-12">
                        <Saude 
                        edit={this.state.edit}
                        fields={this.props.cliente.saude} 
                        validation={true}
                        onChangeFunction={this.onChangeFunction}
                        />
                    </div>
                    <div className="col-md-12">
                        <Escolaridade 
                        edit={this.state.edit}
                        fields={this.props.cliente.escolaridade} 
                        validation={true}
                        onChangeFunction={this.onChangeFunction}
                        />
                    </div>
                    <div className="col-md-12">
                        <Habito 
                        edit={this.state.edit}
                        fields={this.props.cliente.habito} 
                        validation={true}
                        onChangeFunction={this.onChangeFunction}
                        />
                    </div>
                    <div className="col-md-12">
                        <Viagem 
                        edit={this.state.edit}
                        fields={this.props.cliente.viagem} 
                        validation={true}
                        onChangeFunction={this.onChangeFunction}
                        />
                    </div>
                    </>:""}
            </Form.Group>
            <Button className="float-right" variant="primary" type="submit" onClick={this.handleClick}>
                Salvar Alteracoes
            </Button>
            </>
        )
        
    }
}

export default DetalheEdit;