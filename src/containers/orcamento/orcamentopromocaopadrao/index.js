import React from 'react';
import { connect } from 'react-redux';
import { postConsultaClienteDetalhe, postConsultaOrcamentoParente } from '../../../action/consulta-post';
import equal from 'fast-deep-equal';
import {formatData} from '../../../action/formata-data';
import FormCliente from '../../../components/orcamento/novo/form-cliente';
import ClienteDetalhe from '../../../components/orcamento/novo/cliente-detalhe';
import FormOrcamento from '../../../components/orcamento/novo/form-orcamento';
import BotoesOrcamento from '../../../components/orcamento/novo/botoes-orcamento';
import TabelaAtualizacao from '../../../components/orcamento/novo/tabela-orcamento-atualizacao';
import NovoOrcamentoPdf from '../../../components/gerador-pdf/novo-orcamento.js';
import {postNovoOrcamento, postGeraOrcamentoPdf, postEnviaOrcamento, postOrcamentoPadrao, postOrcamentoPadraoDelete, postNovoOrcamentoPadrao} from '../../../action/register-post';
import 'bootstrap/dist/css/bootstrap.min.css';

class OrcamentoPromocao extends React.Component{
    constructor(props){
        super();
        this.state = {
            "User_id": props.isLoggedIn.User_id,
            "Empresa": props.isLoggedIn.Empresa,
            "TipoOrcamento": "Promocao",
            "edited": "",
            clienteDetalhe: false,
            pdf: false,
            consulta: (props.consulta) ? true : false,
            allData: (props.allData) ? props.allData : false,
            padrao: 1, 
            new: false,
            firstTime: true,
            parenteData: [],
            readonly: (props.readonly) ? props.readonly : false,
            selectedDays: [],
            mesInicio: new Date(),
            refresh: false,
            pesquisa: "inline-block",
            novoPadrao: false,
        }
    }
    async componentWillMount(){
        if(!this.state.allData){
            this.setState({
                clienteDetalhe: false,
                consulta: true,
                padrao: 0,
                novoPadrao: true,
                new: true,
            })
        }
    }

    componentDidUpdate(prevProps) {
        if(!equal(this.props.readonly, prevProps.readonly)){
            this.setState({
                readonly: this.props.readonly,
            })
        }
    } 

    handleFormCliente = async (e, contato = false) => {
        document.getElementById("loading").style.display = "block";
        this.setState({
            clienteDetalhe: await postConsultaClienteDetalhe("cliente", e),
            contato: contato,
            pesquisa: "none"
        })
        document.getElementById("loading").style.display = "none";
    }

    handleDelete = (i) => {
        this.setState({
            edited:{
                ...this.state.edited,
                items: {...this.state.edited.items,
                    [i]: null}
            }
        })
    }

    handleChange = (e, items = false) => {
        let update = true;
        if(this.state.allData && this.state.firstTime){
            update = false;
        }
        if(items){
            this.setState({
                firstTime: false,
                new: update,
                edited:{
                    ...this.state.edited,
                    items: e
                }
            })
        }else{
            this.setState({
                edited:{
                    ...this.state.edited,
                    [e.target.name]: e.target.value
                }
            })
        }
    }

    dayClick = (selectedDays) =>{
        this.setState({ selectedDays })
    }

    handlePdf = async () => {
        let id = false;
        if(this.state.new){
            id = await this.handleSalvar();
        }else{
            id = this.state.allData.orcamento.PK_Orcamento
        }  
        if(id)this.openPdf(id); 
    }

    handleGerarPdf = async () => {
        let id = this.state.allData.orcamento.PK_Orcamento
        this.openPdf(id); 
    }

    handlePadrao = async () => {
        document.getElementById("loading").style.display = "block";
        let id = false;
        if(this.state.new){
            id = await this.handleSalvar();
        }else{
            id = this.state.allData.orcamento.PK_Orcamento
        }  
        if(!this.state.novoPadrao){
            let post = await postOrcamentoPadrao(id);
            alert(post.msg);
            this.setState({padrao: 1})
        }
        document.getElementById("loading").style.display = "none";
        
    }

    handlePadraoDelete = async () => {
        document.getElementById("loading").style.display = "block";
        let id = this.state.allData.orcamento.PK_Orcamento
        let post = await postOrcamentoPadraoDelete(id);
        alert(post.msg);
        this.setState({padrao: 0})
        document.getElementById("loading").style.display = "none";
        
    }

