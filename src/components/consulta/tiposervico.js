import React from 'react';
import Collapsible from 'react-collapsible';
import Field from './field';
import { Button, Form } from 'react-bootstrap';
import {tipoFornecedorAll} from "../../action/select-post"

import "./style.css";

class TipoServico extends React.Component{
    constructor(props){
        super();
        this.state = {
            contador: 0,
            form: [],
            components: (props.edit) ? true : false,
        }
        this.handleCheckBox = this.handleCheckBox.bind(this);
    }
    
    async componentWillMount(){
        let checkArray = [];
        let index = "";
        this.props.fields.map((contato, i) => {
            index = checkArray.filter(vendor => (vendor.name === contato.CategoriaServico));
            if(index.length === 0 ){
                checkArray.push({name: contato.CategoriaServico, value: [], text: false});
            }
            
            index = checkArray.findIndex(x => x.name === contato.CategoriaServico );
            checkArray[index].value.push({name: contato.TipoServico, value: contato.PK_Tipo})
            checkArray[index].text = (checkArray[index].text) ? checkArray[index].text+" / "+contato.TipoServico : contato.TipoServico;

            return checkArray;
        })
        const items = checkArray.map((contato, i) => {
            return this.allFields(i, contato);
        })
        if(this.state.components)this.allEditFields();
         this.setState({
             items: items,
             checkBoxes: checkArray
         });
    }

    componentDidMount(){
        if(!this.state.components)return false;
        this.props.fields.map((contato, i) => {

            return false;
        })
    }

    handleCheckBox(e){
       const f = document.getElementsByClassName(e.target.name);
       for(let k = 0; k < f.length ; k++){
            f[k].style.display = (e.target.checked) ? "inline-block" : "none";
       }
    }

    async allEditFields(){
        const checkBox = await tipoFornecedorAll();
        let items = [];
        for(let key in checkBox){
            const index = this.state.checkBoxes.findIndex(x => x.name === key );
            const checkedVar = (index >= 0) ? true : false;
            const displayCheck = (checkedVar) ? "inline-block" : "none";
            items.push(
                <div key={key} className={"col-md-12 consulta-detalhe"}>
                    <Form.Label className="col-md-12"><b>{key}</b>
                        <input type="checkbox" id={key}
                        name={key} 
                        value="0"
                        defaultChecked={checkedVar}
                        onClick={(e) => this.handleCheckBox(e)} />
                    </Form.Label>
                        {checkBox[key].map((tipo, i) => {
                            let index2 = false;
                            if(checkedVar){
                                index2 = this.state.checkBoxes[index].value.findIndex(x => x.name === tipo.Nome );
                                index2 = (index2 >= 0) ? true : false;
                            }
                            return(
                            <div key={i} className={"col-md-2 tipofornecedor "+ key} style={{display: displayCheck}}>
                                {tipo.Nome}<input type="checkbox" name={tipo.Nome} defaultChecked={index2} value={tipo.PK_Tipo} />
                            </div>)}
                        )}
                </div>
            );
        }
        
        this.setState({
            form: items
        })
    }
    allFields(i, contato = false){
        const value = (this.props.edit) ? contato.value : contato.text;
        return (
            <div className="consulta-detalhe row" key={"tiposervico"+i}>
                <Field 
                title={contato.name}
                onChangeFunction={this.props.onChangeFunction}
                name={"servicocategoria_"+i}
                value={(value) ? value : ""}
                type="tiposervico"
                />
            </div>)
    }

    handleClick = (e) => {
        document.getElementsByClassName('tiposervico')[0].click();
    }

    render(){
        let item = (
            <Collapsible 
            trigger="Tipo de Serviço" 
            triggerClassName="contato-expand" 
            openedClassName="contato-expand-span" 
            triggerOpenedClassName="contato-expand-opened tiposervico">
                        {(this.state.components) ? this.state.form : this.state.items}
                {this.props.edit ? 
                <>
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

export default TipoServico;