import React from 'react';
import axios from 'axios';

export async function listBanco(){
  const dataPost = {method: "lista-banco"};
  return await axios({
    method: 'post',
    url: 'http://zullcomunicacao.com.br/api/select.php',
    data: dataPost,
    }).then( function(response){
        return response.data.value;
    }).catch(function(error){
      return {error: false, msg: "Erro de comunicação com o servidor"}
  });
}

export async function tipoFornecedorAll(){
  const dataPost = {method: "tipo-fornecedor-all"};
  return await axios({
    method: 'post',
    url: 'http://zullcomunicacao.com.br/api/select.php',
    data: dataPost
    }).then( function(response){
       return response.data.value;
    }).catch(function(error){
      return {error: false, msg: "Erro de comunicação com o servidor"}
    });
}

export async function tipoFornecedor(){
  const dataPost = {method: "tipo-fornecedor"};
  return await axios({
    method: 'post',
    url: 'http://zullcomunicacao.com.br/api/select.php',
    data: dataPost
    }).then( function(response){
       return response.data.value;
    }).catch(function(error){
      return {error: false, msg: "Erro de comunicação com o servidor"}
    });
}

export async function subtipoFornecedor(data){
  const dataPost = {method: "tipo-servico", search: data};
  return axios({
    method: 'post',
    url: 'http://zullcomunicacao.com.br/api/select.php',
    data: dataPost
    }).then( function(response){
      return response.data.value;
    }).catch(function(error){
        alert("erroooo");
    });
}

export async function listaGrupo(data){
  const dataPost = {method: "lista-grupo"};
  return axios({
    method: 'post',
    url: 'http://zullcomunicacao.com.br/api/select.php',
    data: dataPost
    }).then( function(response){
      return response.data.value;
    }).catch(function(error){
        alert("erroooo");
    });
}

export async function listaPais(data){
  const dataPost = {method: "lista-pais"};
  return axios({
    method: 'post',
    url: 'http://zullcomunicacao.com.br/api/select.php',
    data: dataPost
    }).then( function(response){
      return response.data.value;
    }).catch(function(error){
        alert("erroooo");
    });
}

export async function listaPaisPhone(data){
  const dataPost = {method: "lista-pais-phone"};
  return axios({
    method: 'post',
    url: 'http://zullcomunicacao.com.br/api/select.php',
    data: dataPost
    }).then( function(response){
      return response.data.value;
    }).catch(function(error){
        alert("erroooo");
    });
}

export async function listaEstado(data){
  const dataPost = {method: "lista-estado", search: data};
  return axios({
    method: 'post',
    url: 'http://zullcomunicacao.com.br/api/select.php',
    data: dataPost
    }).then( function(response){
      return response.data.value;
    }).catch(function(error){
        alert("erroooo");
    });
}

export async function listaFormaPagamento(fields){
  const dataPost = {method: fields};
  return axios({
      method: 'post',
      url: 'http://zullcomunicacao.com.br/api/select.php',
      data: dataPost
      }).then( function(response){
        return response.data.value;
      }).catch(function(error){});
}

export async function listaClienteAtivo(data){
  const dataPost = {method: "lista-cliente-ativo"};
  return axios({
    method: 'post',
    url: 'http://zullcomunicacao.com.br/api/select.php',
    data: dataPost
    }).then( function(response){
      return response.data.value;
    }).catch(function(error){
        alert("erroooo");
    });
}

export async function listaClienteTodos(data){
  const dataPost = {method: "lista-cliente-todos"};
  return axios({
    method: 'post',
    url: 'http://zullcomunicacao.com.br/api/select.php',
    data: dataPost
    }).then( function(response){
      return response.data.value;
    }).catch(function(error){
        alert("erroooo");
    });
}

export async function listaContatoCliente(data){
  const dataPost = {method: "lista-contato-cliente", search: data};
  return axios({
    method: 'post',
    url: 'http://zullcomunicacao.com.br/api/select.php',
    data: dataPost
    }).then( function(response){
      return response.data.value;
    }).catch(function(error){
        alert("erroooo");
    });
}

export async function listaAllServico(data){
  const dataPost = {method: "lista-all-servico"};
  return axios({
    method: 'post',
    url: 'http://zullcomunicacao.com.br/api/select.php',
    data: dataPost
    }).then( function(response){
      return response.data.value;
    }).catch(function(error){
        alert("erroooo");
    });
}

export async function listaAllServicoCategoria(data){
  const dataPost = {method: "lista-all-servico-categoria"};
  return axios({
    method: 'post',
    url: 'http://zullcomunicacao.com.br/api/select.php',
    data: dataPost
    }).then( function(response){
      return response.data.value;
    }).catch(function(error){
        alert("erroooo");
    });
}