import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form, ButtonToolbar, Button, Modal} from 'react-bootstrap';
import RegisterSelectProps from '../../components/forms/register-select-props';
import {Fluencia, TipoSanguineo, SimNao} from '../../components/fields/forms/select-opt';
  
class RegisterAddAdicional extends React.Component{
    constructor(props){
        super();
        this.state = {
            Logged: true,
            smShow: false, 
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

        if(this.props.type == "pessoafisica"){
            item = 
            <Form.Group className="row" controlId="addFinanceiro">
                <RegisterSelectProps fields={this.props.fields} title="Tipo Sangüineo" name="sangue" options={TipoSanguineo} onChangeFunction={ this.onChangeFunction }></RegisterSelectProps>
                <RegisterSelectProps fields={this.props.fields} title="Vegetariano" name="vegetariano" options={SimNao} onChangeFunction={ this.onChangeFunction }></RegisterSelectProps>
                <div className="col-md-6">
                    <label className="form-label" htmlFor="formBasic">Doença</label>
                    <input name="doenca" value={this.props.fields.doenca} type="email" id="formBasic" className="form-control" onChange={(e) => this.onChangeFunction(e)}></input>
                </div>
            </Form.Group>
        }
        
        return item;
    }

    render(){
        const items = <div className="col-md-12">
                <Button variant="secondary" onClick={() => this.setLgShow(true, "adicional")}> 
                    Informações Adicionais {this.props.title}
                </Button>
            </div>
        
        const modal = <Modal size="lg" 
            show={this.state.adicional} onHide={() => this.setLgShow(false, "adicional")} 
            aria-labelledby="example-modal-sizes-title-lg">
            <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">
                Informações Adicionais
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="col-12">
                    {this.getFieldsType()}
                </div>
                <Button className="float-right" variant="primary" type="submit" onClick={() => this.setLgShow(false, "adicional")}>
                    Add Informações
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

export default RegisterAddAdicional;