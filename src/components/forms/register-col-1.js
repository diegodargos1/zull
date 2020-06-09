import React from 'react';
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import InputMask from 'react-input-mask';
import RegisterSelect from '../../components/forms/register-select-post';
import { listaGrupo, listaPais, listaPaisPhone } from '../../action/select-post';

class RegisterCol1 extends React.Component{
    constructor(){
        super();
        this.state = {
            grupo: false,
            listagrupos: [],
            listapais: [],
            listapaisphone: []
        }
    }

    async componentWillMount(){
        this.props.fields.map((field) => {
            return (
                this.setState({
                    [this.props.name+"_"+field.name]: "",
                })
            )
        });
        const listaPaisx = await listaPais();
        const listaPaisPhonex = await listaPaisPhone();
        const listagrupo = await listaGrupo();
        this.setState({
            listagrupos: listagrupo,
            listapais: listaPaisx,
            listapaisphone: listaPaisPhonex
        });
    }

    componentDidMount(){
        let emails = document.querySelectorAll("input[type=email]");
        for(let k = 0; k < emails.length ; k++){
            emails[k].addEventListener('blur', function(){
                if(emails[k].value != ""){
                    if(!(/\S+@\S+\.\S+/.test(emails[k].value))){
                        alert('Email inválido.');
                        emails[k].value = "";
                    }
                }
            })
        }
    }

    onChangeSelect(e){
        let val = false;
        if(e.target.value === "sim")val = true
        this.setState({
            option: val
        })
    }

    render(){
        const items = this.props.fields.map((field) =>
            {
                let newinput = "";
                let input;
                
                if(field.type === "textarea"){
                    input = <textarea
                    onChange={(e) => this.props.onChangeFunction(e)} 
                    className="form-control"
                    name={this.props.name+"_"+field.name}
                    type={field.type}
                    />
                }else if(field.type === "select-option"){
                    input = (<><select 
                        onChange={(e) => this.onChangeSelect(e)} 
                        className="form-control"
                        name={this.props.name+"_"+field.name}>
                            <option>Select</option>
                            {field.options.map(opt => <option key={opt.value} value={opt.value}>{opt.name}</option>)}
                        </select>
                         </>
                        )
                    
                }else if(field.type === "select"){
                    input = (<><select 
                        onChange={(e) => this.onChangeSelect(e)} 
                        className="form-control"
                        name={this.props.name+"_"+field.name}>
                            <option>Select</option>
                            {field.option.map(opt => <option key={opt.value} value={opt.value}>{opt.name}</option>)}
                        </select>
                         </>
                        )
                    newinput = (this.state.option ?
                        <div key={this.props.name+"_"+field.title} className="col-md-6">
                        <Form.Label>Grupos</Form.Label>
                            <select 
                            onChange={(e) => this.props.onChangeFunction(e)} 
                            className="form-control"
                            name={this.props.name+"_"+field.name+"_info"}>
                            <option>Select</option>
                        {this.state.listagrupos.map(opt => 
                            <option value={opt.value}>{opt.name}</option>
                        )}
                        </select>
                        </div> : "")
                    
                }else if(field.type === "lista-pais"){
                    input = (<><select 
                        onChange={(e) => this.onChangeSelect(e)} 
                        className="form-control"
                        name={this.props.name+"_"+field.name}>
                            <option>Select</option>
                            {this.state.listapaisphone.map(opt => <option key={opt.value} value={opt.value}>{opt.name}</option>)}
                        </select>
                         </>
                        )                    
                }else{
                    input = (<InputMask 
                        mask={field.mask} 
                        maskChar={null} 
                        onChange={(e) => this.props.onChangeFunction(e)} 
                        className="form-control"
                        name={this.props.name+"_"+field.name}
                        type={field.type}
                        />)
                }
                return (<React.Fragment key={field.id}>
                    <div 
                    key={this.props.name+"_"+field.id} 
                    className={(field.size) ? "col-md-"+field.size : "col-md-6"}>
                <Form.Label>{field.title}</Form.Label>
                {input}</div> {newinput}</React.Fragment>);
            }
        );
        return(
            <div className="col-12">
                <Form.Group className="row" controlId="formBasic">
                    {items}
                    <RegisterSelect fields="forma-pagamento" title="Forma de Pagamento" name="formapagamento" onChangeFunction={ this.props.onChangeFunction }></RegisterSelect>
                </Form.Group>
            </div> 
        );
    }
}

export default RegisterCol1;