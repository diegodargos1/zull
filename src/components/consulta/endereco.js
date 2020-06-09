import React from 'react';
import Collapsible from 'react-collapsible';
import Field from './field';
import FieldEdit from './field-edit';
import { postClienteInfoDelete } from '../../action/register-post';
import {Form, ButtonToolbar, Button, Modal} from 'react-bootstrap';
import axios from 'axios';
import "./style.css";

class Endereco extends React.Component{
    constructor(props){
        super();
        this.state = {
            contador: 0,
            form: [],
            components: props.edit ? FieldEdit : Field
        }
        this.onClickAdd = this.onClickAdd.bind(this);
        this.getCep = this.getCep.bind(this);
        this.onChangeFunction = this.onChangeFunction.bind(this);
    }

    handleDelete = (id, element) => {
        postClienteInfoDelete(id, 'endereco');
        document.getElementById(element).remove();
    }

    getCep(e = false, callback){ 
        this.props.onChangeFunction(e);
        let cep = e.value;
        cep = cep.replace('-','');
        let id = e.name.split("_");
        id = id[1];
        if(cep.length == 8){
            axios({
                method: 'get',
                url: 'https://api.pagar.me/1/zipcodes/'+cep,
                }).then(function(response){
                    document.getElementsByName("enderecorua"+'_'+id)[0].value = response.data.street;
                    document.getElementsByName("enderecobairro"+'_'+id)[0].value = response.data.neighborhood;
                    document.getElementsByName("enderecocidade"+'_'+id)[0].value = response.data.city;
                    document.getElementsByName("enderecoestado"+'_'+id)[0].value = response.data.state;

                    callback({name: "enderecorua"+'_'+id, value: response.data.street});
                    callback({name: "enderecobairro"+'_'+id, value: response.data.neighborhood});
                    callback({name: "enderecocidade"+'_'+id, value: response.data.city});
                    callback({name: "enderecoestado"+'_'+id, value: response.data.state});

                }).catch(function(error){});
        }
    }

    componentWillMount(){
        const items = this.props.fields.map((contato, i) => {
            this.setState({
                contador: i
            });
            return this.allFields(i, contato);
        })

        this.setState({
            items: items
        });
    }
    onClickAdd(){
        let i = this.state.contador+1
        let item = this.state.form.concat(this.allFields(i));
        this.setState({
            contador: i,
            form: item
        })
    }
    onChangeFunction(e){
        this.props.onChangeFunction(e);
    }

    allFields(i, contato = false){
        const Component = this.state.components;
        return (
            <div className="consulta-detalhe row" key={"endereco"+i} id={"endereco"+i}>
                <Component 
                title="Cep"
                mask="99999-999"
                onChangeFunction={(e) => this.getCep(e, this.onChangeFunction)}
                name={"enderecocep"+"_"+i}
                value={(contato.Cep) ? contato.Cep : ""}
                />

                <Component 
                title="Rua"
                onChangeFunction={(e) => this.onChangeFunction(e)}
                name={"enderecorua"+"_"+i}
                value={(contato.Rua) ? contato.Rua : ""}
                />

                <Component 
                title="Numero"
                onChangeFunction={(e) => this.onChangeFunction(e)}
                name={"endereconumero"+"_"+i}
                value={(contato.Numero) ? contato.Numero : ""}
                />

                <Component 
                title="Complemento"
                onChangeFunction={(e) => this.onChangeFunction(e)}
                name={"enderecocomplemento"+"_"+i}
                value={(contato.Complemento) ? contato.Complemento : ""}
                />
                <Component 
                title="Cidade"
                onChangeFunction={(e) => this.onChangeFunction(e)}
                name={"enderecocidade"+"_"+i}
                value={(contato.Cidade) ? contato.Cidade : ""}
                />
                <Component 
                title="Bairro"
                onChangeFunction={(e) => this.onChangeFunction(e)}
                name={"enderecobairro"+"_"+i}
                value={(contato.Bairro) ? contato.Bairro : ""}
                />
                <Component 
                title="Estado"
                onChangeFunction={(e) => this.onChangeFunction(e)}
                name={"enderecoestado"+"_"+i}
                value={(contato.Estado) ? contato.Estado : ""}
                />
                <Component 
                title="Pais"
                onChangeFunction={(e) => this.onChangeFunction(e)}
                name={"enderecopais"+"_"+i}
                value={(contato.Pais) ? contato.Pais : ""}
                />
                {(this.props.edit) ? 
                <Button className="col-md-3" variant="danger" onClick={() => {this.handleDelete(contato.PK_Endereco, "endereco"+i)}}>
                    Remover
                </Button> : ""}
            </div>)
    }

    handleClick = (e) => {
        document.getElementsByClassName('endereco')[0].click();
    }

    render(){
        let item = (
            <Collapsible 
            trigger="Endereço" 
            triggerClassName="contato-expand" 
            openedClassName="contato-expand-span" 
            triggerOpenedClassName="contato-expand-opened endereco">
                        {(this.props.validation) ? this.state.items : ""}
                        {this.state.form}
                {this.props.edit ? 
                    <>
                    <Button variant="secondary" type="submit" onClick={(e) => this.onClickAdd()}>
                        Adicionar
                    </Button>
                    <Button className="float-right" variant="primary" type="submit" onClick={this.handleClick}>
                        Fechar
                    </Button></>
                    : 
                    <Button className="float-right" variant="primary" type="submit" onClick={this.handleClick}>
                        Fechar
                    </Button>
                }
            </Collapsible> 
        );

        return item;
    }
}

export default Endereco;