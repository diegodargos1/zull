import axios from 'axios';

export async function postRegister(e, url){
  const dataPost = {data: e};
  return await axios({
    method: 'post',
    url: 'http://zullcomunicacao.com.br/api/form-'+url+'.php',
    data: dataPost,
    }).then( function(response){
        return response.data;
    }).catch(function(error){
      return {error: false, msg: "Erro de comunicação com o servidor"}
    });
}

  
export async function uploadFile(file){
  const formData = new FormData();

  formData.append('documento',file)
  return  await axios.post("http://zullcomunicacao.com.br/api/upload.php", formData,{
      headers: {
          'content-type': 'multipart/form-data'
      }
  });
}

export async function updateRegister(e, url){
  const dataPost = {data: e};
  return await axios({
    method: 'post',
    url: 'http://zullcomunicacao.com.br/api/update-'+url+'.php',
    data: dataPost,
    }).then( function(response){
        return response.data;
    }).catch(function(error){
      return {error: false, msg: "Erro de comunicação com o servidor"}
    });
}

export async function postTempCliente(e, url){
  const dataPost = {data: e};
  return await axios({
    method: 'post',
    url: 'http://zullcomunicacao.com.br/api/form-temp-cliente.php',
    data: dataPost,
    }).then( function(response){
        return response.data;
    }).catch(function(error){
      return {error: false, msg: "Erro de comunicação com o servidor"}
    });
}

export async function postTempContato(e){
  const dataPost = {data: e};
  return await axios({
    method: 'post',
    url: 'http://zullcomunicacao.com.br/api/form-temp-contato.php',
    data: dataPost,
    }).then( function(response){
        return response.data;
    }).catch(function(error){
      return {error: false, msg: "Erro de comunicação com o servidor"}
    });
}

export async function postNovoOrcamento(e){
  const dataPost = {data: e};
  return await axios({
    method: 'post',
    url: 'http://zullcomunicacao.com.br/api/form-novo-orcamento.php',
    data: dataPost,
    }).then( function(response){
        return response.data;
    }).catch(function(error){
      return {error: false, msg: "Erro de comunicação com o servidor"}
    });
}

export async function postGeraOrcamentoPdf(e){
  const dataPost = {id: e};
  return await axios({
    method: 'post',
    url: 'http://zullcomunicacao.com.br/api/class/pdf/orcamento_gera_pdf.php',
    data: dataPost,
    }).then( function(response){
        return response.data;
    }).catch(function(error){
      return {error: false, msg: "Erro de comunicação com o servidor"}
  });
}

export async function postEnviaOrcamento(e){
  const dataPost = {email: e};
  return await axios({
    method: 'post',
    url: 'http://zullcomunicacao.com.br/api/orcamento-email.php',
    data: dataPost,
    }).then( function(response){
        alert("Email enviado com sucesso!");
        return response.data;
    }).catch(function(error){
      return {error: false, msg: "Erro de comunicação com o servidor"}
    });
}

export async function postOrcamentoPadrao(e){
  const dataPost = {idOrcamento: e};
  return await axios({
    method: 'post',
    url: 'http://zullcomunicacao.com.br/api/orcamento_padrao.php',
    data: dataPost,
    }).then( function(response){
        return response.data;
    }).catch(function(error){
      return {error: false, msg: "Erro de comunicação com o servidor"}
  });
}

export async function postOrcamentoPadraoDelete(e){
  const dataPost = {idPadrao: e, delete: true};
  return await axios({
    method: 'post',
    url: 'http://zullcomunicacao.com.br/api/orcamento_padrao.php',
    data: dataPost,
    }).then( function(response){
        return response.data;
    }).catch(function(error){
      return {error: false, msg: "Erro de comunicação com o servidor"}
  });
}

export async function postClienteInfoDelete(id, tabela){
  const dataPost = {id: id, tabela: tabela};
  return await axios({
    method: 'post',
    url: 'http://zullcomunicacao.com.br/api/cliente-info-delete.php',
    data: dataPost,
    }).then( function(response){
        return response.data;
    }).catch(function(error){
      return {error: false, msg: "Erro de comunicação com o servidor"}
  });
}

export async function postNovoOrcamentoPadrao(e){
  const dataPost = {data: e};
  return await axios({
    method: 'post',
    url: 'http://zullcomunicacao.com.br/api/form-novo-orcamento-padrao.php',
    data: dataPost,
    }).then( function(response){
        return response.data;
    }).catch(function(error){
      return {error: false, msg: "Erro de comunicação com o servidor"}
    });
}