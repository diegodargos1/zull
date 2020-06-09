import React from 'react';
import {connect} from 'react-redux';
import * as NavbarActions from '../../action/navbar'
import '../../css/navbar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

function handleClick(){
  localStorage.removeItem("user");
  localStorage.removeItem("empresa");
}

const CustomNavbar = ({navbars, handleNavbar}) => (
<Navbar bg="dark" variant='dark' expand="lg">
  <Navbar.Brand href="/incio" id="Inicio">Zull</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <NavDropdown title="Cadastro" id="basic-nav-dropdown">
        <NavDropdown.Item href="/cadastroclientepj">Cliente PJ</NavDropdown.Item>
        <NavDropdown.Item href="/cadastroclientepf" id="CadastrarClientePF">Cliente PF</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="/cadastrofornecedorpj" id="CadastrarFornecedorPJ">Fornecedor PJ</NavDropdown.Item>
        <NavDropdown.Item href="/cadastrofornecedorpf" id="CadastrarFornecedorPF">Fornecedor PF</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="/cadastrofuncionario">Funcionário</NavDropdown.Item>
        <NavDropdown.Divider />
        
      </NavDropdown>
      <NavDropdown title="Consulta" id="basic-nav-dropdown">
        <NavDropdown.Item href="/consultacliente" id="ConsultaCliente">Cliente</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="/consultafornecedor" id="ConsultaFornecedor">Fornecedor</NavDropdown.Item>
      </NavDropdown>
      <NavDropdown title="Orc Promo" id="basic-nav-dropdown">
        <NavDropdown.Item href="/orcamentopromocao" >Novo Orçamento Promoção</NavDropdown.Item>
        <NavDropdown.Item href="/orcamentoconsulta" >Consultar Orçamentos Promoção</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="/orcamentopadrao" >Novo Orçamento Padrão</NavDropdown.Item>
        <NavDropdown.Item href="/orcamentoconsultapadrao" >Consultar Orçamentos Padrão</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="/orcamentoviagem" >Novo Orçamento Viagem</NavDropdown.Item>
        <NavDropdown.Item href="/orcamentoconsultaviagem" >Consultar Orçamentos Viagem</NavDropdown.Item>
      </NavDropdown>
      <NavDropdown title="Orc Viagem" id="basic-nav-dropdown">
        <NavDropdown.Item href="/orcamentoviagem" >Novo Orçamento Viagem</NavDropdown.Item>
        <NavDropdown.Item href="/orcamentoconsultaviagem" >Consultar Orçamentos Viagem</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="/orcamentopadrao" >Novo Orçamento Padrão</NavDropdown.Item>
        <NavDropdown.Item href="/orcamentoconsultapadrao" >Consultar Orçamentos Padrão</NavDropdown.Item>
      </NavDropdown>
    </Nav>
    <Nav className="mr-auto justify-content-end" style={{ width: "100%" }}>
        <Nav.Link href="/" onClick={handleClick}>Logout</Nav.Link>
      </Nav>
  </Navbar.Collapse>
</Navbar>
);
//<Nav.Link href="#evento" id="Evento">Novo Evento</Nav.Link>
//<Nav.Link href="#orcamento" id="Orcamento">Orçamento</Nav.Link>
//<NavDropdown.Item href="#cadastrar/funcionario" id="CadastrarFuncionario" onClick={(e) => handleNavbar(e)}>Funcionario</NavDropdown.Item>
//<NavDropdown.Item href="#cadastrar/usuario" id="CadastrarUsuario" onClick={(e) => handleNavbar(e)}>Usuario</NavDropdown.Item>
const mapStateToProps = state => ({
    navbars: state.navbarReducer.Navbars
})

const mapDispatchToProps = dispatch => ({
    handleNavbar: (e) => dispatch(NavbarActions.handleNavbar(e))
})

export default connect(mapStateToProps, mapDispatchToProps)(CustomNavbar);