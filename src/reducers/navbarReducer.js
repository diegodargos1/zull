import Inicio from '../containers/inicio';
import CadastrarClientePF from '../containers/cadastrarclientepf';
import CadastrarClientePJ from '../containers/cadastrarclientepj';
import CadastrarFornecedorPJ from '../containers/cadastrarfornecedorpj';
import CadastrarFornecedorPF from '../containers/cadastrarfornecedorpf';
import CadastrarFuncionario from '../containers/cadastrarfuncionario';
import ConsultaCliente from '../containers/consultacliente';
import ConsultaFornecedor from '../containers/consultafornecedor';
const initialState = {
  activeNavbar: Inicio,
  Inicio: {
      click: Inicio
    },
    CadastrarClientePF:
    {
      click: CadastrarClientePF
    },
    CadastrarClientePJ:
    {
      click: CadastrarClientePJ
    },
    CadastrarFornecedorPJ:
    {
      click: CadastrarFornecedorPJ
    },
    CadastrarFornecedorPF:
    {
      click: CadastrarFornecedorPF
    },
    CadastrarFuncionario:
    {
      click: CadastrarFuncionario
    },
    ConsultaCliente:
    {
      click: ConsultaCliente
    },
    ConsultaFornecedor:
    {
      click: ConsultaFornecedor
    },
};
export default function navbarReducer(state = initialState, action){
  if(action.type == 'TOGGLE_NAVBAR'){
    return {
      ...state,
      activeNavbar: state[action.value].click
    }
  }else{
      return state;
  }
};