import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form, ButtonToolbar, Button, Modal} from 'react-bootstrap';
import { TipoSanguineo } from '../../components/fields/forms/select-opt';
import RegisterSelectProps from '../../components/forms/register-select-props';
import InputMask from 'react-input-mask';
  
class RegisterAddContato extends React.Component{
    constructor(props){
        super();
        this.state = {
            Logged: true,
            smShow: false, 
            lgShow: false,
            contador: 1,
            fields: [{id: 0}],
            comercial: false,
            emergencia: false,
        }

        this.onChangeFunction = this.onChangeFunction.bind(this);
        this.onClickAdd = this.onClickAdd.bind(this);
        this.onBlurEmail = this.onBlurEmail.bind(this);
    }

    componentWillMount(){
        for (let i = 0; i <= 5; i++) {
            this.setState({
                ["nomecontato"+'_'+this.props.name+'_'+i]: "",
                ["email"+'_'+this.props.name+'_'+i]: "",
                ["ramal"+'_'+this.props.name+'_'+i]: "",
                ["telefonecontato"+'_'+this.props.name+'_'+i]: "",
                ["celularcontato"+'_'+this.props.name+'_'+i]: "",
                ["obs"+'_'+this.props.name+'_'+i]: "",
            }) 
        }

        if(this.props.name === "comercial"){
            this.setState({
                comercial: true,
            })
        }else if(this.props.name === "emergencia"){
            this.setState({
                emergencia: true,
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
        if(!validate){
            this.setState({
                [e.target.name]: ''
            })

            e = {target: {name: e.target.name, value: ''}}
        }else{
            this.setState({
                [e.target.name]: e.target.value
            })
        }
        this.props.onChangeFunction(e);
    }

    onClickAdd(){
        let field = {id: this.state.contador};
        this.setState({
            contador: this.state.contador+1,
            fields: this.state.fields.concat(field)
        });
    }

    onBlurEmail(e){
        const email = e.target.value;
        if(email != ""){
            if(!(/\S+@\S+\.\S+/.test(email))){
                alert('Email inválido.');
                this.onChangeFunction(e, false)
            }
        }
    }

    render(){
        const items = <div className="col-md-12">
                <Button variant="secondary" onClick={() => this.setLgShow(true, "contato")}> 
                    {this.props.title}
                </Button>
            </div>

        const modal = <Modal size="lg" show={this.state.contato} onHide={() => this.setLgShow(false, "contato")} 
        aria-labelledby="example-modal-sizes-title-lg">
            <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">
                Add Contatos {this.props.title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {this.state.fields.map((field) => 
                    <div className="col-12" key={"contatokey_"+field.id}>
                        <Form.Group className="row" controlId="addContato">
                            {this.state.comercial ? <div className="col-md-6">
                                <Form.Label>Empresa Contato</Form.Label>        
                                <Form.Control type="text" name={"empresacontato"+'_'+this.props.name+'_'+field.id} 
                                    value={this.state["empresacontato"+'_'+this.props.name+'_'+field.id]}
                                    show={this.state.comercial}
                                    onChange={(e) => this.onChangeFunction(e)}
                                    />
                                </div> : ""
                            }
                        <div className="col-md-6">
                            <Form.Label>Nome Contato</Form.Label>        
                            <Form.Control type="text" name={"nomecontato"+'_'+this.props.name+'_'+field.id} 
                            value={this.state["nomecontato"+'_'+this.props.name+'_'+field.id]}
                            onChange={(e) => this.onChangeFunction(e)}
                            />
                        </div>
                        {this.state.emergencia ? <div className="col-md-6">
                                <Form.Label>Parentesco</Form.Label>        
                                <Form.Control type="text" name={"parentesco"+'_'+this.props.name+'_'+field.id} 
                                    value={this.state["parentesco"+'_'+this.props.name+'_'+field.id]}
                                    show={this.state.emergencia}
                                    onChange={(e) => this.onChangeFunction(e)}
                                    />
                                </div> :  <div className="col-md-6">
                                            <Form.Label>Email</Form.Label>        
                                            <Form.Control type="email" name={"email"+'_'+this.props.name+'_'+field.id} 
                                            value={this.state["email"+'_'+this.props.name+'_'+field.id]}
                                            onChange={(e) => this.onChangeFunction(e)}
                                            onBlur={(e) => this.onBlurEmail(e)}
                                            />
                                        </div>
                            }
                       
                        <div className="col-md-6">
                            <Form.Label>Telefone</Form.Label>        
                            <InputMask 
                            mask="99999999999" 
                            maskChar={null} 
                            onChange={(e) => this.onChangeFunction(e)}
                            value={this.state["telefonecontato"+'_'+this.props.name+'_'+field.id]} 
                            className="form-control"
                            name={"telefonecontato"+'_'+this.props.name+'_'+field.id}
                            type="text"
                            />
                        </div>
                        <div className="col-md-6">
                            <Form.Label>Celular</Form.Label>        
                            <InputMask 
                            mask="99999999999"
                            maskChar={null} 
                            onChange={(e) => this.onChangeFunction(e)}
                            value={this.state["celularcontato"+'_'+this.props.name+'_'+field.id]}
                            className="form-control"
                            name={"celularcontato"+'_'+this.props.name+'_'+field.id}
                            type="text"
                            />
                        </div>
                        <div className="col-md-6">
                            <Form.Label>Obs</Form.Label>        
                            <textarea
                            className="form-control" 
                            type="textarea" 
                            name={"obs"+'_'+this.props.name+'_'+field.id}
                            value={this.state["obs"+'_'+this.props.name+'_'+field.id]}
                            onChange={(e) => this.onChangeFunction(e)}
                            />
                        </div>          
                        </Form.Group>
                        <hr></hr>
                    </div>
                )}
                {this.state.emergencia ?  
                <Form.Group className="row" controlId="addContato">
                    <div className="col-md-12">
                        <Form.Label>Possui alergia algum alimento ou medicamento, Sim ou não, se sim quais:</Form.Label>        
                        <textarea
                            className="form-control" 
                            type="textarea" 
                            name={"alergias_"+this.props.name}
                            value={this.state["alergias_"+this.props.name]}
                            onChange={(e) => this.onChangeFunction(e)}
                            />
                    </div>
                    <div className="col-md-12">
                        <Form.Label>Possui algum problema de saúde, Sim ou não, se sim quais:</Form.Label>        
                        <textarea
                            className="form-control" 
                            type="textarea" 
                            name={"saude_"+this.props.name}
                            value={this.state["saude_"+this.props.name]}
                            onChange={(e) => this.onChangeFunction(e)}
                            />
                    </div>
                    <div className="col-md-12">
                        <Form.Label>Possui alguma deficiência, Sim ou não, se sim qual:</Form.Label>        
                        <textarea
                            className="form-control" 
                            type="textarea" 
                            name={"deficiencia_"+this.props.name}
                            value={this.state["deficiencia_"+this.props.name]}
                            onChange={(e) => this.onChangeFunction(e)}
                            />
                    </div>
                    <div className="col-md-6">
                        <Form.Label>Está gestante, se sim quantas semanas:</Form.Label>        
                        <Form.Control type="text" name={"gestante_"+this.props.name} 
                            value={this.state["gestante_"+this.props.name]}
                            onChange={(e) => this.onChangeFunction(e)}
                            />
                    </div>
                    <RegisterSelectProps fields={this.props.fields} title="Tipo Sangüineo" name="sangue" options={TipoSanguineo} onChangeFunction={ this.onChangeFunction }></RegisterSelectProps>
                </Form.Group> : "" }
                <Button variant="secondary" type="submit" onClick={(e) => this.onClickAdd()}>
                    Adicionar
                </Button>
                <Button className="float-right" variant="primary" type="submit" onClick={() => this.setLgShow(false, "contato")}>
                    Salvar
                </Button>  
            </Modal.Body>
        </Modal>
            
        return(
            <div className="row">
                <Form.Group className="col" controlId="addContato0">
                    {items}
                </Form.Group>
                {modal}
            </div>
        );
    }
}

export default RegisterAddContato;