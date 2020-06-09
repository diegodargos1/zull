import React from 'react';
import Collapsible from 'react-collapsible';
import Field from './field';
import FieldEdit from './field-edit';
import { Button } from 'react-bootstrap';
import { postClienteInfoDelete } from '../../action/register-post';
import "./style.css";

class Rede extends React.Component{
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
        postClienteInfoDelete(id, 'rede');
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
            <div className="consulta-detalhe row" key={"rede"+i} id={"rede"+i}>
                <Component 
                title="Facebook"
                onChangeFunction={this.props.onChangeFunction}
                name={"redefacebook"+"_"+i}
                value={(contato.Facebook) ? contato.Facebook : ""}
                />

                <Component 
                title="Instagram"
                onChangeFunction={this.props.onChangeFunction}
                name={"redeinstagram"+"_"+i}
                value={(contato.Instagram) ? contato.Instagram : ""}
                />

                <Component 
                title="Linkedin"
                onChangeFunction={this.props.onChangeFunction}
                name={"redelinkedin"+"_"+i}
                value={(contato.Linkedin) ? contato.Linkedin : ""}
                />
                {(this.props.edit) ? 
                <Button className="col-md-3" variant="danger" onClick={() => {this.handleDelete(contato.PK_Rede, "rede"+i)}}>
                    Remover
                </Button> : ""}
            </div>)
    }

    handleClick = (e) => {
        document.getElementsByClassName('rede')[0].click();
    }

    render(){
        let item = (
            <Collapsible 
            trigger="Redes Sociais" 
            triggerClassName="contato-expand" 
            openedClassName="contato-expand-span" 
            triggerOpenedClassName="contato-expand-opened rede">
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

export default Rede;