import React from 'react';
import Collapsible from 'react-collapsible';
import Field from './field';
import FieldEdit from './field-edit';
import { postClienteInfoDelete } from '../../action/register-post';
import {Form, ButtonToolbar, Button, Modal} from 'react-bootstrap';
import {Fluencia} from '../fields/forms/select-opt';
import "./style.css";

class Escolaridade extends React.Component{
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
        postClienteInfoDelete(id, 'escolaridade');
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
            <div className="consulta-detalhe row" key={"escolaridade"+i} id={"escolaridade"+i}>
                <Component 
                title="Nivel Ingles"
                onChangeFunction={this.props.onChangeFunction}
                name={"escolaridadenivelIngles"+"_"+i}
                value={(contato.NivelIngles) ? contato.NivelIngles : ""}
                type="select"
                options={Fluencia}
                />

                <Component 
                title="Nivel Espanhol"
                onChangeFunction={this.props.onChangeFunction}
                name={"escolaridadenivelEspanhol"+"_"+i}
                value={(contato.NivelEspanhol) ? contato.NivelEspanhol : ""}
                type="select"
                options={Fluencia}
                />

                <Component 
                title="Outro Idioma"
                onChangeFunction={this.props.onChangeFunction}
                name={"escolaridadeoutroIdioma"+"_"+i}
                value={(contato.OutroIdioma) ? contato.OutroIdioma : ""}
                />
                <Component 
                title="Nivel Outro Idioma"
                onChangeFunction={this.props.onChangeFunction}
                name={"escolaridadenivelOutroIdioma"+"_"+i}
                value={(contato.NivelOutroIdioma) ? contato.NivelOutroIdioma : ""}
                type="select"
                options={Fluencia}
                />
                <Component 
                title="Escolaridade"
                onChangeFunction={this.props.onChangeFunction}
                name={"escolaridade"+"_"+i}
                value={(contato.Escolaridade) ? contato.Escolaridade : ""}
                />
                {(this.props.edit) ? 
                <Button className="col-md-3" variant="danger" onClick={() => {this.handleDelete(contato.PK_Escolaridade, "escolaridade"+i)}}>
                    Remover
                </Button> : ""}
            </div>)
    }

    handleClick = (e) => {
        document.getElementsByClassName('escolaridade')[0].click();
    }

    render(){
        let item = (
            <Collapsible 
            trigger="Escolaridade" 
            triggerClassName="contato-expand" 
            openedClassName="contato-expand-span" 
            triggerOpenedClassName="contato-expand-opened escolaridade">
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

export default Escolaridade;