    openPdf = (id) => {
        window.open("http://zullcomunicacao.com.br/api/class/pdf/orcamento_pdf.php?id="+id,'_blank');
    }
    
    handleSalvarOrcamento = async () => {
        document.getElementById("loading").style.display = "block";
        let postObj;
        if(this.state.allData){
            postObj = {
                datas: this.state.selectedDays,
                cliente: this.state.clienteDetalhe.id,
                contato: this.state.contato,
                items: (this.state.edited.items == undefined) ? false : this.state.edited.items.items,
                data: (this.state.edited.items == undefined) ? false : this.state.edited.items.data,
                "User_id": this.state.User_id,
                "Empresa": this.state.Empresa,
                dataOrcamento: (this.state.edited.dataOrcamento == undefined) ? this.state.allData.orcamento.DataEvento : this.state.edited.dataOrcamento,
                nomeOrcamento: (this.state.edited.nomeOrcamento == undefined) ? this.state.allData.orcamento.Nome : this.state.edited.nomeOrcamento,
                obsOrcamento: (this.state.edited.obsOrcamento == undefined) ? this.state.allData.orcamento.Descritivo : this.state.edited.obsOrcamento,
                rateioOrcamento: (this.state.edited.rateioOrcamento == undefined) ? this.state.allData.orcamento.Rateio : this.state.edited.rateioOrcamento,
                impostopadraoOrcamento: (this.state.edited.items == undefined) ? this.state.allData.orcamento.ImpostoPadrao : this.state.edited.items.impostopadraoOrcamento,
                margempadraoOrcamento: (this.state.edited.items == undefined) ? this.state.allData.orcamento.MargemPadrao : this.state.edited.items.margempadraoOrcamento,
                paisEvento: (this.state.edited.paisEvento == undefined) ? this.state.allData.orcamento.Pais : this.state.edited.paisEvento,
                estadoEvento: (this.state.edited.estadoEvento == undefined) ? this.state.allData.orcamento.Estado : this.state.edited.estadoEvento,
            }
        }else{
            postObj = {
                datas: this.state.selectedDays,
                cliente: this.state.clienteDetalhe.id,
                contato: this.state.contato,
                items: (this.state.edited.items == undefined) ? false : this.state.edited.items.items,
                data: (this.state.edited.items == undefined) ? false : this.state.edited.items.data,
                "User_id": this.state.User_id,
                "Empresa": this.state.Empresa,
                dataOrcamento: this.state.edited.dataOrcamento,
                nomeOrcamento: this.state.edited.nomeOrcamento,
                obsOrcamento: this.state.edited.obsOrcamento,
                rateioOrcamento: this.state.edited.rateioOrcamento,
                impostopadraoOrcamento: (this.state.edited.items == undefined) ? false : this.state.edited.items.impostopadraoOrcamento,
                margempadraoOrcamento: (this.state.edited.items == undefined) ? false : this.state.edited.items.margempadraoOrcamento,
                paisEvento: this.state.edited.paisEvento,
                estadoEvento: this.state.edited.estadoEvento,
            }
        }
        const post = await postNovoOrcamento( postObj );
        
        if(post.error)this.setState({readonly: true});
        document.getElementById("loading").style.display = "none";
        alert(post.msg);
        return post.id;
    }

