import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form, ButtonToolbar, Button, Modal} from 'react-bootstrap';
import RegisterSelectProps from '../../components/forms/register-select-props';
import {Fluencia} from '../../components/fields/forms/select-opt';
  
class RegisterAddIdioma extends React.Component{
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
        item = 
        <Form.Group className="row" controlId="addIdioma">
            <RegisterSelectProps fields={this.props.fields} title="Nível Inglês" name="ingles" options={Fluencia} onChangeFunction={ this.onChangeFunction }></RegisterSelectProps>
            <RegisterSelectProps fields={this.props.fields} title="Nível Espanhol" name="espanhol" options={Fluencia} onChangeFunction={ this.onChangeFunction }></RegisterSelectProps>
            <div className="col-md-3">
                <label className="form-label" htmlFor="formBasic">Outro Idioma</label>
                <input name="outroidioma" value={this.props.fields.outroidioma} 
                type="text" id="formBasic" 
                className="form-control" 
                onChange={(e) => this.onChangeFunction(e)}></input>
            </div>
            <RegisterSelectProps fields={this.props.fields} title="Nível Outro Idioma" name="outroidiomanivel" options={Fluencia} onChangeFunction={ this.onChangeFunction }></RegisterSelectProps>     
            <div className="col-md-6">
                <label className="form-label" htmlFor="formBasic">Escolaridade</label>
                <input name="escolaridade" value={this.props.fields.escolaridade} 
                type="text" id="formBasic" 
                className="form-control" 
                onChange={(e) => this.onChangeFunction(e)}></input>
            </div>
        </Form.Group>
        
        return item;
    }

    render(){
        const items = <div className="col-md-12">
                <Button variant="secondary" onClick={() => this.setLgShow(true, "idioma")}> 
                 Nível Conhecimento
                </Button>
            </div>
        
        const modal = <Modal size="lg" 
            show={this.state.idioma} onHide={() => this.setLgShow(false, "idioma")} 
            aria-labelledby="example-modal-sizes-title-lg">
            <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">
                Nível Conhecimento
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="col-12">
                    {this.getFieldsType()}
                </div>
                <Button className="float-right" variant="primary" type="submit" onClick={() => this.setLgShow(false, "idioma")}>
                    Salvar
                </Button>
            </Modal.Body>
            </Modal>

        return(

            <div className="row">
                <Form.Group className="col" controlId="addIdioma">
                    {items}
                </Form.Group>
                {modal}
            </div>
        );
    }
}

export default RegisterAddIdioma;