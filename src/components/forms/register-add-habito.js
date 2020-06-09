import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form, ButtonToolbar, Button, Modal} from 'react-bootstrap';
  
class RegisterAddHabito extends React.Component{
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

    render(){
        const items = <div className="col-md-12">
                <Button variant="secondary" onClick={() => this.setLgShow(true, "habitos")}> 
                    Hábitos e Costumes
                </Button>
            </div>
        
        const modal = <Modal size="lg" 
            show={this.state.habitos} onHide={() => this.setLgShow(false, "habitos")} 
            aria-labelledby="example-modal-sizes-title-lg">
            <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">
                Hábitos e Costumes
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="row" controlId="addContato">
                    <div className="col-md-12">
                        <Form.Label>Assento no avião de preferência.</Form.Label>        
                        <select 
                        name={"aviao"+'_'+this.props.name} 
                        className="form-control"
                        value={this.state["aviao"+'_'+this.props.name]}
                        onChange={(e) => this.onChangeFunction(e)}>
                            <option>Select</option>
                            <option value="Janela">Janela</option>
                            <option value="Corredor">Corredor</option>
                            <option value="Poltrona do Centro">Poltrona do Centro</option>
                        </select>
                    </div>
                    <div className="col-md-6">
                        <Form.Label>Bebida de preferência em refeições.</Form.Label>        
                        <select 
                        name={"bebidapreferencia"+'_'+this.props.name} 
                        className="form-control"
                        value={this.state["bebidapreferencia"+'_'+this.props.name]}
                        onChange={(e) => this.onChangeFunction(e)}>
                            <option>Select</option>
                            <option value="Alcoólicos">Alcoólicos</option>
                            <option value="Suco">Suco</option>
                            <option value="Água">Água</option>
                            <option value="Refrigerante">Refrigerante</option>
                            <option value="Chá">Chá</option>
                            <option value="Outro">Outro</option>
                        </select>
                    </div>
                    <div className="col-md-6">
                        <Form.Label>Se alcoólicos ou outros, quais:</Form.Label>        
                        <textarea
                            className="form-control" 
                            type="textarea" 
                            name={"bebidaoutro"+'_'+this.props.name}
                            value={this.state["bebidaoutro"+'_'+this.props.name]}
                            onChange={(e) => this.onChangeFunction(e)}/>
                    </div>
                    <div className="col-md-6">
                        <Form.Label>Alimentos de preferência.</Form.Label>        
                        <select 
                        name={"alimentopreferencia"+'_'+this.props.name} 
                        className="form-control"
                        value={this.state["alimentopreferencia"+'_'+this.props.name]}
                        onChange={(e) => this.onChangeFunction(e)}>
                            <option>Select</option>
                            <option value="Massa">Massa</option>
                            <option value="Peixe">Peixe</option>
                            <option value="Carne">Carne</option>
                            <option value="Frango">Frango</option>
                            <option value="Vegetariano">Vegetariano</option>
                        </select>
                    </div>
                    <div className="col-md-6">
                        <Form.Label>Algum alimento em especial que não goste, comente:</Form.Label>        
                        <textarea
                            className="form-control" 
                            type="textarea" 
                            name={"alimentonaogosta"+'_'+this.props.name}
                            value={this.state["alimentonaogosta"+'_'+this.props.name]}
                            onChange={(e) => this.onChangeFunction(e)}/>
                    </div>
                    <div className="col-md-6">
                        <Form.Label>Fumante:</Form.Label>        
                        <select 
                        name={"fumante"+'_'+this.props.name} 
                        className="form-control"
                        value={this.state["fumante"+'_'+this.props.name]}
                        onChange={(e) => this.onChangeFunction(e)}>
                            <option>Select</option>
                            <option value="Sim">Sim</option>
                            <option value="Não">Não</option>
                        </select>
                    </div>
                    <div className="col-md-12">
                        <Form.Label>Algum costume ou hábito que possua que gostaria de mencionar para melhor experiência em sua viagem e estadias:</Form.Label>        
                        <textarea
                            className="form-control" 
                            type="textarea" 
                            name={"habitos"+'_'+this.props.name}
                            value={this.state["habitos"+'_'+this.props.name]}
                            onChange={(e) => this.onChangeFunction(e)}/>
                    </div>
                </Form.Group>
                <Button className="float-right" variant="primary" type="submit" onClick={() => this.setLgShow(false, "habitos")}>
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

export default RegisterAddHabito;