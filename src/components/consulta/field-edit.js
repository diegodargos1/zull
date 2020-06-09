import React from 'react';
import { Form, Button } from 'react-bootstrap';
import InputMask from 'react-input-mask';
import {uploadFile} from '../../action/register-post';
import { listBanco, listaGrupo } from '../../action/select-post';

class FieldEdit extends React.Component{
    constructor(props){
        super();
        this.state = {
            divSize: (props.size) ? props.size : "5",
            fieldValue: (props.value) ? props.value : "",
            fieldType: (props.type) ? props.type : "text",
            fieldMask: (props.mask) ? props.mask : "",
            fieldName: (props.name) ? props.name : "",
            fieldTitle: (props.title) ? props.title : "",
            fieldOptions: (props.options) ? props.options : false,
            fieldBanco: (props.banco) ? props.banco : false,
            fieldGrupo: (props.grupo) ? props.grupo : false,
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
                bancos: listabancos,
            })
        }else if(this.state.fieldGrupo){
            const listGrupo = await listaGrupo();
            this.setState({
                fieldOptions: listGrupo
            })
        }
    }

    async submitFile(e){
        let res = await uploadFile(this.state[e]);
        if(!res.data.error){
            this.setState({
                [e]: res.data.filename,
            });
            this.props.onChangeFunction({target: {name: e, value: res.data.filename}});
            alert("Imagem Salva.");
        }else{
            alert(res.data.message);
        }

    }

    onChangeFile(e){
        this.setState({
            [e.target.name]: e.target.files[0],
        })
    }

    render(){
        let item;
        if(this.state.fieldType === "textarea"){
           item = (
                <div className={"col-md-"+this.state.divSize}>
                    <Form.Label>{this.state.fieldTitle}</Form.Label>
                        <textarea 
                        onChange={(e) => this.onChangeFunction(e)} 
                        className="form-control"
                        name={this.state.fieldName}
                        value={(this.state.fieldValue) ? this.state.fieldValue : ""}
                        />
           </div>);
        }else if(this.state.fieldType === "date"){
            item = (
                 <div className={"col-md-"+this.state.divSize}>
                     <Form.Label>{this.state.fieldTitle}</Form.Label>
                         <input 
                         onChange={(e) => this.onChangeFunction(e)} 
                         className="form-control"
                         name={this.state.fieldName}
                         value={(this.state.fieldValue) ? this.state.fieldValue : ""}
                         type={this.state.fieldType}
                         />
            </div>);
        }else if(this.state.fieldType === "select"){
            item = (
                 <div className={"col-md-"+this.state.divSize}>
                     <Form.Label>{this.state.fieldTitle}</Form.Label>
                         <select 
                         onChange={(e) => this.onChangeFunction(e)} 
                         className="form-control"
                         name={this.state.fieldName}
                         value={(this.state.fieldValue) ? this.state.fieldValue : ""}
                         >
                             <option> Select</option>
                             {(this.state.fieldOptions != "") ? 
                             this.state.fieldOptions.map(opt => 
                                <option key={opt.value} value={opt.value}>{opt.name}</option>
                                ) : ""}
                        </select>
            </div>);
        }else if(this.state.fieldType === "banco"){
            item = (
                 <div className={"col-md-"+this.state.divSize}>
                     <Form.Label>{this.state.fieldTitle}</Form.Label>
                         <select 
                         onChange={(e) => this.onChangeFunction(e)} 
                         className="form-control"
                         name={this.state.fieldName}
                         value={(this.state.fieldValue) ? this.state.fieldValue : ""}
                         >
                             <option> Select</option>
                             {this.state.bancos.map(opt => 
                                <option key={opt.value} value={opt.value}>{opt.name}</option>
                                )}
                        </select>
            </div>);
        }else if(this.state.fieldType === "fileupload"){
            item = (
                 <div className={"col-md-"+this.state.divSize}>
                     <Form.Label style={{width: '100%'}}>{this.state.fieldTitle}</Form.Label>
                      <input 
                            type="file"
                            className="d-inline col-md-6"
                            name={this.state.fieldName}
                            onChange={(e) => this.onChangeFile(e)}/>
                            <Button className="float-right" id="" variant="primary" type="submit"
                            onClick={(e) => this.submitFile(this.state.fieldName)}>
                                Submit
                            </Button> 
            </div>);
        }else{
            item = (
            <div className={"col-md-"+this.state.divSize}>
                <Form.Label>{this.state.fieldTitle}</Form.Label>
                    <InputMask 
                    mask={this.state.fieldMask}
                    maskChar={null} 
                    onChange={(e) => this.onChangeFunction(e)} 
                    className="form-control"
                    name={this.state.fieldName}
                    type={this.state.fieldType}
                    value={this.state.fieldValue}
                />
            </div>);
        }

        return item;
    }

}
export default FieldEdit;