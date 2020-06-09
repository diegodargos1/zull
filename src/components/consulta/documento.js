import React from 'react';
import Collapsible from 'react-collapsible';
import Field from './field';
import FieldEdit from './field-edit';
import { postClienteInfoDelete } from '../../action/register-post';
import {Form, ButtonToolbar, Button, Modal} from 'react-bootstrap';
import "./style.css";

class Documento extends React.Component{
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
        postClienteInfoDelete(id, 'documento');
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
            <div className="consulta-detalhe row" key={"documento"+i} id={"documento"+i}>
                <Component 
                title="Passaporte"
                onChangeFunction={this.props.onChangeFunction}
                name={"documentopassaporte"+"_"+i}
                value={(contato.Passaporte) ? contato.Passaporte : ""}
                size="5"
                />

                <Component 
                title="Validade Passaporte"
                onChangeFunction={this.props.onChangeFunction}
                name={"documentovalidadePassaporte"+"_"+i}
                size="5"
                type="date"
                value={(contato.ValidadePassaporte) ? contato.ValidadePassaporte : ""}
                />

                <Component 
                title="Visto Americano"
                onChangeFunction={this.props.onChangeFunction}
                name={"documentovistoAmericano"+"_"+i}
                value={(contato.VistoAmericano) ? contato.VistoAmericano : ""}
                size="5"
                type="select"
                options={[
                    {name: "Sim", value: "Sim"},
                    {name: "Não", value: "Não"},
                ]}
                />
                <Component 
                title="Validade VistoAmericano"
                onChangeFunction={this.props.onChangeFunction}
                name={"documentovalidadeVistoAmericano"+"_"+i}
                size="5"
                type="date"
                value={(contato.ValidadeVistoAmericano) ? contato.ValidadeVistoAmericano : ""}
                />
                <Component 
                title="OutroVisto"
                onChangeFunction={this.props.onChangeFunction}
                name={"documentooutroVisto"+"_"+i}
                size="5"
                value={(contato.OutroVisto) ? contato.OutroVisto : ""}
                />
                <Component 
                title="Copia Cpf"
                onChangeFunction={this.props.onChangeFunction}
                name={"documentocopiaCpf"+"_"+i}
                size="5"
                value={(contato.CopiaCpf) ? contato.CopiaCpf : ""}
                type="fileupload"
                />
                <Component 
                title="Copia Rg"
                onChangeFunction={this.props.onChangeFunction}
                name={"documentocopiaRgFile"+"_"+i}
                size="5"
                value={(contato.CopiaRgFile) ? contato.CopiaRgFile : ""}
                type="fileupload"
                />
                <Component 
                title="Copia Passaporte"
                onChangeFunction={this.props.onChangeFunction}
                name={"documentocopiaPassaporteFile"+"_"+i}
                size="5"
                value={(contato.CopiaPassaporteFile) ? contato.CopiaPassaporteFile : ""}
                type="fileupload"
                />
                <Component 
                title="Comprovante Endereco"
                onChangeFunction={this.props.onChangeFunction}
                name={"documentocomprovanteEnderecoFile"+"_"+i}
                size="5"
                value={(contato.ComprovanteEnderecoFile) ? contato.ComprovanteEnderecoFile : ""}
                type="fileupload"
                />
                <Component 
                title="Copia Visto"
                onChangeFunction={this.props.onChangeFunction}
                name={"documentocopiaVistoFile"+"_"+i}
                size="5"
                value={(contato.CopiaVistoFile) ? contato.CopiaVistoFile : ""}
                type="fileupload"
                />
                {(this.props.edit) ? 
                <Button className="col-md-3" variant="danger" onClick={() => {this.handleDelete(contato.PK_Documento, "documento"+i)}}>
                    Remover
                </Button> : ""}
            </div>)
    }

    handleClick = (e) => {
        document.getElementsByClassName('documento')[0].click();
    }

    render(){
        let item = (
            <Collapsible 
            trigger="Documentos" 
            triggerClassName="contato-expand" 
            openedClassName="contato-expand-span" 
            triggerOpenedClassName="contato-expand-opened documento">
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

export default Documento;