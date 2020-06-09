export function handleNavbar(e){
    return {
      type: 'TOGGLE_NAVBAR',
      value: e.target.id
    }
  }