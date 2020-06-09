const initialState = {
  isLoggedIn: false,
  login: false,
  password: false,
  User_id: localStorage.getItem('user'),
  Empresa: localStorage.getItem('empresa'),
  storageId: localStorage.getItem('user'),
};

export default function loginReducer(state = initialState, action){
  if(action.type === 'CLICK_LOGIN'){
    return {
      ...state,
      isLoggedIn: action.auth,
      User_id: action.User_id,
      Empresa: action.Empresa,
    }
  }else if(action.type === 'FILL_LOGIN'){
    return {
      ...state,
      login: (action.login === undefined)  ? state.login : action.login,
      password: (action.password === undefined) ? state.password : action.password,
    }
  }else if(action.type === 'NO_CONNECTION'){
    return {
      ...state,
      isLoggedIn: false,
    }
  }else{
      return state;
  }
};