import React from 'react';
import { connect } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Consulta from '../../components/consulta/cliente';


class ConsultaCliente extends React.Component{
    constructor(props){
        super();
        this.state = {
            "User_id": props.isLoggedIn.User_id,
            "Empresa": props.isLoggedIn.Empresa,
            "TipoConsulta": "Cliente",
            "Columns": [
                {
                    Header: 'Id Cliente',
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
                    Header: 'Tipo Cliente',
                    accessor: 'TipoCliente',
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
                        Consultar Clientes!
                    </h2>
                </div>
                <Consulta columns={this.state.Columns} subcolumns={this.state.SubColumns} fields="cliente" type="Consulta Clientes"/>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isLoggedIn: state.loginReducer
  })

export default connect(mapStateToProps)(ConsultaCliente);