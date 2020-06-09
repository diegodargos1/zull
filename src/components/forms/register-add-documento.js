import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form, ButtonToolbar, Button, Modal} from 'react-bootstrap';
import {uploadFile} from '../../action/register-post';
  
class RegisterAddDocumento extends React.Component{
    constructor(props){
        super();
        this.state = {
            Logged: true,
            lgShow: false,
        }

        this.onChangeFunction = this.onChangeFunction.bind(this);
        this.onChangeFile = this.onChangeFile.bind(this);
        this.submitFile = this.submitFile.bind(this);
    }

    setLgShow(e = false, id){
        this.setState({
            lgShow: e,
            [id]: e
        })
    }

    async submitFile(e){
        let res = await uploadFile(this.state[e]);
        if(!res.data.error){
            this.setState({
                [e]: res.data.filename,
            });
            this.props.onChangeFunction({target: {name: e, value: res.data.filename}});
            alert("Imagem Salva.");
        }else{
            alert(res.data.message);
        }

    }

    onChangeFile(e){
        this.setState({
            [e.target.name]: e.target.files[0],
        })
    }

    onChangeFunction(e){
        this.setState({
            [e.target.name]: e.target.value
        })
        this.props.onChangeFunction(e);
    }

    render(){
        const items = <div className="col-md-12">
                <Button variant="secondary" onClick={() => this.setLgShow(true, "documento")}> 
                   Documentos
                </Button>
            </div>
        
        const modal = <Modal size="lg" 
            show={this.state.documento} onHide={() => this.setLgShow(false, "documento")} 
            aria-labelledby="example-modal-sizes-title-lg">
            <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">
                Documentos
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="row" controlId="addDocumentos">
                    <div className="col-md-6">
                        <Form.Label>Número Passaporte.</Form.Label>        
                        <Form.Control 
                            type="text" 
                            name={"passaporte"+'_'+this.props.name} 
                            value={this.state["passaporte"+'_'+this.props.name]}
                            onChange={(e) => this.onChangeFunction(e)}/>
                    </div>
                    <div className="col-md-6">
                        <Form.Label>Validade Passaporte.</Form.Label>        
                        <Form.Control 
                            type="date" 
                            name={"validadepassaporte"+'_'+this.props.name} 
                            value={this.state["validadepassaporte"+'_'+this.props.name]}
                            onChange={(e) => this.onChangeFunction(e)}/>
                    </div>
                    <div className="col-md-6">
                        <Form.Label>Visto Americano.</Form.Label>        
                        <select 
                        name={"vistoamericano"+'_'+this.props.name} 
                        className="form-control"
                        value={this.state["vistoamericano"+'_'+this.props.name]}
                        onChange={(e) => this.onChangeFunction(e)}>
                            <option>Select</option>
                            <option value="Sim">Sim</option>
                            <option value="Não">Não</option>
                        </select>
                    </div>
                    <div className="col-md-6">
                        <Form.Label>Validade Visto Americano.</Form.Label>        
                        <Form.Control 
                            type="date" 
                            name={"validadevistoamericano"+'_'+this.props.name} 
                            value={this.state["validadevistoamericano"+'_'+this.props.name]}
                            onChange={(e) => this.onChangeFunction(e)}/>
                    </div>
                    <div className="col-md-6">
                        <Form.Label>Outros vistos:</Form.Label>        
                        <Form.Control 
                            type="text" 
                            name={"outrosvistos"+'_'+this.props.name} 
                            value={this.state["outrosvistos"+'_'+this.props.name]}
                            onChange={(e) => this.onChangeFunction(e)}/>
                    </div>
                    <div className="col-md-12">
                        <Form.Label className="col-md-12">Cópia Passaporte:</Form.Label>        
                        <Form.Control 
                            type="file"
                            className="d-inline col-md-6"
                            name={"copiapassaporte"+'_'+this.props.name} 
                            onChange={(e) => this.onChangeFile(e)}/>
                            <Button className="float-right" id="" variant="primary" type="submit" onClick={(e) => this.submitFile("copiapassaporte"+'_'+this.props.name)}>
                                Submit
                            </Button>
                    </div>
                    <div className="col-md-12">
                        <Form.Label className="col-md-12">Cópia Rg:</Form.Label>        
                        <Form.Control 
                            type="file"
                            className="d-inline col-md-6"
                            name={"copiarg"+'_'+this.props.name} 
                            onChange={(e) => this.onChangeFile(e)}/>
                            <Button className="float-right" id="" variant="primary" type="submit" onClick={(e) => this.submitFile("copiarg"+'_'+this.props.name)}>
                                Submit
                            </Button>
                    </div>
                    <div className="col-md-12">
                        <Form.Label className="col-md-12">Cópia CPF:</Form.Label>        
                        <Form.Control 
                            type="file"
                            className="d-inline col-md-6"
                            name={"copiacpf"+'_'+this.props.name} 
                            onChange={(e) => this.onChangeFile(e)}/>
                            <Button className="float-right" id="" variant="primary" type="submit" onClick={(e) => this.submitFile("copiacpf"+'_'+this.props.name)}>
                                Submit
                            </Button>
                    </div>
                    <div className="col-md-12">
                        <Form.Label className="col-md-12">Cópia Comprovante de Endereço:</Form.Label>        
                        <Form.Control 
                            type="file"
                            className="d-inline col-md-6"
                            name={"copiaend"+'_'+this.props.name} 
                            onChange={(e) => this.onChangeFile(e)}/>
                            <Button className="float-right" id="" variant="primary" type="submit" onClick={(e) => this.submitFile("copiaend"+'_'+this.props.name)}>
                                Submit
                            </Button>
                    </div>
                    <div className="col-md-12">
                        <Form.Label className="col-md-12">Cópia Visto:</Form.Label>        
                        <Form.Control 
                            type="file"
                            className="d-inline col-md-6"
                            name={"copiavisto"+'_'+this.props.name} 
                            onChange={(e) => this.onChangeFile(e)}/>
                            <Button className="float-right" id="" variant="primary" type="submit" onClick={(e) => this.submitFile("copiavisto"+'_'+this.props.name)}>
                                Submit
                            </Button>
                    </div>
                    
                   
                </Form.Group>
                <Button className="float-right" variant="primary" type="submit" onClick={() => this.setLgShow(false, "documento")}>
                    Salvar
                </Button>
            </Modal.Body>
            </Modal>

        return(

            <div className="row">
                <Form.Group className="col" controlId="addInfo">
                    {items}
                </Form.Group>
                {modal}
            </div>
        );
    }
}

export default RegisterAddDocumento;