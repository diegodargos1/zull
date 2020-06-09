import React from 'react';
import { Form, Table, Button } from 'react-bootstrap';
import equal from 'fast-deep-equal'
import Helmet from 'react-helmet';
import DayPicker, { DateUtils } from 'react-day-picker';
import MomentLocaleUtils, {formatDate,parseDate,} from 'react-day-picker/moment';
import 'react-day-picker/lib/style.css';
import Example from './bloco-pre-viagem.jsx';
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'

class FormOrcamento extends React.Component{
    constructor(props){
        super();
        this.state = {
            readonly: (props.readonly) ? props.readonly : false,
            items: [],
            linhas: [],
            mesInicio: (props.mesInicio) ? props.mesInicio : new Date(),
            dataEventoCheck: "",
            from: undefined,
            to: undefined,
            dataEventoCheckId: "",
            numberOfMonths: (props.numberOfMonths) ? props.numberOfMonths : 1,
            qtsDias: "",
            qtsNoites: "",
        }
    }

    componentDidUpdate(prevProps) {
        if(!equal(this.props.readonly, prevProps.readonly)){
            this.setState({
                readonly: this.props.readonly,
            })
        }
    } 

    getInitialState = () => {
        return {
          from: undefined,
          to: undefined,
        };
    }

    handleDayClick = async (day) => {
        const range = await DateUtils.addDayToRange(day, this.state);
        await this.setState(range);
        this.handleDataCheck({target: {id: this.state.dataEventoCheckId}});
    }

    handleResetClick = () => {
        this.setState(this.getInitialState());
    }

    handleDataCheck = (e) =>{
        const { from, to } = this.state;
        const modifiers = { start: from, end: to };
        let inputFrom = (from !== undefined) ? new Date(from).toDateString() : "";
        let inputTo = (to !== undefined) ? new Date(to).toDateString() : "";
        if(from !== undefined && to !== undefined){
            let difTime = new Date(to).getTime() - new Date(from).getTime();
            this.setState({
                qtsDias: difTime / (1000 * 3600 * 24),
                qtsNoites: (difTime / (1000 * 3600 * 24))-1,
            });
        }
        this.setState({dataEventoCheckId: e.target.id})
        if(e.target.id == 'determinada'){
            this.setState({dataEventoCheck: <>
            <div className="col-md-12">
                <input style={{width: "40%"}} type="text" readonly value={inputFrom} />
                <span> - </span>
                <input style={{width: "40%"}} type="text" readonly value={inputTo} />
            </div>
            <DayPicker
                showWeekNumbers
                className="Selectable"
                numberOfMonths={this.state.numberOfMonths}
                selectedDays={[from, {from, to} ]}
                modifiers={modifiers}
                formatDate={formatDate}
                parseDate={parseDate}
                onDayClick={(e) => this.handleDayClick(e)}
              /> 
              </>
            })
        }
        if(e.target.id == 'mes'){
            this.setState({dataEventoCheck: <DayPicker
                initialMonth={this.state.mesInicio}
                selectedDays={this.state.selectedDays}
                onDayClick={this.handleDayClick}/> 
            })
        }
        if(e.target.id == 'definir'){
            this.setState({dataEventoCheck: "" })
        }
    }

