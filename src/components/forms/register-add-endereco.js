import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form, ButtonToolbar, Button, Modal} from 'react-bootstrap';
import axios from 'axios';
import InputMask from 'react-input-mask';

class RegisterAddEndereco extends React.Component{
    constructor(props){
        super();
        this.state = {
            Logged: true,
            smShow: false, 
            lgShow: false,
            contador: 1,
            fields: [{id: 0}],
            generalName: props.name
        }
        
        this.onChangeFunction = this.onChangeFunction.bind(this);
        this.onClickAdd = this.onClickAdd.bind(this);
        this.getCep = this.getCep.bind(this);
    }

    componentWillMount(){
        for (let i = 0; i <= 5; i++) {
            this.setState({
                ["rua"+'_'+this.props.name+'_'+i]: "",
                ["complemento"+'_'+this.props.name+'_'+i]: "",
                ["bairro"+'_'+this.props.name+'_'+i]: "",
                ["cidade"+'_'+this.props.name+'_'+i]: "",
                ["estado"+'_'+this.props.name+'_'+i]: "",
                ["pais"+'_'+this.props.name+'_'+i]: "",
                ["cep"+'_'+this.props.name+'_'+i]: "",
            }) 
        }
    }
    
    setLgShow(e = false, id){
        this.setState({
            lgShow: e,
            [id]: e
        })
    }
    
    getCep(e = false, callback){ 
        this.onChangeFunction(e);
        let cep = e.target.value;
        cep = cep.replace('-','');
        let id = e.target.name.split("_");
        let name = this.state.generalName;
        id = id[3];
        if(cep.length == 8){
            axios({
                method: 'get',
                url: 'https://api.pagar.me/1/zipcodes/'+cep,
                }).then(function(response){
                    document.getElementsByName("rua"+'_'+name+'_'+id)[0].value = response.data.street;
                    document.getElementsByName("bairro"+'_'+name+'_'+id)[0].value = response.data.neighborhood;
                    document.getElementsByName("cidade"+'_'+name+'_'+id)[0].value = response.data.city;
                    document.getElementsByName("estado"+'_'+name+'_'+id)[0].value = response.data.state;

                    callback({target:{name: "rua"+'_'+name+'_'+id, value: response.data.street}});
                    callback({target:{name: "bairro"+'_'+name+'_'+id, value: response.data.neighborhood}});
                    callback({target:{name: "cidade"+'_'+name+'_'+id, value: response.data.city}});
                    callback({target:{name: "estado"+'_'+name+'_'+id, value: response.data.state}});

                }).catch(function(error){});
        }
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
                <Button variant="secondary" onClick={() => this.setLgShow(true, "endereco")}> 
                    Endereço {this.props.title}
                </Button>
            </div>

        const modal = <Modal size="lg" show={this.state.endereco} onHide={() => this.setLgShow(false, "endereco")} 
        aria-labelledby="example-modal-sizes-title-lg">
            <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">
                Add Endereço {this.props.title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            {this.state.fields.map((field) => 
                <div className="col-12" key={field.id}>
                    <Form.Group className="row" controlId="addEndereco">
                    <div className="col-md-6">
                        <Form.Label>CEP</Form.Label>
                        <InputMask 
                        mask="99999-999" 
                        maskChar={null} 
                        onChange={(e) => this.getCep(e, this.onChangeFunction)}
                        className="form-control"
                        value={this.state["cep"+'_'+this.props.name+'_'+field.id]}
                        name={"cep"+'_'+this.props.name+'_'+field.id}
                        type={field.type}
                        />
                    </div>
                    <div className="col-md-6">
                        <Form.Label>Rua</Form.Label>        
                        <Form.Control type="text" name={"rua"+'_'+this.props.name+'_'+field.id} 
                        value={this.state["rua"+'_'+this.props.name+'_'+field.id]}
                        onChange={(e) => this.onChangeFunction(e)}
                        />
                    </div>
                    <div className="col-md-6">
                        <Form.Label>Número</Form.Label>        
                        <Form.Control type="text" name={"numero"+'_'+this.props.name+'_'+field.id} 
                        value={this.state["numero"+'_'+this.props.name+'_'+field.id]}
                        onChange={(e) => this.onChangeFunction(e)}
                        />
                    </div>
                    <div className="col-md-6">
                        <Form.Label>Complemento</Form.Label>        
                        <Form.Control type="text" name={"complemento"+'_'+this.props.name+'_'+field.id} 
                        value={this.state["complemento"+'_'+this.props.name+'_'+field.id]}
                        onChange={(e) => this.onChangeFunction(e)}
                        />
                    </div>
                    <div className="col-md-6">
                        <Form.Label>Bairro</Form.Label>        
                        <Form.Control type="text" name={"bairro"+'_'+this.props.name+'_'+field.id}
                        value={this.state["bairro"+'_'+this.props.name+'_'+field.id]}
                        onChange={(e) => this.onChangeFunction(e)}
                        />
                    </div>
                    <div className="col-md-6">
                        <Form.Label>Cidade</Form.Label>        
                        <Form.Control type="text" name={"cidade"+'_'+this.props.name+'_'+field.id}
                        value={this.state["cidade"+'_'+this.props.name+'_'+field.id]}
                        onChange={(e) => this.onChangeFunction(e)}
                        
                        />
                    </div>
                    <div className="col-md-6">
                        <Form.Label>Estado</Form.Label>        
                        <Form.Control type="text" name={"estado"+'_'+this.props.name+'_'+field.id}
                        value={this.state["estado"+'_'+this.props.name+'_'+field.id]}
                        onChange={(e) => this.onChangeFunction(e)}
                        
                        />
                    </div>
                    <div className="col-md-6">
                        <Form.Label>País</Form.Label>        
                        <Form.Control type="text" name={"pais"+'_'+this.props.name+'_'+field.id}
                        value={this.state["pais"+'_'+this.props.name+'_'+field.id]}
                        onChange={(e) => this.onChangeFunction(e)}
                        
                        />
                    </div>
                    </Form.Group>
                    <hr></hr>
                </div> 
            )}
            <Button variant="secondary" type="submit" onClick={(e) => this.onClickAdd()}>
                    Adicionar
                </Button>
                <Button className="float-right" variant="primary" type="submit" onClick={() => this.setLgShow(false, "endereco")}>
                    Salvar
                </Button>  
            </Modal.Body>
        </Modal>
            
        return(
            <div className="row">
                <Form.Group className="col" controlId="addEndereco0">
                    {items}
                </Form.Group>
                {modal}
            </div>
        );
    }
}

export default RegisterAddEndereco;