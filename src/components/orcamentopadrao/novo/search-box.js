import Autosuggest from 'react-autosuggest';
import React from 'react';
import { Form } from 'react-bootstrap';
import './style.css';

  function escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
  
  function getSuggestions(value, clientes) {
    const escapedValue = escapeRegexCharacters(value.trim());
    const regex = new RegExp('^' + escapedValue, 'i');
    
    return clientes.filter(user => regex.test(user.nome) || regex.test(user.cod));
  }
  
  function getSuggestionNickname(suggestion) {
    return suggestion.nome;
  }
 
  function renderSuggestion(suggestion) {
    return (
      <span>{suggestion.cod} - {suggestion.nome}</span>
    );
  }
  
  class SearchBox extends React.Component {
    constructor() {
      super();
  
      this.state = {
        nicknameValue: '',
        nicknameSuggestions: [],
        clienteCod: '',
      };    
    }
  
    onNicknameChange = (event, { newValue }) => {
      this.setState({
        nicknameValue: newValue
      });
    };
 
    onNicknameSuggestionsFetchRequested = ({ value }) => {
      this.setState({
        nicknameSuggestions: getSuggestions(value, this.props.clientes)
      });
    };
  
    onNicknameSuggestionsClearRequested = () => {
      this.setState({
        nicknameSuggestions: []
      });
    };
  
    onNicknameSuggestionSelected = (event, { suggestion }) => {
      this.setState({
        clienteCod: suggestion.cod
      });
      this.props.handleSubmit(suggestion);
    };

    render() {
      const { 
        nicknameValue, 
        nicknameSuggestions,  
      } = this.state;
      const nicknameInputProps = {
        value: nicknameValue,
        className: "form-control",
        onChange: this.onNicknameChange
      };
  
      return (
        <div className="col-md-5">
            <Form.Label>{this.props.title}</Form.Label>
            <Autosuggest 
            suggestions={nicknameSuggestions}
            onSuggestionsFetchRequested={this.onNicknameSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onNicknameSuggestionsClearRequested}
            onSuggestionSelected={this.onNicknameSuggestionSelected}
            getSuggestionValue={getSuggestionNickname}
            renderSuggestion={renderSuggestion}
            inputProps={nicknameInputProps}
            className="form-control"
          />
        </div>
      );
    }
  }
  
export default SearchBox;