const initialState = {
  conteudo: 'teste',
};
export default function inicioReducer(state = initialState, action){
  if(action.type == 'TOGGLE_NAVBAR'){
    return {
      ...state,
      activeNavbar: action.navbar
    }
  }else{
      return state;
  }
};