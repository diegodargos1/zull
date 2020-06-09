import React from 'react';
import { Form } from 'react-bootstrap';
import { listaPais, listaEstado } from '../../../action/select-post';

class ClienteDetalhe extends React.Component{
    constructor(props){
        super();
        this.state = {
            paises: [],
            estados: [],
            paisSelecionado: false,
            estadoSelecionado: false,
        }
    }

    async componentWillMount(){
        this.setState({
            paises: await listaPais(),
        })
        if(this.props.allData) await this.setPaisSelecionado();
    }

    setPaisSelecionado = async () => {
        let x;
        for (x in this.state.paises) {
            if(this.state.paises[x].name == this.props.allData.orcamento.Pais){
                this.setState({
                    paisSelecionado: this.state.paises[x].value,
                    estados: await listaEstado(this.state.paises[x].value)
                })
            }
        }
        this.setEstadoSelecionado();
    }

    setEstadoSelecionado = async () => {
        let x;
        for (x in this.state.estados) {
            if(this.state.estados[x].name == this.props.allData.orcamento.Estado){
                this.setState({
                    estadoSelecionado: this.state.estados[x].value,
                })
            }
        }
    }

    handlePais = async (e) =>{
        const text = e.target.options[e.target.selectedIndex].text;
        this.props.handleOrcamento({target: {value: text, name: e.target.name }});
        this.setState({
            estados: await listaEstado(e.target.value),
        })
    }
    
    render(){
        return (
            <div className="col-md-6 d-inline-block detalhes" style={{verticalAlign: "top", marginBottom: "5px"}}>
                <div className={"col-md-12"}>
                    <Form.Label><b>Nome Fantasia:</b></Form.Label>
                    <p>{this.props.data.Nome}</p>
                </div>
                <div className={"col-md-12"}>
                    <Form.Label><b>CNPJ/CPF:</b></Form.Label>
                    <p>{this.props.data.Cnpj}</p>
                </div>
                <div className={"col-md-12"}>
                    <Form.Label><b>Solicitante:</b></Form.Label>
                    <p>{(this.props.contato.nome) ? this.props.contato.nome : this.props.data.Solicitante}</p>
                </div>
                <div className={"col-md-12"}>
                    <Form.Label><b>Email:</b></Form.Label>
                    <p>{(this.props.contato.Email) ? this.props.contato.Email : ""}</p>
                </div>
                <div className={"col-md-12"}>
                    <Form.Label><b>Telefone:</b></Form.Label>
                    <a href={"tel:+55"+(this.props.contato.Telefone) ? this.props.contato.Telefone : this.props.data.Telefone}>
                        {(this.props.contato.Telefone) ? this.props.contato.Telefone : this.props.data.Telefone}
                        </a>
                </div>
                <div className={"col-md-12"}>
                    <Form.Label><b>País:</b></Form.Label>
                    {(this.state.paisSelecionado) ? 
                        <select className="form-control" 
                        name="paisEvento"
                        style={{width: "49%", display: "inline-block"}}
                        id="paisEvento"
                        value={this.state.paisSelecionado}
                        onChange={(e) => this.handlePais(e)}>
                            <option>Select</option>
                            {this.state.paises.map(pais => 
                                <option value={pais.value} key={pais.value}>{pais.name}</option>
                            )}
                        </select>
                        :
                        <select className="form-control" 
                        name="paisEvento"
                        style={{width: "49%", display: "inline-block"}}
                        id="paisEvento"
                        onChange={(e) => this.handlePais(e)}>
                            <option>Select</option>
                            {this.state.paises.map(pais => 
                                <option value={pais.value} key={pais.value}>{pais.name}</option>
                            )}
                        </select>
                    }
                </div>
                <div className={"col-md-12"}>
                    <Form.Label><b>Estado:</b></Form.Label>
                    {(this.state.estadoSelecionado) ? 
                        <select className="form-control" 
                        name="estadoEvento"
                        onChange={(e) => this.props.handleOrcamento(e)}
                        value={this.state.estadoSelecionado}
                        style={{width: "auto", display: "inline-block"}}>
                            <option>Select</option>
                            {this.state.estados.map(estado =>
                                <option value={estado.value} key={estado.value}>{estado.name}</option>
                                )}
                        </select>
                        :
                        <select className="form-control" 
                        name="estadoEvento"
                        onChange={(e) => this.props.handleOrcamento(e)}
                        style={{width: "auto", display: "inline-block"}}>
                            <option>Select</option>
                            {this.state.estados.map(estado =>
                                <option value={estado.value} key={estado.value}>{estado.name}</option>
                                )}
                        </select>
                    }
                </div>
            </div>
        );
    }
}

export default ClienteDetalhe;