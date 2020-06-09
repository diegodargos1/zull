import React from 'react';
import Collapsible from 'react-collapsible';
import Field from './field';
import FieldEdit from './field-edit';
import { postClienteInfoDelete } from '../../action/register-post';
import equal from 'fast-deep-equal'
import { Button } from 'react-bootstrap';
import "./style.css";

class Contato extends React.Component{
    constructor(props){
        super();
        this.state = {
            contador: 0,
            form: [],
            components: props.edit ? FieldEdit : Field,
        }
        this.onClickAdd = this.onClickAdd.bind(this);
    }

    setStateAsync(state) {
        return new Promise((resolve) => {
            this.setState(state, resolve)
        });
    }

    handleDelete = (id, element) => {
        postClienteInfoDelete(id, 'contato');
        document.getElementById(element).remove();
    }

    componentDidUpdate(prevProps) {
        if(!equal(this.props.readonly, prevProps.readonly)){
            this.setState({
                readonly: this.props.readonly,
            })
        }
    } 

    async componentWillMount(){
        const items = await this.props.fields.map((contato, i) => {
            this.setState({
                contador: i
            });
            return this.allFields(i, contato);
        })

        await this.setStateAsync({
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

    allFields(i, contato = false){
        const Component = this.state.components;
        return (
            <div className="consulta-detalhe row" key={"contato"+i} id={"contato"+i}>
                <Component 
                title="Tipo Contato"
                type="select"
                options={[
                    {name: "Atendimento", value: "Atendimento"},
                    {name: "Emergência", value: "Emergencia"},
                    {name: "Financeiro", value: "Financeiro"},
                ]}
                onChangeFunction={this.props.onChangeFunction}
                name={"contatoContato_"+i}
                value={(contato.AreaContato) ? contato.AreaContato : ""}
                />

                <Component 
                title="Empresa"
                onChangeFunction={this.props.onChangeFunction}
                name={"contatoEmpresa_"+i}
                value={(contato.Empresa) ? contato.Empresa : ""}
                />

                <Component 
                title="Nome"
                onChangeFunction={this.props.onChangeFunction}
                name={"contatoNome_"+i}
                value={(contato.Nome) ? contato.Nome : ""}
                />

                <Component 
                title="Email"
                onChangeFunction={this.props.onChangeFunction}
                name={"contatoEmail_"+i}
                value={(contato.Email) ? contato.Email : ""}
                type="email"
                />

                <Component 
                mask="99999999999"
                title="Telefone"
                onChangeFunction={this.props.onChangeFunction}
                name={"contatoTelefone_"+i}
                value={(contato.Telefone) ? contato.Telefone : ""}
                phone={true}
                />

                <Component 
                mask="99999999999"
                title="Celular"
                onChangeFunction={this.props.onChangeFunction}
                name={"contatoCelular_"+i}
                phone={true}
                value={(contato.Celular) ? contato.Celular : ""}
                />

                <Component 
                title="Parentesco"
                onChangeFunction={this.props.onChangeFunction}
                name={"contatoParentesco_"+i}
                value={(contato.Parentesco) ? contato.Parentesco : ""}
                />

                <Component 
                title="Obs"
                onChangeFunction={this.props.onChangeFunction}
                name={"contatoObs_"+i}
                value={(contato.Obs) ? contato.Obs : ""}
                type="textarea"
                />
                {(this.props.edit) ? 
                <Button className="col-md-3" variant="danger" onClick={() => {this.handleDelete(contato.PK_Contato, "contato"+i)}}>
                    Remover
                </Button> : ""}
                
            </div>)
    }

    handleClick = (e) => {
        document.getElementsByClassName('contato')[0].click();
    }

    render(){
        let item = (
            <Collapsible 
            trigger="Contatos" 
            triggerClassName="contato-expand" 
            openedClassName="contato-expand-span" 
            triggerOpenedClassName="contato-expand-opened contato"
            ref={input => this.inputElement = input}
            >
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

export default Contato;