    handleEditar = async () => {
        document.getElementById("loading").style.display = "block";
        let postObj = {
            idOrcamento: this.state.allData.orcamento.FK_Orcamento,
            PK_Orcamento: this.state.allData.orcamento.PK_Orcamento,
            datas: this.state.selectedDays,
            cliente: this.state.clienteDetalhe.id,
            contato: this.state.contato,
            items: (this.state.edited.items == undefined) ? false : this.state.edited.items.items,
            data: (this.state.edited.items == undefined) ? false : this.state.edited.items.data,
            "User_id": this.state.User_id,
            "Empresa": this.state.Empresa,
            dataOrcamento: (this.state.edited.dataOrcamento == undefined) ? this.state.allData.orcamento.DataEvento : this.state.edited.dataOrcamento,
            nomeOrcamento: (this.state.edited.nomeOrcamento == undefined) ? this.state.allData.orcamento.Nome : this.state.edited.nomeOrcamento,
            obsOrcamento: (this.state.edited.obsOrcamento == undefined) ? this.state.allData.orcamento.Descritivo : this.state.edited.obsOrcamento,
            rateioOrcamento: (this.state.edited.rateioOrcamento == undefined) ? this.state.allData.orcamento.Rateio : this.state.edited.rateioOrcamento,
            impostopadraoOrcamento: (this.state.edited.items == undefined) ? this.state.allData.orcamento.ImpostoPadrao : this.state.edited.items.impostopadraoOrcamento,
            margempadraoOrcamento: (this.state.edited.items == undefined) ? this.state.allData.orcamento.MargemPadrao : this.state.edited.items.margempadraoOrcamento,
            paisEvento: (this.state.edited.paisEvento == undefined) ? this.state.allData.orcamento.Pais : this.state.edited.paisEvento,
            estadoEvento: (this.state.edited.estadoEvento == undefined) ? this.state.allData.orcamento.Estado : this.state.edited.estadoEvento,
        }
        const post = await postNovoOrcamentoPadrao( postObj );
       
        document.getElementById("loading").style.display = "none";
        alert(post.msg);
        return post.id;
    }

    handleSalvarNovoPadrao = async () => {
        document.getElementById("loading").style.display = "block";
        let postObj = {
            datas: this.state.selectedDays,
            cliente: this.state.clienteDetalhe.id,
            contato: this.state.contato,
            items: (this.state.edited.items == undefined) ? false : this.state.edited.items.items,
            data: (this.state.edited.items == undefined) ? false : this.state.edited.items.data,
            "User_id": this.state.User_id,
            "Empresa": this.state.Empresa,
            dataOrcamento: this.state.edited.dataOrcamento,
            nomeOrcamento: this.state.edited.nomeOrcamento,
            obsOrcamento: this.state.edited.obsOrcamento,
            rateioOrcamento: this.state.edited.rateioOrcamento,
            impostopadraoOrcamento: (this.state.edited.items == undefined) ? false : this.state.edited.items.impostopadraoOrcamento,
            margempadraoOrcamento: (this.state.edited.items == undefined) ? false : this.state.edited.items.margempadraoOrcamento,
        }
        
        let post = await postNovoOrcamentoPadrao( postObj );
        
        document.getElementById("loading").style.display = "none";
        alert(post.msg);
    }

    render(){
        return (
            <>
            <style>
                {`@media print {.no-print{display: none;}
                .print{display: block}
                .close{display: none}
            }`}
            </style>
            <div className="wrapper no-print">
                <div className="col-md-12">
                {(this.state.consulta) ? "" : 
                   <div className="col-md-6" style={{verticalAlign: "top", marginBottom: "5px", display: this.state.pesquisa}}>
                    <FormCliente tipo="Promocao" 
                    formCliente={this.handleFormCliente} 
                    user={this.state.User_id} 
                    empresa={this.state.Empresa}
                    clienteCarregado={this.state.consulta} 
                    readonly={this.state.readonly}
                    fieldSize={12}
                    />
                    </div>
                }
                    {(this.state.clienteDetalhe) ? 
                         <ClienteDetalhe data={this.state.clienteDetalhe} contato={this.state.contato} handleOrcamento={this.handleChange} allData={this.state.allData}  /> 
                         : "" }
                         <FormOrcamento 
                            data={this.state.clienteDetalhe} 
                            handleOrcamento={this.handleChange} 
                            handleDelete={this.handleDelete}
                            allData={this.state.allData}
                            readonly={this.state.readonly}
                            dayClick={this.dayClick}
                            selectedDays={this.state.selectedDays}
                            mesInicio={this.state.mesInicio}
                        />
                        
                        <BotoesOrcamento 
                            padrao={this.state.padrao} 
                            handleChange={this.handleChange}
                            handleSalvarOrcamento={this.handleSalvarOrcamento}
                            handlePadraoDelete={this.handlePadraoDelete} 
                            readonly={this.state.readonly}
                            handleSalvarNovoPadrao={this.handleSalvarNovoPadrao}
                            handleEditarPadrao={this.handleEditar}
                            novoPadrao={this.state.novoPadrao}
                        />
                    </div>
                
            </div>
            </>
        );
    }
}

const mapStateToProps = state => ({
    isLoggedIn: state.loginReducer
  })

export default connect(mapStateToProps)(OrcamentoPromocao);