import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form, Button, Modal} from 'react-bootstrap';
import InputMask from 'react-input-mask';
import { listBanco } from '../../action/select-post';
  
class RegisterAddFinanceiro extends React.Component{
    constructor(props){
        super();
        this.state = {
            Logged: true,
            smShow: false, 
            lgShow: false,
            contador: 1,
            fields: [{id: 0}],
            maskCnpj: "999.999.999-999",
            options: []
        }

        this.onChangeFunction = this.onChangeFunction.bind(this);
        this.onClickAdd = this.onClickAdd.bind(this);
    }

    async componentWillMount(){
        for (let i = 0; i <= 5; i++) {
            this.setState({
                ["bancofinanceira"+'_'+this.props.name+'_'+i]: "",
                ["tipocontafinanceira"+'_'+this.props.name+'_'+i]: "",
                ["agenciafinanceira"+'_'+this.props.name+'_'+i]: "",
                ["contafinanceira"+'_'+this.props.name+'_'+i]: "",
                ["cnpjfavorecido"+'_'+this.props.name+'_'+i]: "",
                ["nomefavorecido"+'_'+this.props.name+'_'+i]: "",
            }) 
        }

        const listabancos = await listBanco();
        this.setState({
            options: listabancos
        })
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
        });
        this.props.onChangeFunction(e);
    }

    onClickAdd(){
        let field = {id: this.state.contador};
        this.setState({
            contador: this.state.contador+1,
            fields: this.state.fields.concat(field)
        });
    }

    onChangeFunctionCnpj = (e) => {
        const { value } = e.target;
        if(value){
            if(value.length > 14){
                this.setState({
                    maskCnpj: "99.999.999/0009-99"
                });
            }else{
                this.setState({
                    maskCnpj: "999.999.999-999"
                });
            }
        }
        this.onChangeFunction(e);
    }

    render(){
        const items = <div className="col-md-12">
                <Button variant="secondary" onClick={() => this.setLgShow(true, "financeiro")}> 
                    Dados Bancários {this.props.title}
                </Button>
            </div>

        const modal = <Modal size="lg" show={this.state.financeiro} onHide={() => this.setLgShow(false, "financeiro")} 
        aria-labelledby="example-modal-sizes-title-lg">
            <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">
                Add Dados Bancários {this.props.title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Informações Bancárias
                {this.state.fields.map((field) => 
                    <div className="col-12" key={"financeirokey_"+field.id}>
                        <Form.Group className="row" controlId={"addFinanceiro_"+field.id}>
                        <div className="col-md-6">
                            <Form.Label>Tipo Conta</Form.Label>
                            <select 
                            name={"tipocontafinanceira"+'_'+this.props.name+'_'+field.id} 
                            className="form-control"
                            value={this.state["tipocontafinanceira"+'_'+this.props.name+'_'+field.id]}
                            onChange={(e) => this.onChangeFunction(e)}>
                                <option>Select</option>
                                <option value="Conta Corrente">Conta Corrente</option>
                                <option value="Poupança">Poupança</option>
                                <option value="Conta Conjunta">Conta Conjunta</option>
                                <option value="Conta Fácil">Conta Fácil</option>
                            </select>
                        </div>
                        <div className="col-md-6">
                            <Form.Label>Banco</Form.Label>        
                            <select 
                            name={"bancofinanceira"+'_'+this.props.name+'_'+field.id}  
                            className="form-control"
                            value={this.state["bancofinanceira"+'_'+this.props.name+'_'+field.id]}
                            onChange={(e) => this.onChangeFunction(e)}>
                                <option>Select</option>
                                {this.state.options.map(opt => 
                                    <option value={opt.value} key={opt.value}>{opt.name}</option>
                                    )}
                            </select>
                        </div>
                        <div className="col-md-6">
                            <Form.Label>Agência</Form.Label>        
                            <Form.Control type="text" name={"agenciafinanceira"+'_'+this.props.name+'_'+field.id}
                            value={this.state["agenciafinanceira"+'_'+this.props.name+'_'+field.id]}
                            onChange={(e) => this.onChangeFunction(e)}
                            />
                        </div>
                        <div className="col-md-6">
                            <Form.Label>Conta</Form.Label>        
                            <Form.Control type="text" name={"contafinanceira"+'_'+this.props.name+'_'+field.id}
                            value={this.state["contafinanceira"+'_'+this.props.name+'_'+field.id]}
                            onChange={(e) => this.onChangeFunction(e)}
                            />
                        </div>
                        <div className="col-md-6">
                            <Form.Label>CPF ou CNPJ Favorecido</Form.Label>        
                            <InputMask 
                            mask={this.state.maskCnpj} 
                            maskChar={null} 
                            onChange={(e) => this.onChangeFunctionCnpj(e)}
                            value={this.state["cnpjfavorecido"+'_'+this.props.name+'_'+field.id]}
                            className="form-control"
                            name={"cnpjfavorecido"+'_'+this.props.name+'_'+field.id}
                            type="text"
                            />
                        </div>
                        <div className="col-md-6">
                            <Form.Label>Nome Favorecido</Form.Label>        
                            <Form.Control type="text" name={"nomefavorecido"+'_'+this.props.name+'_'+field.id}
                            value={this.state["nomefavorecido"+'_'+this.props.name+'_'+field.id]}
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
                <Button className="float-right" variant="primary" type="submit" onClick={() => this.setLgShow(false, "financeiro")}>
                    Salvar
                </Button> 
            </Modal.Body>
        </Modal>
            
        return(
            <div className="row">
                <Form.Group className="col" controlId="addFinanceiro0">
                    {items}
                </Form.Group>
                {modal}
            </div>
        );
    }
}

export default RegisterAddFinanceiro;