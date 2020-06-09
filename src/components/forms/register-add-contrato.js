import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form, Button, Modal} from 'react-bootstrap';
import InputMask from 'react-input-mask';
  
class RegisterAddContrato extends React.Component{
    constructor(props){
        super();
        this.state = {
            Logged: true,
            lgShow: false,
        }

        this.onChangeFunction = this.onChangeFunction.bind(this);
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
        <Form.Group className="row" controlId="addcontrato">
            <div className="col-md-4">
                <Form.Label>Data Admissao</Form.Label>        
                <InputMask 
                    mask="" 
                    maskChar={null} 
                    onChange={(e) => this.onChangeFunction(e)}
                    value={(this.state.dataadmissao) ? this.state.dataadmissao : ""}
                    className="form-control"
                    name={"dataadmissao"} 
                    type="date"
                    />
            </div>
            <div className="col-md-4">
                <Form.Label>Funcao</Form.Label>        
                <InputMask 
                    mask="" 
                    maskChar={null} 
                    onChange={(e) => this.onChangeFunction(e)}
                    value={(this.state.funcao) ? this.state.funcao : ""}
                    className="form-control"
                    name={"funcao"} 
                    type="text"
                    />
            </div>
            <div className="col-md-4">
                <Form.Label>Salario</Form.Label>        
                <InputMask 
                    mask="" 
                    maskChar={null} 
                    onChange={(e) => this.onChangeFunction(e)}
                    value={(this.state.salario) ? this.state.salario : ""}
                    className="form-control"
                    name={"salario"} 
                    type="text"
                    />
            </div>
            <div className="col-md-4">
                <Form.Label>Hora de Entrada</Form.Label>        
                <InputMask 
                    mask="99:99" 
                    maskChar={null} 
                    onChange={(e) => this.onChangeFunction(e)}
                    value={(this.state.hrentrada) ? this.state.hrentrada : ""}
                    className="form-control"
                    name={"hrentrada"} 
                    type="text"
                    />
            </div>
            <div className="col-md-4">
                <Form.Label>Hora de Saida</Form.Label>        
                <InputMask 
                    mask="99:99" 
                    maskChar={null} 
                    onChange={(e) => this.onChangeFunction(e)}
                    value={(this.state.hrsaida) ? this.state.hrsaida : ""}
                    className="form-control"
                    name={"hrsaida"} 
                    type="text"
                    />
            </div>
            <div className="col-md-4">
                <Form.Label>Intervalo</Form.Label>        
                <InputMask 
                    mask="99:99" 
                    maskChar={null} 
                    onChange={(e) => this.onChangeFunction(e)}
                    value={(this.state.intervalo) ? this.state.intervalo : ""}
                    className="form-control"
                    name={"intervalo"} 
                    type="text"
                    />
            </div>
        </Form.Group>
        
        return item;
    }

    render(){
        const items = <div className="col-md-12">
                <Button variant="secondary" onClick={() => this.setLgShow(true, "contrato")}> 
                 Contrato
                </Button>
            </div>
        
        const modal = <Modal size="lg" 
            show={this.state.contrato} onHide={() => this.setLgShow(false, "contrato")} 
            aria-labelledby="example-modal-sizes-title-lg">
            <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">
                contratos
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="col-12">
                    {this.getFieldsType()}
                </div>
                <Button className="float-right" variant="primary" type="submit" onClick={() => this.setLgShow(false, "contrato")}>
                    Salvar
                </Button>
            </Modal.Body>
            </Modal>

        return(

            <div className="row">
                <Form.Group className="col" controlId="addcontrato">
                    {items}
                </Form.Group>
                {modal}
            </div>
        );
    }
}

export default RegisterAddContrato;