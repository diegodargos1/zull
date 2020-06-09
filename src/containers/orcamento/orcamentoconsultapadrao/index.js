import React from 'react';
import { connect } from 'react-redux';
import Consulta from '../../../components/orcamentopadrao/consulta';
import 'bootstrap/dist/css/bootstrap.min.css';

class OrcamentoConsultaPadrao extends React.Component{
    constructor(props){
        super();
        this.state = {
            "User_id": props.isLoggedIn.User_id,
            "Empresa": props.isLoggedIn.Empresa,
            "TipoConsulta": "Cliente",
            "Columns": [
                {
                    Header: 'Id Orçamento',
                    accessor: 'idOrcamento',
                    sortable: true,
                    width: "100%", 
                },{
                    Header: 'Nome Orçamento',
                    accessor: 'nomeOrcamento',
                    sortable: true,
                    width: "100%"
                    
                },{
                    Header: 'Local Evento',
                    accessor: 'localEvento',
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
                        Consultar Orçamentos Padrões!
                    </h2>
                </div>
                <Consulta columns={this.state.Columns} subcolumns={this.state.SubColumns} fields="orcamento-padrao"/>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isLoggedIn: state.loginReducer
  })

export default connect(mapStateToProps)(OrcamentoConsultaPadrao);