import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form, Button, Modal} from 'react-bootstrap';
import InputMask from 'react-input-mask';
import { listaPais } from '../../action/select-post';
  
class RegisterAddInfoPessoal extends React.Component{
    constructor(props){
        super();
        this.state = {
            Logged: true,
            lgShow: false,
            listapais: [],
        }

        this.onChangeFunction = this.onChangeFunction.bind(this);
    }

    async componentWillMount(){
        const listaPaisx = await listaPais();
        
        this.setState({
            listapais: listaPaisx,
        });
    }

    setLgShow(e = false, id){
        this.setState({
            lgShow: e,
            [id]: e
        })
    }

    onChangeFunction(e){
        this.setState({
            [e.target.name]: e.target.value
        })
        this.props.onChangeFunction(e);
    }

    getFieldsType(){
        let item = "";
        item = 
        <Form.Group className="row" controlId="addInfoPessoal">
            <div className="col-md-4">
                <Form.Label>Cidade de Nascimento</Form.Label>        
                <InputMask 
                    mask="" 
                    maskChar={null} 
                    onChange={(e) => this.onChangeFunction(e)}
                    value={(this.state.cidadenascimento) ? this.state.cidadenascimento : ""}
                    className="form-control"
                    name={"cidadenascimento"} 
                    type="text"
                    />
            </div>
            <div className="col-md-4">
                <Form.Label>Estado de Nascimento</Form.Label>        
                <InputMask 
                    mask="" 
                    maskChar={null} 
                    onChange={(e) => this.onChangeFunction(e)}
                    value={(this.state.estadonascimento) ? this.state.estadonascimento : ""}
                    className="form-control"
                    name={"estadonascimento"} 
                    type="text"
                    />
            </div>
            <div className="col-md-4">
                <Form.Label>Nacionalidade</Form.Label>        
                <select 
                        onChange={(e) => this.onChangeFunction(e)} 
                        className="form-control"
                        name={"nacionalidade"}>
                            <option>Select</option>
                            {this.state.listapais.map(opt => <option key={opt.value} value={opt.value}>{opt.name}</option>)}
                        </select>
            </div>
            <div className="col-md-4">
                <Form.Label>Data de Nascimento</Form.Label>        
                <InputMask 
                    mask="" 
                    maskChar={null} 
                    onChange={(e) => this.onChangeFunction(e)}
                    value={(this.state.datadenascimento) ? this.state.datadenascimento : ""}
                    className="form-control"
                    name={"datadenascimento"} 
                    type="date"
                    />
            </div>
            <div className="col-md-4">
                <Form.Label>Estado Civil</Form.Label>        
                <select 
                onChange={(e) => this.onChangeFunction(e)} 
                className="form-control"
                name={"estadocivil"}>
                    <option>Select</option>
                    <option value="Casado(a)">Casado(a)</option>
                    <option value="Solteiro(a)">Solteiro(a)</option>
                    <option value="Viuvo(a)">Viuvo(a)</option>
                    <option value="Divorciado(a)">Divorciado(a)</option>
                </select>
            </div>
        </Form.Group>
        
        return item;
    }

    render(){
        const items = <div className="col-md-12">
                <Button variant="secondary" onClick={() => this.setLgShow(true, "infopessoal")}> 
                 Informacoes Pessoais
                </Button>
            </div>
        
        const modal = <Modal size="lg" 
            show={this.state.infopessoal} onHide={() => this.setLgShow(false, "infopessoal")} 
            aria-labelledby="example-modal-sizes-title-lg">
            <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">
                Informacoes Pessoais
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="col-12">
                    {this.getFieldsType()}
                </div>
                <Button className="float-right" variant="primary" type="submit" onClick={() => this.setLgShow(false, "infopessoal")}>
                    Salvar
                </Button>
            </Modal.Body>
            </Modal>

        return(

            <div className="row">
                <Form.Group className="col" controlId="addInfoPessoal">
                    {items}
                </Form.Group>
                {modal}
            </div>
        );
    }
}

export default RegisterAddInfoPessoal;