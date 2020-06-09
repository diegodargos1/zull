import React from 'react';
import { connect } from 'react-redux';
import { postConsultaClienteDetalhe } from '../../../action/consulta-post';
import FormCliente from '../../../components/orcamento/novo/form-cliente';
import ClienteDetalhe from '../../../components/orcamento/novo/cliente-detalhe';
import FormOrcamento from '../../../components/orcamento/novo/form-orcamento';
import 'bootstrap/dist/css/bootstrap.min.css';

class OrcamentoViagem extends React.Component{
    constructor(props){
        super();
        this.state = {
            "User_id": props.isLoggedIn.User_id,
            "Empresa": props.isLoggedIn.Empresa,
            "TipoOrcamento": "Viagem",
            "edited": "",
            clienteDetalhe: false,
        }
    }

    handleFormCliente = async (e) => {
        document.getElementById("loading").style.display = "block";
        this.setState({
            clienteDetalhe: await postConsultaClienteDetalhe("cliente", e),
        })
        document.getElementById("loading").style.display = "none";
    }

    render(){
        return (
            <div className="wrapper">
                <div className="">
                    <h2>
                        Orçamento de Viagens!
                    </h2>
                </div>
                <FormCliente tipo="Viagem" formCliente={this.handleFormCliente} user={this.state.User_id} empresa={this.state.Empresa} />
                {(this.state.clienteDetalhe) ? 
                    <div className="col-md-12">
                        <ClienteDetalhe data={this.state.clienteDetalhe} /> 
                        <FormOrcamento data={this.state.clienteDetalhe} />
                    </div>
                : "" }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isLoggedIn: state.loginReducer
  })

export default connect(mapStateToProps)(OrcamentoViagem);