    render(){
        const { from, to } = this.state;
        const modifiers = { start: from, end: to };
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
                        <Form.Label>Data do Evento:</Form.Label>
                        <Form.Check name="dataEventoCheck" id="definir" type="radio" label="À definir" onClick={(e) => this.handleDataCheck(e)}/>
                        <Form.Check name="dataEventoCheck" id="determinada" type="radio" label="Data determinada" onClick={(e) => this.handleDataCheck(e)}/>
                        <Form.Check name="dataEventoCheck" id="mes" type="radio" label="Mês" onClick={(e) => this.handleDataCheck(e)}/>
                        {this.state.dataEventoCheck}
                        <Helmet>
                            <style>{`
                                .Selectable .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
                                    background-color: #f0f8ff !important;
                                    color: #4a90e2;
                                }
                                .Selectable .DayPicker-Day {
                                    border-radius: 0 !important;
                                }
                                .Selectable .DayPicker-Day--start {
                                    border-top-left-radius: 50% !important;
                                    border-bottom-left-radius: 50% !important;
                                }
                                .Selectable .DayPicker-Day--end {
                                    border-top-right-radius: 50% !important;
                                    border-bottom-right-radius: 50% !important;
                                }
                            `}</style>
                        </Helmet>
                    </div>
                    <div className={"col-md-12"}>
                        <Form.Label>Calcula quantos dias:</Form.Label>
                        <input 
                        type="number"
                        name="qtddias" 
                        className="form-control"
                        readOnly={this.state.readonly}
                        defaultValue={(this.state.qtsDias)}
                        />
                    </div>
                    <div className={"col-md-12"}>
                        <Form.Label>Calcula quantas noites:</Form.Label>
                        <input 
                        type="number"
                        name="qtdnoites" 
                        
                        className="form-control"
                        readOnly={this.state.readonly}
                        defaultValue={(this.state.qtsNoites)}
                        />
                    </div>
                     <div className={"col-md-12"}>
                        <Form.Label>Quantidade de viajantes:</Form.Label>
                        <input 
                        type="number"
                        name="qtdviajantes" 
                        className="form-control"
                        readOnly={this.state.readonly}
                        defaultValue={(this.props.qtdViajantes) ? this.props.qtdViajantes : ""}
                        />
                    </div>
                    <div className={"col-md-12"}>
                        <Form.Label>Quantidade de staff:</Form.Label>
                        <input 
                        type="number"
                        name="qtdstaff" 
                        className="form-control"
                        readOnly={this.state.readonly}
                        defaultValue={(this.props.qtdStaff) ? this.props.qtdStaff : ""}
                        />
                    </div>
                    <div className={"col-md-12"}>
                        <Form.Label>Margem Padrão:</Form.Label>
                        <input 
                        type="number"
                        name="margemPadrao" 
                        id="margemPadrao" 
                        className="form-control"
                        readOnly={this.state.readonly}
                        defaultValue={(this.state.allData)?this.state.allData.orcamento.MargemPadrao:""}
                        onChange={(e) => this.handleChangeOrcamento(e)}
                        />
                    </div>
                    <div className={"col-md-12"}>
                        <Form.Label>Imposto Padrão:</Form.Label>
                        <input 
                        type="number"
                        name="impostoPadrao" 
                        id="impostoPadrao" 
                        className="form-control"
                        readOnly={this.state.readonly}
                        defaultValue={(this.state.allData)?this.state.allData.orcamento.ImpostoPadrao:""}
                        onChange={(e) => this.handleChangeOrcamento(e)}
                        />
                    </div>
                    <div className={"col-md-12"}>
                        <Form.Label>Cambio Dólar:</Form.Label>
                        <input 
                        type="number"
                        name="cambiodolar" 
                        className="form-control"
                        readOnly={this.state.readonly}
                        defaultValue={(this.state.allData)?this.state.allData.orcamento.CambioDolar:""}
                        onChange={(e) => this.handleChangeOrcamento(e)}
                        />
                    </div>
                    <div className={"col-md-12"}>
                        <Form.Label>Cambio Euro:</Form.Label>
                        <input 
                        type="number"
                        name="cambioeuro" 
                        className="form-control"
                        readOnly={this.state.readonly}
                        defaultValue={(this.state.allData)?this.state.allData.orcamento.CambioEuro:""}
                        onChange={(e) => this.handleChangeOrcamento(e)}
                        />
                    </div>
                    <div className={"col-md-12"}>
                        <Form.Label>Cambio Peso:</Form.Label>
                        <input 
                        type="number"
                        name="cambiopeso" 
                        className="form-control"
                        readOnly={this.state.readonly}
                        defaultValue={(this.state.allData)?this.state.allData.orcamento.CambioPeso:""}
                        onChange={(e) => this.handleChangeOrcamento(e)}
                        />
                    </div>
                    <div className={"col-md-12"}>
                        <Form.Label>Dividir itens por:</Form.Label>
                        <input 
                        type="number"
                        name="dividiritens" 
                        className="form-control"
                        readOnly={this.state.readonly}
                        defaultValue={(this.state.allData)?this.state.allData.orcamento.DividirItens:""}
                        onChange={(e) => this.handleChangeOrcamento(e)}
                        />
                    </div>
                </div>
                <Table striped bordered hover size="sm" responsive>
                    <th>Data</th>
                    <th>Serviços</th>
                    <th>Qtd</th>
                    <th>R$ Unit.</th>
                    <th>Total R$</th>
                    <th>R$</th>
                    <th>Total R$</th>
                    <th>Dóllar unit.</th>
                    <th>Total Dóllar</th>
                    <th>Dóllar</th>
                    <th>Total Dólla</th>
                    <th>Obs</th>
                </Table>

                <DndProvider backend={Backend}>
					<Example />
				</DndProvider>
                {/* <div className="col-md-12 no-print" style={{marginTop: "10px"}} >
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
                </div> */}
            </>
        );
    }

}

export default FormOrcamento;