import React from 'react';
import Collapsible from 'react-collapsible';
import Field from './field';
import FieldEdit from './field-edit';
import { postClienteInfoDelete } from '../../action/register-post';
import {Form, ButtonToolbar, Button, Modal} from 'react-bootstrap';
import "./style.css";

class Habito extends React.Component{
    constructor(props){
        super();
        this.state = {
            contador: 0,
            form: [],
            components: props.edit ? FieldEdit : Field
        }
        this.onClickAdd = this.onClickAdd.bind(this);
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
    handleDelete = (id, element) => {
        postClienteInfoDelete(id, 'habito');
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

    allFields(i, contato = false){
        const Component = this.state.components;
        return (
            <div className="consulta-detalhe row" key={"habito"+i} id={"habito"+i}>
                <Component 
                title="Assento Preferencial"
                onChangeFunction={this.props.onChangeFunction}
                name={"habitoassentoPreferencia"+"_"+i}
                value={(contato.AssentoPreferencia) ? contato.AssentoPreferencia : ""}
                type="select"
                options={[
                    {name: "Janela", value: "Janela"},
                    {name: "Corredor", value: "Corredor"},
                    {name: "Poltrona do Centro", value: "Poltrona do Centro"},
                ]}
                />

                <Component 
                title="Tipo de Bebida"
                onChangeFunction={this.props.onChangeFunction}
                name={"habitobebidaTipo"+"_"+i}
                value={(contato.BebidaTipo) ? contato.BebidaTipo : ""}
                type="select"
                options={[
                    {name: "Alcoólicos", value: "Alcoólicos"},
                    {name: "Suco", value: "Suco"},
                    {name: "Água", value: "Água"},
                    {name: "Refrigerante", value: "Refrigerante"},
                    {name: "Chá", value: "Chá"},
                    {name: "Outro", value: "Outro"},
                ]}
                />

                <Component 
                title="Se alcoólicos ou outros, quais"
                onChangeFunction={this.props.onChangeFunction}
                name={"habitobebidasPreferencia"+"_"+i}
                value={(contato.BebidasPreferencia) ? contato.BebidasPreferencia : ""}
                />
                <Component 
                title="Alimentos de preferência."
                onChangeFunction={this.props.onChangeFunction}
                name={"habitocomidaPreferencia"+"_"+i}
                value={(contato.ComidaPreferencia) ? contato.ComidaPreferencia : ""}
                type="select"
                options={[
                    {name: "Massa", value: "Massa"},
                    {name: "Peixe", value: "Peixe"},
                    {name: "Carne", value: "Carne"},
                    {name: "Frango", value: "Frango"},
                    {name: "Vegetariano", value: "Vegetariano"},
                ]}
                />
                <Component 
                title="Algum alimento em especial que não goste, comente"
                onChangeFunction={this.props.onChangeFunction}
                name={"habitocomidaObs"+"_"+i}
                value={(contato.ComidaObs) ? contato.ComidaObs : ""}
                type="textarea"
                />
                <Component 
                title="Fumante"
                onChangeFunction={this.props.onChangeFunction}
                name={"habitofumante"+"_"+i}
                value={(contato.Fumante) ? contato.Fumante : ""}
                type="select"
                options={[
                    {name: "Sim", value: "Sim"},
                    {name: "Não", value: "Não"},
                ]}
                />
                <Component 
                title="Algum costume ou hábito que possua que gostaria de mencionar para melhor experiência em sua viagem e estadias"
                onChangeFunction={this.props.onChangeFunction}
                name={"habitoobs"+"_"+i}
                value={(contato.Obs) ? contato.Obs : ""}
                type="textarea"
                />
                {(this.props.edit) ? 
                <Button className="col-md-3" variant="danger" onClick={() => {this.handleDelete(contato.PK_Habito, "habito"+i)}}>
                    Remover
                </Button> : ""}
            </div>)
    }
    handleClick = (e) => {
        document.getElementsByClassName('habito')[0].click();
    }

    render(){
        let item = (
            <Collapsible 
            trigger="Habitos" 
            triggerClassName="contato-expand" 
            openedClassName="contato-expand-span" 
            triggerOpenedClassName="contato-expand-opened habito">
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

export default Habito;