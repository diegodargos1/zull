import axios from 'axios';

export async function postConsulta(tipo, e){
    const dataPost = {tipo: tipo, data: e};
    const url = "http://zullcomunicacao.com.br";
    return await axios({
      method: 'post',
      url: url+'/api/consulta-'+tipo+'.php',
      data: dataPost,
      }).then( function(response){
        return response.data.value;
      }).catch(function(error){

      });
  }

  export async function postConsultaClienteDetalhe(tipo, e){
    const dataPost = {tipo: tipo, data: e};
    const url = "http://zullcomunicacao.com.br";
    return await axios({
      method: 'post',
      url: url+'/api/consulta-detalhes-'+tipo+'.php',
      data: dataPost,
      }).then( function(response){
        return response.data;
      }).catch(function(error){

      });
  }

  export async function postConsultaOrcamentoDetalhe(e){
    const dataPost = {data: e};
    const url = "http://zullcomunicacao.com.br";
    return await axios({
      method: 'post',
      url: url+'/api/orcamento-detalhes.php',
      data: dataPost,
      }).then( function(response){
        return response.data;
      }).catch(function(error){

      });
  }

  export async function postConsultaOrcamentoParente(e){
    const dataPost = {data: e};
    const url = "http://zullcomunicacao.com.br";
    return await axios({
      method: 'post',
      url: url+'/api/orcamento-parentes.php',
      data: dataPost,
      }).then( function(response){
        return response.data.value;
      }).catch(function(error){

      });
  }

  export async function postConsultaOrcamentoDetalhePadrao(e){
    const dataPost = {data: e};
    const url = "http://zullcomunicacao.com.br";
    return await axios({
      method: 'post',
      url: url+'/api/orcamento-detalhes-padrao.php',
      data: dataPost,
      }).then( function(response){
        return response.data;
      }).catch(function(error){

      });
  }
