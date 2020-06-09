import React from 'react';
import { Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

class RegisterSelectProps extends React.Component{
    constructor(){
        super();
    }

    render(){
        const items = this.props.options.map((opt) =>
        <option key={opt.id} value={opt.value}>{opt.name}</option>
        )
        return(
            <div className="col-md-3">
                <label className="form-label" htmlFor="formBasic">{this.props.title}</label>
                <select className="form-control" value={this.props.fields[this.props.name]} name={this.props.name} onChange={ (e) => this.props.onChangeFunction(e) }>
                    <option>Select</option>
                    {items}
                </select>
            </div>
        );
    }
}

export default RegisterSelectProps;