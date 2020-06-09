import React from 'react';
import Collapsible from 'react-collapsible';
import Field from './field';
import FieldEdit from './field-edit';
import { postClienteInfoDelete } from '../../action/register-post';
import {Form, ButtonToolbar, Button, Modal} from 'react-bootstrap';
import "./style.css";

class Viagem extends React.Component{
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
        postClienteInfoDelete(id, 'viagem');
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
            <div className="consulta-detalhe row" key={"viagem"+i} id={"viagem"+i}>
                <Component 
                title="Nacional ou Internacional."
                onChangeFunction={this.props.onChangeFunction}
                name={"viagemtipo"+"_"+i}
                value={(contato.TipoViagem) ? contato.TipoViagem : ""}
                type="select"
                options={[
                    {name: "Nacional", value: "Nacional"},
                    {name: "Internacional", value: "Internacional"},
                ]}
                />

                <Component 
                title="Ano da Viagem"
                onChangeFunction={this.props.onChangeFunction}
                name={"viagemano"+"_"+i}
                value={(contato.AnoViagem) ? contato.AnoViagem : ""}
                />

                <Component 
                title="Destino"
                onChangeFunction={this.props.onChangeFunction}
                name={"viagemdestino"+"_"+i}
                value={(contato.Destino) ? contato.Destino : ""}
                />
                <Component 
                title="O que mais gostou: "
                onChangeFunction={this.props.onChangeFunction}
                name={"viagemobs"+"_"+i}
                type="textarea"
                value={(contato.Obs) ? contato.Obs : ""}
                />
                {(this.props.edit) ? 
                <Button className="col-md-3" variant="danger" onClick={() => {this.handleDelete(contato.PK_ExpViagem, "viagem"+i)}}>
                    Remover
                </Button> : ""}
            </div>)
    }

    handleClick = (e) => {
        document.getElementsByClassName('viagem')[0].click();
    }

    render(){
        let item = (
            <Collapsible 
            trigger="Experiência Viagem" 
            triggerClassName="contato-expand" 
            openedClassName="contato-expand-span" 
            triggerOpenedClassName="contato-expand-opened viagem">
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

export default Viagem;