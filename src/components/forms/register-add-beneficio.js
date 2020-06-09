import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form, Button, Modal} from 'react-bootstrap';
import InputMask from 'react-input-mask';
  
class RegisterAddBeneficio extends React.Component{
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
        <Form.Group className="row" controlId="addBeneficio">
            <div className="col-md-3">
                <Form.Label>Vale Transporte Valor</Form.Label>        
                <InputMask 
                    mask="" 
                    maskChar={null} 
                    onChange={(e) => this.onChangeFunction(e)}
                    value={(this.state.valetransporte) ? this.state.valetransporte : ""}
                    className="form-control"
                    name={"valetransporte"} 
                    type="text"
                    />
            </div>
            <div className="col-md-3">
                <Form.Label>Tipo Transporte</Form.Label>        
                <InputMask 
                    mask="" 
                    maskChar={null} 
                    onChange={(e) => this.onChangeFunction(e)}
                    value={(this.state.tipotransporte) ? this.state.tipotransporte : ""}
                    className="form-control"
                    name={"tipotransporte"} 
                    type="text"
                    />
            </div>
            <div className="col-md-6">
                <Form.Label>Valor desconto em folha para Vale Transporte</Form.Label>        
                <InputMask 
                    mask="" 
                    maskChar={null} 
                    onChange={(e) => this.onChangeFunction(e)}
                    value={(this.state.descontoFolhaTransporte) ? this.state.descontoFolhaTransporte : ""}
                    className="form-control"
                    name={"descontoFolhaTransporte"} 
                    type="text"
                    />
            </div>
            <div className="col-md-6">
                <Form.Label>Vale Refeicao Valor Diario</Form.Label>        
                <InputMask 
                    mask="" 
                    maskChar={null} 
                    onChange={(e) => this.onChangeFunction(e)}
                    value={(this.state.valerefeicaodiario) ? this.state.valerefeicaodiario : ""}
                    className="form-control"
                    name={"valerefeicaodiario"} 
                    type="text"
                    />
            </div>
            <div className="col-md-6">
                <Form.Label>Valor desconto em folha para Vale Refeicao</Form.Label>        
                <InputMask 
                    mask="" 
                    maskChar={null} 
                    onChange={(e) => this.onChangeFunction(e)}
                    value={(this.state.descontovalerefeicaodiario) ? this.state.descontovalerefeicaodiario : ""}
                    className="form-control"
                    name={"descontovalerefeicaodiario"} 
                    type="text"
                    />
            </div>
            <div className="col-md-6">
                <Form.Label>Valor Assistencia Medica</Form.Label>        
                <InputMask 
                    mask="" 
                    maskChar={null} 
                    onChange={(e) => this.onChangeFunction(e)}
                    value={(this.state.assistenciamedica) ? this.state.assistenciamedica : ""}
                    className="form-control"
                    name={"assistenciamedica"} 
                    type="text"
                    />
            </div>
            <div className="col-md-6">
                <Form.Label>Valor desconto em folha para Assistencia Medica</Form.Label>        
                <InputMask 
                    mask="" 
                    maskChar={null} 
                    onChange={(e) => this.onChangeFunction(e)}
                    value={(this.state.descontoassistenciamedica) ? this.state.descontoassistenciamedica : ""}
                    className="form-control"
                    name={"descontoassistenciamedica"} 
                    type="text"
                    />
            </div>
        </Form.Group>
        
        return item;
    }

    render(){
        const items = <div className="col-md-12">
                <Button variant="secondary" onClick={() => this.setLgShow(true, "beneficio")}> 
                 Beneficios
                </Button>
            </div>
        
        const modal = <Modal size="lg" 
            show={this.state.beneficio} onHide={() => this.setLgShow(false, "beneficio")} 
            aria-labelledby="example-modal-sizes-title-lg">
            <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">
                Beneficios
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="col-12">
                    {this.getFieldsType()}
                </div>
                <Button className="float-right" variant="primary" type="submit" onClick={() => this.setLgShow(false, "beneficio")}>
                    Salvar
                </Button>
            </Modal.Body>
            </Modal>

        return(

            <div className="row">
                <Form.Group className="col" controlId="addbeneficio">
                    {items}
                </Form.Group>
                {modal}
            </div>
        );
    }
}

export default RegisterAddBeneficio;