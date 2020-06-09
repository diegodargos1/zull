import React from 'react';
import { Button, Modal, Table } from 'react-bootstrap';
import './style.css';

class NovoOrcamentoPdf extends React.Component{
    constructor(props){
        super();
        this.state = {
            pdf: props.pdf,
            Cliente: {
                FantasiaEmpresa: "",
                RazaoSocial: "",
                Cnpj: "",
                Solicitante: "",
                EmailSolicitante: "",
                TelefoneSolicitante: "",
            },
            Evento: {
                NomeOrcamento: "",
                DataEvento: "",
                PaisEvento: "",
                EstadoEvento: "",
                ObsEvento: "",
            },
            Valores: {
                ValorTotal: "",
                ValorTotalImposto: "",
            },
            Items: []
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.pdf !== this.state.pdf) {
            let cliente = "";
            let evento = "";
            let valores = "";
            let items = [];
            if(nextProps.dados.clienteDetalhe){
                cliente = {
                    FantasiaEmpresa: (nextProps.dados.clienteDetalhe.Nome) ? nextProps.dados.clienteDetalhe.Nome : "",
                    RazaoSocial: (nextProps.dados.clienteDetalhe.RazaoSocial) ? nextProps.dados.clienteDetalhe.RazaoSocial : "",
                    Cnpj: (nextProps.dados.clienteDetalhe.Cnpj) ? nextProps.dados.clienteDetalhe.Cnpj : "",
                    Solicitante: (nextProps.dados.contato.nome) ? nextProps.dados.contato.nome : "",
                    EmailSolicitante: (nextProps.dados.contato.Email) ? nextProps.dados.contato.Email : "",
                    TelefoneSolicitante: (nextProps.dados.contato.Telefone) ? nextProps.dados.contato.Telefone : "",
                }
            }
            if(nextProps.dados.edited){
                evento = {
                    NomeOrcamento: nextProps.dados.edited.nomeOrcamento,
                    DataEvento: nextProps.dados.edited.dataOrcamento,
                    PaisEvento: nextProps.dados.edited.paisEvento,
                    EstadoEvento: nextProps.dados.edited.estadoEvento,
                    ObsEvento: nextProps.dados.edited.obsOrcamento,
                }
            }
            if(nextProps.dados.edited.items){
                valores = {
                    ValorTotal: nextProps.dados.edited.items.data.valorTotalOrcamento,
                    ValorTotalImposto: nextProps.dados.edited.items.data.valorImpostoOrcamento,
                }
                if(nextProps.dados.edited.items.items){
                    for(let k in nextProps.dados.edited.items.items){
                        if(nextProps.dados.edited.items.items[k] !== null){
                            let outro = (nextProps.dados.edited.items.items[k]["itemText"] !== "") ? false : nextProps.dados.edited.items.items[k]["novoItem_"+k];
                            
                            let obj = {
                                quantidade: nextProps.dados.edited.items.items[k]["quantidadeOrcamento_"+k],
                                itemText: nextProps.dados.edited.items.items[k]["itemText"],
                                diarias: nextProps.dados.edited.items.items[k]["diariasOrcamento_"+k],
                                item: nextProps.dados.edited.items.items[k]["itemOrcamento_"+k],
                                quantidadeLocal: nextProps.dados.edited.items.items[k]["quatidadelocalOrcamento_"+k],
                                cobrarTotal: nextProps.dados.edited.items.data.cobrarTotalLinha[k],
                                cobrarUnitario: nextProps.dados.edited.items.data.cobrarUnitario[k],
                                outro: outro,
                            }
                            items.push(obj);        
                        }
                    }
                }
            }
          this.setState({ 
            pdf: nextProps.pdf,
            Cliente: cliente,
            Evento: evento,
            Valores: valores,
            Items: items,
         });
        }
      }

