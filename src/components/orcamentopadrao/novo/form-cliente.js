import React from 'react';
import { Form, Button } from 'react-bootstrap';
import FiedEdit from './field-edit';
import SearchBox from './search-box';
import ListaContatos from './cliente-lista-contato';
import {listaClienteTodos} from '../../../action/select-post';
import {postTempCliente} from '../../../action/register-post';

class FormCliente extends React.Component{
    constructor(props){
        super();
        this.state = {
            TipoOrcamento: props.tipo,
            existe: true,
            clientes: [],
            maskCnpj: "999.999.999-999",
            formCliente: true,
            listaContatos: "",
            edited: {
                User_id: props.user,
                Empresa: props.empresa
            }
        }
    }

    async componentWillMount(){
        const cliente = await listaClienteTodos()
        this.setState({
            clientes: cliente
        })
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

    handleSubmit = async (e) => {
        e.preventDefault();
        if(!this.state.edited.cnpj && !this.state.edited.nome)return false;
        const clienteCod = await postTempCliente(this.state.edited);
        if(!clienteCod.error){
            alert(clienteCod.msg)
            return false;
        }
        alert("Cliente salvo!")
        this.setState({
            formCliente: false
        });
        this.props.formCliente(clienteCod.cod);
    }

    handleSearchBar = async (e, contato = false) => {
        this.setState({
            formCliente: false,
        })
        this.props.formCliente(e.cod, contato);
    }

    handleListagemContatos = async(e) => {
       this.setState({
           listaContatos: await <ListaContatos cliente={e.cod} handleContato={this.handleSearchBar}/>
       })
    }

    handleChange = (e) => {
        this.setState({
            edited: {
                ...this.state.edited,
                [e.name]: e.value
            }
        })
    }
    render(){
        return (
            <Form onSubmit={this.handleSubmit} className="col-md-12" style={{display: (this.state.formCliente) ? "block" : "none"}}>
                <div className="col-md-12">
                    <Form.Label>Já é Cliente:</Form.Label>
                    <input 
                    style={{margin: 5}}
                    type="radio"
                    name="existe"
                    onClick={(e) => {this.setState({existe: true})} }
                    value={true}
                    defaultChecked
                    />
                    <label>Sim</label>
                    <input 
                    style={{margin: 5}}
                    type="radio" 
                    name="existe"
                    onClick={(e) => {this.setState({existe: false})} }
                    value={false}
                    />
                    <label >Não</label>
                </div>
                {(!this.state.existe) ? 
                    <div className="col-md-5" >
                        <FiedEdit 
                        title="Nome Fantasia:"
                        onChangeFunction={this.handleChange}
                        name="nome"
                        size="12"
                        />

                        <FiedEdit 
                        mask={this.state.maskCnpj}
                        title="Cnpj/Cpf:"
                        onChangeFunction={this.handleChange}
                        name="cnpj"
                        id="cnpj"
                        size="12"
                        />

                        <FiedEdit 
                        title="Solicitante:"
                        onChangeFunction={this.handleChange}
                        name="solicitante"
                        size="12"
                        />

                        <FiedEdit 
                        title="Telefone:"
                        onChangeFunction={this.handleChange}
                        name="telefone"
                        phone={true}
                        size="12"
                        />

                        <FiedEdit 
                        title="Email:"
                        onChangeFunction={this.handleChange}
                        name="email"
                        phone={true}
                        size="12"
                        />

                        <Button className="float-left ml-3 mt-2" variant="primary" type="submit">
                            Salvar Cliente
                        </Button>
                    </div> 
                    : 
                    <>
                    <SearchBox
                    title="Nome Fantasia ou COD Cliente:"
                    clientes={this.state.clientes}
                    handleSubmit={this.handleListagemContatos}
                     />
                     {this.state.listaContatos}
                    </>
                }
                
            </Form>
        );
    }
}

export default FormCliente;