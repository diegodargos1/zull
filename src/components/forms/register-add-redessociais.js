import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form, ButtonToolbar, Button, Modal} from 'react-bootstrap';
import InputMask from 'react-input-mask';
  
class RegisterAddRedesSociais extends React.Component{
    constructor(props){
        super();
        this.state = {
            contador: 1,
            fields: [{id: 0}],
        }

        this.onChangeFunction = this.onChangeFunction.bind(this);
        this.onClickAdd = this.onClickAdd.bind(this);
    }

    componentWillMount(){
        for (let i = 0; i <= 5; i++) {
            this.setState({
                ["facebook"+'_'+this.props.name+'_'+i]: "",
                ["linkedin"+'_'+this.props.name+'_'+i]: "",
                ["instagram"+'_'+this.props.name+'_'+i]: "",
            }) 
        }
    }

    setLgShow(e = false, id){
        this.setState({
            lgShow: e,
            [id]: e
        })
    }

    onChangeFunction(e, validate = true){
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
                <Button variant="secondary" onClick={() => this.setLgShow(true, "redes")}> 
                    {this.props.title}
                </Button>
            </div>

        const modal = <Modal size="lg" show={this.state.redes} onHide={() => this.setLgShow(false, "redes")} 
        aria-labelledby="example-modal-sizes-title-lg">
            <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">
                {this.props.title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {this.state.fields.map((field) => 
                    <div className="col-12" key={"contatokey_"+field.id}>
                        <Form.Group className="row" controlId="addContato">
                        <div className="col-md-6">
                            <Form.Label>Facebook</Form.Label>        
                            <Form.Control type="text" 
                            name={"facebook"+'_'+this.props.name+'_'+field.id} 
                            value={this.state["facebook"+'_'+this.props.name+'_'+field.id]}
                            onChange={(e) => this.onChangeFunction(e)}
                            />
                        </div>
                        <div className="col-md-6">
                            <Form.Label>Instagram</Form.Label>        
                            <Form.Control type="email" name={"instagram"+'_'+this.props.name+'_'+field.id} 
                            value={this.state["instagram"+'_'+this.props.name+'_'+field.id]}
                            onChange={(e) => this.onChangeFunction(e)}
                            />
                        </div>
                        <div className="col-md-6">
                            <Form.Label>LinkedIn</Form.Label>        
                            <InputMask 
                            maskChar={null} 
                            onChange={(e) => this.onChangeFunction(e)}
                            value={this.state["linkedin"+'_'+this.props.name+'_'+field.id]} 
                            className="form-control"
                            name={"linkedin"+'_'+this.props.name+'_'+field.id}
                            type="text"
                            />
                        </div>        
                        </Form.Group>
                        <hr></hr>
                    </div>
                )}
                <Button variant="secondary" type="submit" onClick={(e) => this.onClickAdd()}>
                    Adicionar
                </Button>
                <Button className="float-right" variant="primary" type="submit" onClick={() => this.setLgShow(false, "redes")}>
                    Salvar
                </Button>  
            </Modal.Body>
        </Modal>
            
        return(
            <div className="row">
                <Form.Group className="col" controlId="addRedes0">
                    {items}
                </Form.Group>
                {modal}
            </div>
        );
    }
}

export default RegisterAddRedesSociais;