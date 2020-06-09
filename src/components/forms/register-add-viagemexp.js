import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form, ButtonToolbar, Button, Modal} from 'react-bootstrap';
  
class RegisterAddExpViagem extends React.Component{
    constructor(props){
        super();
        this.state = {
            Logged: true,
            lgShow: false,
            contador: 1,
            fields: [{id: 0}],
        }

        this.onChangeFunction = this.onChangeFunction.bind(this);
        this.onClickAdd = this.onClickAdd.bind(this);
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

    onClickAdd(){
        let field = {id: this.state.contador};
        this.setState({
            contador: this.state.contador+1,
            fields: this.state.fields.concat(field)
        });
    }

    render(){
        const items = <div className="col-md-12">
                <Button variant="secondary" onClick={() => this.setLgShow(true, "viagemexp")}> 
                   Experiências de Viagens
                </Button>
            </div>
        
        const modal = <Modal size="lg" 
            show={this.state.viagemexp} onHide={() => this.setLgShow(false, "viagemexp")} 
            aria-labelledby="example-modal-sizes-title-lg">
            <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">
                Experiências de Viagens
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {this.state.fields.map((field) => 
                <React.Fragment key={field.id}>
                    <Form.Group className="row" controlId="addviagemexp">
                        <div className="col-md-12">
                        <Form.Label>Nacional ou Internacional.</Form.Label>        
                        <select 
                        name={"tipoviagem"+'_'+this.props.name+'_'+field.id} 
                        className="form-control"
                        value={this.state["tipoviagem"+'_'+this.props.name+'_'+field.id]}
                        onChange={(e) => this.onChangeFunction(e)}>
                            <option>Select</option>
                            <option value="Nacional">Nacional</option>
                            <option value="Internacional">Internacional</option>
                        </select>
                    </div>
                    <div className="col-md-6">
                        <Form.Label>Ano da Viagem</Form.Label>        
                        <Form.Control type="text" name={"anoviagem"+'_'+this.props.name+'_'+field.id} 
                        value={this.state["anoviagem"+'_'+this.props.name+'_'+field.id]}
                        onChange={(e) => this.onChangeFunction(e)}/>
                    </div>
                    <div className="col-md-6">
                        <Form.Label>Destino</Form.Label>        
                        <Form.Control type="text" name={"destino"+'_'+this.props.name+'_'+field.id} 
                        value={this.state["destino"+'_'+this.props.name+'_'+field.id]}
                        onChange={(e) => this.onChangeFunction(e)}/>
                    </div>
                    <div className="col-md-12">
                        <Form.Label>O que mais gostou</Form.Label>        
                        <textarea
                                className="form-control" 
                                type="textarea" 
                                name={"preferenciaviagem_"+this.props.name+'_'+field.id}
                                value={this.state["preferenciaviagem_"+this.props.name+'_'+field.id]}
                                onChange={(e) => this.onChangeFunction(e)}/>
                    </div>
                    </Form.Group>
                    <hr></hr>
                    </React.Fragment>
                )}
                <Button variant="secondary" type="submit" onClick={(e) => this.onClickAdd()}>
                    Adicionar
                </Button>
                <Button className="float-right" variant="primary" type="submit" onClick={() => this.setLgShow(false, "viagemexp")}>
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

export default RegisterAddExpViagem;