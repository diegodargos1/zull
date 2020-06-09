import React from 'react';
import { Form, Button } from 'react-bootstrap';
import {listaContatoCliente} from '../../../action/select-post';
import {postTempContato} from '../../../action/register-post';


class ListaContatos extends React.Component{
    constructor(props){
        super();
        this.state = {
            listaDeContatos: [],
            displayContato: false,
            cliente: props.cliente,
            empresa: localStorage.getItem('empresa'),
            user: localStorage.getItem('user'),
        }
    }

    async componentWillMount(){
        this.setState({
            listaDeContatos: await listaContatoCliente(this.props.cliente)
        });
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

    handleAddContato = () => {
        this.setState({
            displayContato: !this.state.displayContato,
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        document.getElementById("loading").style.display = "block";
        const contato = await postTempContato(this.state);
        if(!contato.error){
            alert(contato.msg);
            return false;
        }
        document.getElementById("loading").style.display = "none";
        this.props.handleContato({cod: this.props.cliente}, contato.contato);
    }

    render(){
        return (
            <div className="col-md-6 d-inline-block detalhes" style={{marginTop: "10px"}}>
                {this.state.listaDeContatos.map((lista, i) => 
                    (lista.nome != '')?
                    <div className={"col-md-12"} key={i}>
                        <Form.Label>Contato:</Form.Label>
                        <a href="#" 
                            onClick={() => this.props.handleContato({cod: this.props.cliente}, lista)}>
                            {lista.nome+' '+lista.Telefone}
                        </a>
                    </div>
                    : ""
                )}
                <Button  variant="primary" onClick={this.handleAddContato} className={(this.state.displayContato) ? "d-none" : "d-block"}>
                    Adicionar Contato
                </Button>
                <div className={(this.state.displayContato) ? "d-block" : "d-none"}>
                    <Form.Label>Nome:</Form.Label>
                    <input 
                    type="text"
                    className="d-inline-block form-control col-md-6 "
                    name="novoContato"
                    onChange={this.handleChange}
                    />
                    <Form.Label>Email:</Form.Label>
                    <input 
                    type="email"
                    className="form-control col-md-6"
                    name="novoEmailContato"
                    onChange={this.handleChange}
                    />
                    <Form.Label>Telefone:</Form.Label>
                    <input 
                    type="text"
                    className="form-control col-md-6"
                    name="novoTelContato"
                    onChange={this.handleChange}
                    />
                    <Button variant="primary" className="mt-2" onClick={this.handleSubmit}>
                        Salvar Contato
                    </Button>
                </div>
            </div>
        );
    }
}

export default ListaContatos;