    render(){
        return(
            <Modal 
            dialogClassName="modal-90w print"
            show={this.state.pdf} 
            onHide={() => this.props.handlePdf(false)} 
            aria-labelledby="example-modal-sizes-title-lg">
            <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">
                Zull Comunicação
                <Button variant="primary no-print" onClick={() => {window.print()}} style={{right: 0, position: "absolute", marginRight: "50px"}}> 
                    PDF Download
                </Button>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="col-md-6 d-inline-block detalhes">
                <div className="col-md-12">
                        <label className="form-label">
                            <b>Razão Social:</b>
                        </label>
                        <p>{this.state.Cliente.RazaoSocial}</p>
                    </div>
                    <div className="col-md-12">
                        <label className="form-label">
                            <b>Nome Fantasia:</b>
                        </label>
                        <p>{this.state.Cliente.FantasiaEmpresa}</p>
                    </div>
                    <div className="col-md-12">
                        <label className="form-label">
                            <b>CNPJ/CPF:</b>
                        </label>
                        <p>{this.state.Cliente.Cnpj}</p>
                    </div>
                    <div className="col-md-12">
                        <label className="form-label">
                            <b>Solicitante:</b>
                        </label>
                        <p>{this.state.Cliente.Solicitante}</p>
                    </div>
                    <div className="col-md-12">
                        <label className="form-label">
                            <b>Email Solicitante:</b>
                        </label>
                        <p>{this.state.Cliente.EmailSolicitante}</p>
                    </div>
                    <div className="col-md-12">
                        <label className="form-label">
                            <b>Telefone Solicitante:</b>
                        </label>
                        <p>{this.state.Cliente.TelefoneSolicitante}</p>
                    </div>
                </div>
                <div className="col-md-6 d-inline-block detalhes" style={{verticalAlign: "top"}}>
                    <div className="col-md-12">
                        <label className="form-label">
                            <b>Nome do Orçamento:</b>
                        </label>
                        <p>{this.state.Evento.NomeOrcamento}</p>
                    </div>
                    <div className="col-md-12">
                        <label className="form-label">
                            <b>Local do Evento:</b>
                        </label>
                        <p>{this.state.Evento.PaisEvento} - {this.state.Evento.EstadoEvento}</p>
                    </div>
                    <div className="col-md-12">
                        <label className="form-label">
                            <b>Data do Evento:</b>
                        </label>
                        <p>{this.state.Evento.DataEvento}</p>
                    </div>
                    <div className="col-md-12">
                        <label className="form-label">
                            <b>Descritivo:</b>
                        </label>
                        <p>{this.state.Evento.ObsEvento}</p>
                    </div>
                </div>
                <hr></hr>
                <div className="col-md-12">
                    <Table striped bordered hover size="sm" responsive>
                        <thead>
                            <tr>
                                <th>
                                    Produto Orçado
                                </th>
                                <th>
                                    Quantidade
                                </th>
                                <th>
                                    Diárias
                                </th>
                                <th>
                                    Qtd Locais
                                </th>
                                <th>
                                    Valor Unitário
                                </th>
                                <th>
                                    Valor Total
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                           {this.state.Items.map((item, i) => 
                            <tr key={i}>
                                <td>
                                    {(item.outro) ? item.outro : item.itemText}
                                </td>
                                <td>
                                    {item.quantidade}
                                </td>
                                <td>
                                    {item.diarias}
                                </td>
                                <td>
                                    {item.quantidadeLocal}
                                </td>
                                <td>
                                    {item.cobrarUnitario}
                                </td>
                                <td>
                                    {item.cobrarTotal}
                                </td>
                            </tr>
                            )}
                        </tbody>
                    </Table>
                </div>
                <hr></hr>
                <div className="col-md-6 d-inline-block detalhes" style={{height: "10px"}}></div>
                <div className="col-md-6 d-inline-block detalhes" style={{verticalAlign: "top"}}>
                    <div className="col-md-12">
                        <label className="form-label">
                            <b>Valor Total do Orçamento:</b>
                        </label>
                        <p>{this.state.Valores.ValorTotal}</p>
                    </div>
                </div>
            </Modal.Body>
            </Modal>
        )
    }
}

export default NovoOrcamentoPdf;