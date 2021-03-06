import React from 'react';
import ReactTable from 'react-table';
import {postConsulta, postConsultaClienteDetalhe} from '../../../action/consulta-post';
import Detalhe from './detalhe';
import DetalheEdit from './detalhe-edit';
import { Button } from 'react-bootstrap';
import { faArrowLeft, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../style.css";
import "react-table/react-table.css";

class Consulta extends React.Component{
    constructor(props){
        super();
        this.state = {
            data: [],
            page: "pesquisar",
            cliente: [],
            pesquisa: "",
            error: false,
        }
        this.handleOnClick = this.handleOnClick.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.getDataFromServer = this.getDataFromServer.bind(this);
        this.handleOnClickPesquisa = this.handleOnClickPesquisa.bind(this);
        this.handleOnClickEdit = this.handleOnClickEdit.bind(this);
    }

    handlePesquisa = () => {
        this.setState({
            error: false,
        })
    }

    async getDataFromServer(e){
        this.handlePesquisa()
        e.preventDefault();

        document.getElementById("loading").style.display = "block";
        let datasv = await postConsulta(this.props.fields, this.state.pesquisa);
        if(datasv === null){
            this.setState({
                page: "pesquisar",
                error: true
            })
        }else{
            this.setState({
                data: datasv,
                page: "table"
            });
        }
        document.getElementById("loading").style.display = "none";
    }

    setStateAsync(state) {
        return new Promise((resolve) => {
            this.setState(state, resolve)
        });
    }

    async getDetalhesFromServer(e){
        document.getElementById("loading").style.display = "block";
        let datasv = await postConsultaClienteDetalhe(this.props.fields, e);
        await this.setStateAsync({cliente: datasv, page: "cliente"})
        document.getElementById("loading").style.display = "none";
    }

    handleOnChange(e){
        this.setState({
            pesquisa: e.target.value
        })
    }
    
    handleOnClick(){
        this.setState({
            page: "table"
        })
    }
    handleOnClickPesquisa(){
        this.setState({
            page: "pesquisar",
            pesquisa: ""
        })
    }
    handleOnClickEdit(){
        this.setState({
            page: "edit"
        })
    }
    
    render(){
        if(this.state.data === "")return "Loading..."
        if(this.state.page  === "table"){
            return (
                <>
                <form className="form-pesquisa" onSubmit={(e) => this.getDataFromServer(e)}>
                    <input type="text" name="pesquisa" placeholder="Digite sua pesquisa aqui." onChange={(e) => this.handleOnChange(e)}/>
                    <Button className="float-right mb-2" variant="primary" type="submit">
                        Pesquisar
                    </Button>
                </form>
                <ReactTable
                columns={this.props.columns}
                data={this.state.data}
                defaultPageSize={10}
                className="-striped -highlight"
                noDataText="Carregando..."
                getTdProps={(state, rowInfo, column, instance) => {
                    if(rowInfo !== undefined){
                        return {
                            onClick: (e, handleOriginal) => {
                                this.getDetalhesFromServer(rowInfo.original.id);
                            }
                        }
                    }
                    return ""
                  }}
                />
                </>
            )
        }else if(this.state.page === "edit"){
            return (
            <>
                <div className="consulta-voltar">
                    <a href="#" onClick={this.handleOnClick}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                    Voltar</a>
                </div>
                
                <DetalheEdit cliente={this.state.cliente} edit={true} />
            </>)
        }else if(this.state.page === "cliente"){
            return (
            <>
                <div className="consulta-voltar">
                
                    <a href="#" onClick={this.handleOnClick}>
                        <FontAwesomeIcon icon={faArrowLeft} />
                         Voltar
                    </a>
                    <a href="#" onClick={this.handleOnClickEdit}>
                        Editar 
                        <FontAwesomeIcon icon={faEdit} />
                    </a>
                </div>

                <Detalhe cliente={this.state.cliente}/>
            </>)
        }else if(this.state.page === "pesquisar"){
            return (
            <>
                <form className="form-pesquisa" onSubmit={(e) => this.getDataFromServer(e)}>
                <input type="text" name="pesquisa" placeholder="Digite sua pesquisa aqui." onChange={(e) => this.handleOnChange(e)}/>
                <Button className="float-right" variant="primary" type="submit">
                    Pesquisar
                </Button>
                </form>
                {(this.state.error) ? <p>Nenhum valor encontrado para a pesquisa: {this.state.pesquisa}</p> : ""}
            </>)
        }
        
    }
}

export default Consulta;