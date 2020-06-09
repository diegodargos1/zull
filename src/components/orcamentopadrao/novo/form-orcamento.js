import React from 'react';
import { Form, Table, Button } from 'react-bootstrap';
import equal from 'fast-deep-equal'
import { listaAllServico , listaAllServicoCategoria } from '../../../action/select-post'
import {handleAddLinha} from './linhas-orcamento';
import { calcularCampos} from './regra-negocio';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

class FormOrcamento extends React.Component{
    constructor(props){
        super();
        this.state = {
            contadorLinha: 0,
            readonly: (props.readonly) ? props.readonly : false,
            qtdWidth: "4%",
            itemWidth: "20%",
            margempadraoOrcamento: "1.67",
            impostopadraoOrcamento: "0.1141",
            items: [],
            linhas: [],
            valorTotalOrcamento: (props.allData) ? props.allData.orcamento.ValorTotalOrcamento : 0,
            allData: (props.allData) ? props.allData : false,
            selectedDays: (props.selectedDays) ? props.selectedDays : [],
            mesInicio: (props.mesInicio) ? props.mesInicio : new Date(),
        }
    }

    componentDidUpdate(prevProps) {
        if(!equal(this.props.readonly, prevProps.readonly)){
            this.setState({
                readonly: this.props.readonly,
            })
        }
    } 

    async componentWillMount(){
        const servicos = await listaAllServico();
        const categorias = await listaAllServicoCategoria();
        let linhas = [];
        let items = [];
        let contador = 0; 
        if(this.state.allData){
            let x;
            for(x in this.state.allData.produtos){
                linhas.push(handleAddLinha(x, this.state, this.handleItemsOrcamento, this.handleDeleteLinha, servicos, categorias, this.state.allData.produtos[x]))
                items.push({
                    ["itemOrcamento_"+x] : (this.state.allData.produtos[x].FK_Produto == 0) ? "outro" : this.state.allData.produtos[x].NomeProduto,
                    ["novoItem_"+x] : this.state.allData.produtos[x].NomeProduto,
                    ["quantidadeOrcamento_"+x] : this.state.allData.produtos[x].Quantidade,
                    ["diariasOrcamento_"+x] : this.state.allData.produtos[x].Diarias,
                    ["quatidadelocalOrcamento_"+x] : this.state.allData.produtos[x].QuantidadeLocais,
                    ["custoOrcamento_"+x] : this.state.allData.produtos[x].CustoProduto,
                    ["custototalOrcamento_"+x] : this.state.allData.produtos[x].CustoTotal,
                    ["margemOrcamento_"+x] : this.state.allData.produtos[x].Margem,
                    ["cobrarunitarioOrcamento_"+x] : this.state.allData.produtos[x].CobrarUnitario,
                    ["cobrartotalOrcamento_"+x] : this.state.allData.produtos[x].CobrarTotal,
                    ["obsOrcamento_"+x] : this.state.allData.produtos[x].Obs,
                })
            }
            contador = this.state.allData.produtos.length+1;
        }else{
            linhas = [handleAddLinha(0, this.state, this.handleItemsOrcamento, this.handleDeleteLinha, servicos, categorias)]
        }
        this.setState({
            linhas: linhas,
            servicos: servicos,
            contadorLinha: contador,
            categorias: categorias,
            items: items,
        })
        const obj = await calcularCampos(this.state.items);
        await this.setState({
            ...this.state,
            data: obj,
        })
        this.props.handleOrcamento(this.state, true);
    }

    handleDeleteLinha = async(id) => {
        await this.setState({
            ...this.state,
            items: {
                ...this.state.items,
                [id]: null
            }
        })
        const obj = calcularCampos(this.state.items);

        await this.setState({
            ...this.state,
            data: obj,
        })

        document.getElementById("linha_"+id).remove();
        this.props.handleDelete(id);
    }
    
    handleAddLinha = async () => {
        const contador = this.state.contadorLinha + 1;
        const linhas = this.state.linhas;
        linhas.push( await handleAddLinha(contador, this.state, this.handleItemsOrcamento, this.handleDeleteLinha, this.state.servicos, this.state.categorias));
        
        this.setState({
            linhas: linhas,
            contadorLinha: contador,
        })
    }

