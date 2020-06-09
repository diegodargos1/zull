import React from 'react';
import Collapsible from 'react-collapsible';
import Field from './field';
import FieldEdit from './field-edit';
import { postClienteInfoDelete } from '../../action/register-post';
import {Form, ButtonToolbar, Button, Modal} from 'react-bootstrap';
import { TipoSanguineo } from '../fields/forms/select-opt';
import "./style.css";

class Saude extends React.Component{
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
        postClienteInfoDelete(id, 'saude');
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
            <div className="consulta-detalhe row" key={"saude"+i} id={"saude"+i}>
                <Component 
                title="Alergias"
                onChangeFunction={this.props.onChangeFunction}
                name={"saudealergias"+"_"+i}
                value={(contato.Alergias) ? contato.Alergias : ""}
                type="textarea"
                />

                <Component 
                title="Problemas de Saude"
                onChangeFunction={this.props.onChangeFunction}
                name={"saudeproblemaSaude"+"_"+i}
                value={(contato.ProblemaSaude) ? contato.ProblemaSaude : ""}
                type="textarea"
                />

                <Component 
                title="Deficiências"
                onChangeFunction={this.props.onChangeFunction}
                name={"saudedeficiencia"+"_"+i}
                value={(contato.Deficiencia) ? contato.Deficiencia : ""}
                type="textarea"
                />
                <Component 
                title="Tipo Sanguineo"
                onChangeFunction={this.props.onChangeFunction}
                name={"saudetipoSanguineo"+"_"+i}
                value={(contato.TipoSanguineo) ? contato.TipoSanguineo : ""}
                type="select"
                options={TipoSanguineo}
                />
                <Component 
                title="Meses de Gestação"
                onChangeFunction={this.props.onChangeFunction}
                name={"saudemesesGestacao"+"_"+i}
                value={(contato.MesesGestacao) ? contato.MesesGestacao : ""}
                />
                {(this.props.edit) ? 
                <Button className="col-md-3" variant="danger" onClick={() => {this.handleDelete(contato.PK_Saude, "saude"+i)}}>
                    Remover
                </Button> : ""}
            </div>)
    }

    handleClick = (e) => {
        document.getElementsByClassName('saude')[0].click();
    }

    render(){
        let item = (
            <Collapsible 
            trigger="Saúde" 
            triggerClassName="contato-expand" 
            openedClassName="contato-expand-span" 
            triggerOpenedClassName="contato-expand-opened saude">
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

export default Saude;