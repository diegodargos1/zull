import React from 'react';
import { connect } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Consulta from '../../components/consulta/fornecedor';


class ConsultaFornecedor extends React.Component{
    constructor(props){
        super();
        this.state = {
            "User_id": props.isLoggedIn.User_id,
            "Empresa": props.isLoggedIn.Empresa,
            "TipoConsulta": "Fornecedor",
            "Columns": [
                {
                    Header: 'Id Fornecedor',
                    accessor: 'id',
                    sortable: true,
                    width: "50",
                    maxWidth: 50 
                    
                },
                {
                    Header: 'Nome',
                    accessor: 'Nome',
                    sortable: true,
                    width: "100%"
                    
                },{
                    Header: 'Cpf/Cnpj',
                    accessor: 'Cnpj',
                    sortable: true,
                    width: "100%"
                    
                },{
                    Header: 'Tipo Fornecedor',
                    accessor: 'TipoFornecedor',
                    sortable: true,
                    width: "100%",
                    
                }
            ],
           
        }
    }

    render(){
        return (
            <div className="wrapper">
                <div className="">
                    <h2>
                        Consultar Fornecedores!
                    </h2>
                </div>
                <Consulta columns={this.state.Columns} subcolumns={this.state.SubColumns} fields="fornecedor" type="Consulta Fornecedores"/>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isLoggedIn: state.loginReducer
  })

export default connect(mapStateToProps)(ConsultaFornecedor);