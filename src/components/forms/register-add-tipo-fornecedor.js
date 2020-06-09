import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form, ButtonToolbar, Button, Modal} from 'react-bootstrap';
import axios from 'axios';
import { tipoFornecedor, subtipoFornecedor } from '../../action/select-post';

class RegisterAddTipoFornecedor extends React.Component{
    constructor(){
        super();
        this.state = {
            Logged: true,
            smShow: false, 
            lgShow: false,
            types: [],
            listaFornecedores: [],
        }
        this.onChangeTipo = this.onChangeTipo.bind(this);
    }

    async componentWillMount(){
        const fornecedores = await tipoFornecedor();
        this.setState({
            listaFornecedores: fornecedores
        })
    }
    
   setLgShow(e = false, id){
        this.setState({
            lgShow: e,
            [id]: e,
        });
        if(!e){
            this.onChangeTipo(false);
        }
    }

    async onChangeTipo(e){
        
        const checkboxes = document.querySelectorAll("input[type='checkbox']");
        let post = [];
        let tipos = [];
        for(let k = 0; k< checkboxes.length ;k++){
            if(checkboxes[k].checked){
                if(checkboxes[k].name === "tipocategoria[]")post.push(checkboxes[k].value);
                tipos.push({name: checkboxes[k].id, value: checkboxes[k].value});
            }
        }
        if(e){
            const name = e.target.name;
            this.setState({
                [e.target.id]: e.target.checked
            });
            if(name == "tipocategoria[]"){
                const types = await subtipoFornecedor(post);
                this.setState({
                    types: (types) ? types : []
                });
            }
        }
       
        this.props.onChangeFunction( tipos );
    }


    render(){
        const items = <div className="col-md-12">
                <Button variant="secondary" onClick={() => this.setLgShow(true, "fornecedor")}> 
                    Tipo Fornecedor
                </Button>
            </div>

        const modal = <Modal size="lg" show={this.state.fornecedor} onHide={() => this.setLgShow(false, "fornecedor")} 
        aria-labelledby="example-modal-sizes-title-lg">
            <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">
                Add Tipo Fornecedor
                </Modal.Title>
            </Modal.Header>
            <Modal.Body id="control-categoria-fornecedor">
                <Form.Group className="row" controlId="formBasic">
                    {this.state.listaFornecedores.map(opt => 
                        <div className="col-md-4" key={opt.value} >
                            <label className="form-label" htmlFor="formBasic">{opt.name}</label>
                            <input 
                            name="tipocategoria[]"
                            id={"tipocategoria_"+opt.name} 
                            type="checkbox" 
                            className="col-md-2" 
                            value={opt.value}
                            defaultChecked={this.state["tipocategoria_"+opt.name]}
                            onChange={(e) => this.onChangeTipo(e)}
                             />
                        </div>
                        
                        )}
                </Form.Group>
                <hr></hr>
                <Form.Group className="row" controlId="formBasic">
                 {this.state.types.map(opt =>
                    <div className="col-md-4" key={opt.value} htmlFor={opt.pai}>
                        <label className="form-label" htmlFor="formBasic">{opt.name}</label>
                        <input name="tiposervico" 
                        id={"tiposervico_"+opt.pai+"_"+opt.name} id={"tiposervico_"+opt.pai+"_"+opt.name} 
                        type="checkbox" className="col-md-2" 
                        value={opt.value}
                        defaultChecked={this.state["tiposervico_"+opt.pai+"_"+opt.name]}
                        onChange={(e) => this.onChangeTipo(e)}
                        />
                    </div>
                    )}
                </Form.Group>
                <Button className="float-right" variant="primary" type="submit" onClick={() => this.setLgShow(false, "fornecedor")}>
                    Salvar
                </Button> 
            </Modal.Body>
        </Modal>
            
        return(
            <div className="row">
                <Form.Group className="col" controlId="formBasic">
                    {items}
                </Form.Group>
                {modal}
            </div>
        );
    }
}

export default RegisterAddTipoFornecedor;