    handleChangeOrcamento = async (e) => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value,
        })
        this.props.handleOrcamento(e);
        if(e.target.name === "margempadraoOrcamento"){
            let margem = document.getElementsByClassName('margemItemOrcamento');
            let items = this.state.items;
            for(let k = 0; k < margem.length ; k++){
                margem[k].value = e.target.value;
                const index = margem[k].name.split('_')[1];
                if(items[index]){
                    items[index][margem[k].name] = e.target.value;
                }
            }
            
            this.setState({
                items: items
            })
        }
        const obj = await calcularCampos(this.state.items);

        await this.setState({
            ...this.state,
            data: obj,
        })
        this.props.handleOrcamento(this.state, true);
    }

    handleDayClick = (day, { selected }) => {
        const { selectedDays } = this.state;
        if (selected) {
          const selectedIndex = selectedDays.findIndex(selectedDay =>
            DateUtils.isSameDay(selectedDay, day)
          );
          selectedDays.splice(selectedIndex, 1);
        } else {
          selectedDays.push(day);
        }
        this.props.dayClick( selectedDays );
    }

    handleItemsOrcamento = async (i, e) => {
        let select = "";
        if(e.target.name === "itemOrcamento_"+i){           
            if(e.target.value === 'outro'){
                document.getElementById("novoItem_"+i).style.display = "inline-block";
                document.getElementById("itemCategoria_"+i).style.display = "inline-block";
            }else{
                select = e.target.options[e.target.selectedIndex].text;
                document.getElementById("novoItem_"+i).style.display = "none";
                document.getElementById("itemCategoria_"+i).style.display = "none";
            }
            await this.setState({
                items: {
                    ...this.state.items,
                    [i]: {
                        ...this.state.items[i],
                        [e.target.name]: e.target.value,
                        itemText: select,
                    },
                },
            });
        }else{
            await this.setState({
                items: {
                    ...this.state.items,
                    [i]: {
                        ...this.state.items[i],
                        [e.target.name]: e.target.value,
                    },
                },
            }); 
        }

        const obj = await calcularCampos(this.state.items);
        await this.setState({
            data: obj
        }); 
        //const {custoTotal, margem, cobrarTotal, cobrarUnitario} = calculoTabelaOrcamento(i, e, this.state);
        this.props.handleOrcamento(this.state, true);
    }

    render(){
        return (
            <>
                <div className="col-md-6 d-inline-block detalhes no-print">
                    <div className={"col-md-12"}>
                        <Form.Label>Nome do Orçamento:</Form.Label>
                        <input 
                        type="text"
                        name="nomeOrcamento" 
                        className="form-control"
                        defaultValue={(this.state.allData)?this.state.allData.orcamento.Nome:""}
                        readOnly={this.state.readonly}
                        onChange={(e) => this.handleChangeOrcamento(e)}
                        />
                    </div>
                    <div className={"col-md-12"}>
                        <Form.Label>Data do Evento:</Form.Label>
                        <DayPicker
                            initialMonth={this.state.mesInicio}
                            selectedDays={this.state.selectedDays}
                            onDayClick={this.handleDayClick}
                        />
                        
                        {/* <input 
                        type="date"
                        name="dataOrcamento" 
                        className="form-control"
                        defaultValue={(this.state.allData)?this.state.allData.orcamento.DataEvento:""}
                        readOnly={this.state.readonly}
                        onChange={(e) => this.handleChangeOrcamento(e)}
                        /> */}
                    </div>
                    <div className={"col-md-12"}>
                        <Form.Label>Descritivo:</Form.Label>
                        <textarea 
                        type="text"
                        name="obsOrcamento" 
                        className="form-control"
                        readOnly={this.state.readonly}
                        defaultValue={(this.state.allData)?this.state.allData.orcamento.Descritivo:""}
                        onChange={(e) => this.handleChangeOrcamento(e)}
                        />
                    </div>
                    <div className={"col-md-12"}>
                        <Form.Label>Margem Padrão:</Form.Label>
                        <input 
                        type="number"
                        name="margempadraoOrcamento" 
                        className="form-control"
                        readOnly={this.state.readonly}
                        defaultValue={(this.state.allData)?this.state.allData.orcamento.MargemPadrao: this.state.margempadraoOrcamento}
                        onChange={(e) => this.handleChangeOrcamento(e)}
                        />
                    </div>
                    <div className={"col-md-12"}>
                        <Form.Label>Imposto Padrão:</Form.Label>
                        <input 
                        type="number"
                        name="impostopadraoOrcamento" 
                        id="impostopadraoOrcamento" 
                        className="form-control"
                        readOnly={this.state.readonly}
                        defaultValue={(this.state.allData)?this.state.allData.orcamento.ImpostoPadrao: this.state.impostopadraoOrcamento}
                        onChange={(e) => this.handleChangeOrcamento(e)}
                        />
                    </div>
                    <div className={"col-md-12"}>
                        <Form.Label>Rateio:</Form.Label>
                        <input 
                        type="number"
                        name="rateioOrcamento" 
                        id="rateioOrcamento" 
                        className="form-control"
                        readOnly={this.state.readonly}
                        defaultValue={(this.state.allData)?this.state.allData.orcamento.Rateio:""}
                        onChange={(e) => this.handleChangeOrcamento(e)}
                        />
                    </div>
                </div>
                <div className="col-md-12 no-print" style={{marginTop: "10px"}} >
                    <Table striped bordered hover size="sm" responsive>
                        <thead>
                            <tr>
                                <th style={{width: this.state.itemWidth }}>
                                    Item Orçado
                                </th>
                                <th style={{width: this.state.qtdWidth }}>
                                    Quantidade
                                </th>
                                <th style={{width: this.state.qtdWidth }}>
                                    Diárias
                                </th>
                                <th style={{width: this.state.qtdWidth }}>
                                    Qtd Locais
                                </th>
                                <th>
                                    Custo R$
                                </th>
                                <th>
                                    Custo Total
                                </th>
                                <th>
                                    Margem
                                </th>
                                <th>
                                    Cobrar Unitário
                                </th>
                                <th>
                                    Cobrar Total
                                </th>
                                <th style={{width: this.state.itemWidth }}>
                                    Obs
                                </th>
                                <th>
                                    Remover
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.linhas.map((l, i )=> <React.Fragment key={i}>{l}</React.Fragment>)}
                        </tbody>
                    </Table>
                    <Button  variant="primary" onClick={this.handleAddLinha}>
                        Adicionar Item
                    </Button>
                </div>
                <div className="col-md-6 d-inline-block no-print"></div>
                <div className="col-md-6 d-inline-block no-print">
                    <div className={"col-md-12"}>
                        <Form.Label>Valor Total:</Form.Label>
                        <input 
                        type="number"
                        name="valorTotalOrcamento"
                        id="valorTotalOrcamento"
                        className="form-control"
                        readOnly={this.state.readonly}
                        defaultValue={this.state.valorTotalOrcamento}
                        onChange={(e) => this.handleChangeOrcamento(e)}
                        />
                        <Form.Label>Valor Agencia:</Form.Label>
                        <input 
                        type="number"
                        name="valorAgenciaOrcamento" 
                        id="valorAgenciaOrcamento" 
                        readOnly={this.state.readonly}
                        defaultValue={(this.state.allData) ? this.state.allData.orcamento.ValorTotalAgencia : this.state.valorAgenciaOrcamento}
                        className="form-control"
                        onChange={(e) => this.handleChangeOrcamento(e)}
                        />
                        <Form.Label>Valor Imposto:</Form.Label>
                        <input 
                        type="number"
                        name="valorImpostoOrcamento" 
                        id="valorImpostoOrcamento" 
                        readOnly={this.state.readonly}
                        defaultValue={(this.state.allData) ? this.state.allData.orcamento.ValorTotalImposto : this.state.valorImpostoOrcamento}
                        className="form-control"
                        onChange={(e) => this.handleChangeOrcamento(e)}
                        />
                        <Form.Label>Valor Percentual:</Form.Label>
                        <input 
                        type="number"
                        name="valorPercentualOrcamento" 
                        id="valorPercentualOrcamento" 
                        readOnly={this.state.readonly}
                        defaultValue={(this.state.allData) ? this.state.allData.orcamento.ValorTotalPercentual : this.state.valorPercentualOrcamento}
                        className="form-control"
                        onChange={(e) => this.handleChangeOrcamento(e)}
                        />
                    </div>
                </div>
            </>
        );
    }

}

export default FormOrcamento;