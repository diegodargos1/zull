

import React from 'react';
import { Form, Button } from 'react-bootstrap';
import equal from 'fast-deep-equal';


class BotoesOrcamento extends React.Component{
    constructor(props){
        super();
        this.state = {
            padrao: (props.padrao) ? props.padrao : 0,
        }
    }

    componentDidUpdate(prevProps) {
        if(!equal(this.props.readonly, prevProps.readonly)){
            this.setState({
                readonly: this.props.readonly,
            })
        }
        if(!equal(this.props.padrao, prevProps.padrao)){
            this.setState({
                padrao: this.props.padrao,
            })
        }
    } 
    
    render(){
        return (
            <div className="col-md-12 border-top" style={{padding: "10px 0", marginTop: "10px"}}>
                <div className="col-md-6 d-inline-block">
                    <Form.Label>Enviar para:</Form.Label>
                    <input 
                    type="text"
                    name="orcamentoEmail" 
                    className="form-control"
                    onChange={(e) => this.props.handleChange(e)}
                    />
                </div>
                <div className="col-md-6 d-inline-block">
                    {(this.props.readonly) ? 
                        <Button className="col-md-6 d-block mt-2" variant="primary" onClick={this.props.handleGerarPdf}>
                            Gerar PDF
                        </Button>
                        :
                        <>
                        <Button className="col-md-6 d-block mt-2" variant="primary" onClick={this.props.handleSalvar}>
                            Salvar
                        </Button>
                        <Button className="col-md-6 d-block mt-2" variant="primary" onClick={this.props.handlePdf}>
                            Gravar PDF
                        </Button>
                        </>
                    }
                    {
                        (this.state.padrao == 1) ?
                        <Button className="col-md-6 d-block mt-2" variant="danger" onClick={this.props.handlePadraoDelete}>
                            Remover Padrão
                        </Button>
                        :
                        <Button className="col-md-6 d-block mt-2" variant="primary" onClick={this.props.handlePadrao}>
                            Tornar Padrão
                        </Button>

                    }
                    <Button className="col-md-6 d-block mt-2" variant="primary" onClick={this.props.handleEnviar}>
                        Enviar
                    </Button>
                    
                </div>
            </div>
        );
    }

}
export default BotoesOrcamento;