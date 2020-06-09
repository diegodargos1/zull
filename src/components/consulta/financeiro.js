import React from 'react';
import Collapsible from 'react-collapsible';
import Field from './field';
import FieldEdit from './field-edit';
import { postClienteInfoDelete } from '../../action/register-post';
import { Button } from 'react-bootstrap';

import "./style.css";

class Financeiro extends React.Component{
    constructor(props){
        super();
        this.state = {
            contador: 0,
            form: [],
            maskCpf: "999.999.999-999",
            components: props.edit ? FieldEdit : Field
        }
        this.onClickAdd = this.onClickAdd.bind(this);
    }

    async componentWillMount(){
        const items = this.props.fields.map((contato, i) => {
            this.setState({
                contador: i
            });
            return this.allFields(i, contato);
        })
        

        this.setState({
            items: items,
        });
    }
    handleDelete = (id, element) => {
        postClienteInfoDelete(id, 'financeiro');
        document.getElementById(element).remove();
    }
    onClickAdd(){
        let i = this.state.contador+1
        let item = this.state.form.concat(this.allFields(i));
        this.setState({
            contador: i,
            form: item
        })
    }

    handleCpf(e){
        if(e.target.value.lenght() > 14){
            this.setState({
                maskCpf: "99.999.999/0009-99"
            })
        }
        this.props.onChangeFunction(e)
    }

    allFields(i, contato = false){
        const Component = this.state.components;
        let bancoValue = this.props.edit ? contato.FK_Banco : contato.FinanceiroBanco
        return (
            <div className="consulta-detalhe row" key={"financeiro"+i} id={"financeiro"+i}>
                <Component 
                title="Tipo Conta"
                onChangeFunction={this.props.onChangeFunction}
                name={"financeirotipoConta_"+i}
                value={(contato.TipoConta) ? contato.TipoConta : ""}
                type="select"
                options={[
                    {name: "Conta Corrente", value: "Conta Corrente"},
                    {name: "Poupança", value: "Poupança"},
                    {name: "Conta Conjunta", value: "Conta Conjunta"},
                    {name: "Conta Fácil", value: "Conta Fácil"},
                ]}
                />
                <Component 
                title="Financeiro Banco"
                onChangeFunction={this.props.onChangeFunction}
                name={"financeiroBanco_"+i}
                value={(bancoValue) ? bancoValue : ""}
                type="banco"
                banco={true}
                />
                <Component 
                title="Agencia"
                onChangeFunction={this.props.onChangeFunction}
                name={"financeiroagencia_"+i}
                value={(contato.Agencia) ? contato.Agencia : ""}
                />

                <Component 
                title="Conta"
                onChangeFunction={this.props.onChangeFunction}
                name={"financeiroconta_"+i}
                value={(contato.Conta) ? contato.Conta : ""}
                />
                <Component 
                title="Cpf/Cnpj Favorecido"
                onChangeFunction={this.handleCpf}
                name={"financeirocnpjFavorecido_"+i}
                value={(contato.CnpjFavorecido) ? contato.CnpjFavorecido : ""}
                mask="999.999.999-99"
                />
                <Component 
                title="Nome Favorecido"
                onChangeFunction={this.props.onChangeFunction}
                name={"financeironomeFavorecido_"+i}
                value={(contato.NomeFavorecido) ? contato.NomeFavorecido : ""}
                />
                {(this.props.edit) ? 
                <Button className="col-md-3" variant="danger" onClick={() => {this.handleDelete(contato.PK_Financeiro, "financeiro"+i)}}>
                    Remover
                </Button> : ""}
            </div>)
    }
    handleClick = (e) => {
        document.getElementsByClassName('financeiro')[0].click();
    }

    render(){
        let item = (
            <Collapsible 
            trigger="Dados Bancários" 
            triggerClassName="contato-expand" 
            openedClassName="contato-expand-span" 
            triggerOpenedClassName="contato-expand-opened financeiro">
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
                </Button>}
                
            </Collapsible> 
        );

        return item;
    }
}

export default Financeiro;