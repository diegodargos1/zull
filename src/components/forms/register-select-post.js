import React from 'react';
import { Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {listaFormaPagamento} from '../../action/select-post';

class RegisterSelect extends React.Component{
    constructor(props){
        super();
        
        this.state = {
            isFetching: false,
            divSize: (props.size) ? props.size : "6",
            selectValue: (props.value) ? props.value : "",
            option: []
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e){
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            selectValue: value
        });
        this.props.onChangeFunction({target: {name: name, value: value}});
    }

    async componentDidMount() {
        const _options = await listaFormaPagamento(this.props.fields);
        let options = _options.map((opt) => { 
            let item = <option key={opt.value} value={opt.value} >{opt.name}</option>
            return item;
        })
        this.setState({
            option: options
        })
    }


    render(){
        return(            
            <div className={"col-md-"+this.state.divSize}>
                <label className="form-label" htmlFor="formBasic">{this.props.title}</label>
                <select className="form-control" value={(this.state.selectValue) ? this.state.selectValue : ""} name={this.props.fields} onChange={(e) => this.handleChange(e)}>
                    <option>Select</option>
                    {this.state.option}
                </select>
            </div>
        );
    }
}

export default RegisterSelect;