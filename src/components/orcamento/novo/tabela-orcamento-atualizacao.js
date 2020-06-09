import React from 'react';
import ReactTable from 'react-table';
import {postConsultaOrcamentoDetalhe} from '../../../action/consulta-post';
import "./style.css";
import "react-table/react-table.css";


class TabelaAtualizacao extends React.Component{
    constructor(props){
        super();
        this.state = {
            data: [],
            columns: [
                {
                    Header: 'Id Orçamento',
                    accessor: 'idOrcamento',
                    sortable: true,
                    width: "100"
                    
                },{
                    Header: 'Data Criação',
                    accessor: 'data',
                    sortable: true,
                    width: "100%" 
                    
                },{
                    Header: 'Nome Orçamento',
                    accessor: 'nomeOrcamento',
                    sortable: true,
                    width: "100%"
                    
                },{
                    Header: 'Data Evento',
                    accessor: 'dataEvento',
                    sortable: true,
                    width: "100%", 
                },{
                    Header: 'Sequência',
                    accessor: 'sequencia',
                    sortable: true,
                    width: "100", 
                }
            ],
        }
    }

    handleClick = async (e) => {
        this.props.voltar()
        let datasv = await postConsultaOrcamentoDetalhe(e);
        this.props.novaConsulta(datasv)
    }

    render(){
        return (
            (this.props.allData) ? 
            <div className="col-md-12 border-top" style={{padding: "10px 0", marginTop: "10px"}} >
                <h2>Atualizacao</h2>
                    <ReactTable
                        columns={this.state.columns}
                        data={this.props.data}
                        defaultPageSize={10}
                        className="-striped -highlight"
                        noDataText="Carregando..."
                        getTdProps={(state, rowInfo, column, instance) => {
                            if(rowInfo !== undefined){
                                return {
                                    onClick: (e, handleOriginal) => {
                                        this.handleClick(rowInfo.original.idOrcamento)
                                    }
                                }
                            }
                            return ""
                        }}
                        />
                </div>
            : ""
        );
    }

}
export default TabelaAtualizacao;