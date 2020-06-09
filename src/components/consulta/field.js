import React from 'react';
import { Form, Button } from 'react-bootstrap';
import InputMask from 'react-input-mask';
import Collapsible from 'react-collapsible';
import { listBanco } from '../../action/select-post';

class Field extends React.Component{
    constructor(props){
        super();
        this.state = {
            divSize: (props.size) ? props.size : "12",
            fieldValue: (props.value) ? props.value : "",
            fieldType: (props.type) ? props.type : "text",
            fieldMask: (props.mask) ? props.mask : "",
            fieldName: (props.name) ? props.name : "",
            fieldTitle: (props.title) ? props.title : "",
            fieldOptions: (props.options) ? props.options : false,
            fieldBanco: (props.banco) ? props.banco : false,
            edit: props.edit ? props.edit : false,
            bancos: []
        }
        this.onChangeFunction = this.onChangeFunction.bind(this);
    }

    onChangeFunction(e){
        this.setState({
            fieldValue: e.target.value
        })
        this.props.onChangeFunction({name:e.target.name, value: e.target.value});
    }
    
    async componentWillMount(){
        if(this.state.fieldBanco){
            const listabancos = await listBanco();
            this.setState({
                bancos: listabancos
            })
        }
    }

    render(){
        let item = "";
        if(this.state.fieldType === "fileupload"){
            item = (
                <div className={"col-md-"+this.state.divSize}>
                    <Form.Label><b>{this.state.fieldTitle} :</b></Form.Label>
                    <a href="#" style={{marginLeft: '10px'}} onClick={()=> window.open("/api/"+this.state.fieldValue, "_blank")}>Ver</a>
                    <a href={"/api/"+this.state.fieldValue} style={{marginLeft: '10px'}} download>Download</a>
                </div>);
        }else if(this.state.fieldValue){
            item = (
            <div className={"col-md-"+this.state.divSize}>
                <Form.Label><b>{this.state.fieldTitle} :</b></Form.Label>
                {this.props.phone ? 
                 <p><a href={"tel:+55"+this.state.fieldValue}>{this.state.fieldValue}</a></p> 
                : 
                <p>{this.state.fieldValue}</p>
                }
            </div>);
        }

        return item;
    }

}
export default Field;