import React from 'react';
import './style.css';
import  {Provider} from 'react-redux';
import  {store} from './store';
import Routes from './routes';

class App extends React.Component {
  constructor(){
    super();
   
  }

  render(){
    return(
      <Provider store={store}>
        <Routes />
      </Provider>
    );
  }
}

export default App;
