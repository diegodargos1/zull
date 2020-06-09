import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

class RegisterCheckPost extends React.Component{
    constructor(){
        super();
        this.state = {
            isFetching: false,
            option: []
        }
    }

    async componentDidMount() {
        let options = await this.getListSelect();
        this.setState({
            option: options
        })
    }

    async getListSelect(){
        const dataPost = {method: this.props.fields};
        return axios({
            method: 'post',
            url: '/api/select.php',
            data: dataPost
            }).then( function(response){
                let options = response.data.value.map((opt) => 
                <div className="col-md-4">
                    <label className="form-label" htmlFor="formBasic">{opt.name}</label>
                    <input name="tipocategoria[]" type="checkbox" className="col-md-2" value={opt.value} onChange={(e) => this.props.onChangeFunction(e)} />
                </div>
                )
                return options;
            }).catch(function(error){});
    }

    render(){
        return(            
            <div className="col-md-6">
                <div className="row">
                    {this.state.option}
                </div>               
            </div>
        );
    }
}

export default RegisterCheckPost;