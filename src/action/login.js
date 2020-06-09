import axios from 'axios';

export function authLogin(empresa, user){
  return {
    type: 'CLICK_LOGIN',
    auth: true,
    isLoggedIn: true,
    User_id: user,
    Empresa: empresa
  }
}

export function loginConnected(action, token = {'auth': false}){
  if(token.auth){
    return {
      type: 'CLICK_LOGIN',
      auth: token.auth,
      isLoggedIn: true,
      User_id: token.User_id,
      Empresa: token.Empresa
    }
  }
  return {
    type: 'NOT_LOGIN',
    action
  }
};

export function handleLogin(action, callback, session = false){
   if((action.login && action.password) || session)  {
    let dataPost = JSON.stringify(action);
    const url = "http://zullcomunicacao.com.br";
    axios({
      method: 'post',
      url: url+'/api/login.php',
      data: dataPost,
      withCredentials: true,
    }).then( function(response){
      if(!response.data.connection){
        if(!session)alert('Erro ao conectar, favor contactar o ADM do sistema');
        return {
          type: 'NO_CONNECTION',
          action
        }
      }
      if(response.data.auth){
        let user_id = localStorage.getItem('user');
        let empresa = localStorage.getItem('empresa');
        if(user_id === null || empresa === null){
          user_id = localStorage.setItem('user', response.data.User_id);
          empresa = localStorage.setItem('empresa', response.data.Empresa);
        }
        callback(action, response.data);
        return{
          type: 'CLICK_LOGIN',
          auth: true,
        }
      }else{
        if(response.data.msg)alert(response.data.msg);
        return {
          type: 'NOT_LOGIN',
          action
        }
      }
    }).catch(function(error){
      alert('Erro ao conectar, favor contactar o ADM do sistema');
      return {
        type: 'NO_CONNECTION',
        action
      }
    });
  }
  return {
    type: 'NO_CONNECTION',
    action
  }
}

export function handleOnChange(action, e){
  if(e.target.value != ''){
    return {
      type: 'FILL_LOGIN',
      [e.target.name]: e.target.value
    }
  }
  return {
    type: 'NOT_LOGIN',
  }
}