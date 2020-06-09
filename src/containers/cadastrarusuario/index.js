import React from 'react';
import {connect} from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import RegisterCol1 from '../../components/forms/register-col-1';
import RegisterAddContato from '../../components/forms/register-add-contato';
import {Usuario, UsuarioAddInfo} from '../../components/fields/forms/cadastrarUsuario';
import 'bootstrap/dist/css/bootstrap.min.css';

const CadastrarUsuario = () => (
    <div className="wrapper">
        <div className="">
            <h2>
                Cadastro de Usuário!
            </h2>
        </div>
        <Form className="row w-75 border-top pt-5">
            <RegisterCol1 fields={ Usuario } ></RegisterCol1>
            <RegisterAddContato fields={ UsuarioAddInfo } />
        </Form>
        <Button variant="primary" type="submit">
            Submit
        </Button> 
    </div>
);

/*const mapStateToProps = state => ({
    inicio: state.navbarReducer.Navbars
})

const mapDispatchToProps = dispatch => ({
    
})
*/
export default CadastrarUsuario;