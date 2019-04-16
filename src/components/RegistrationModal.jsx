import React, { Component } from 'react';
import { 
  Button,
  Modal,
  ModalHeader,
  ModalBody, 
  ModalFooter, 
  Form, 
  FormGroup, 
  Label, 
  Input 
} from "reactstrap";
import axios from 'axios';

class RegistrationModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      email: '',
      password: '',
      firstname: '',
      lastname: '',
      username: '',
      formErrors: { email: '', password: '', username: '', firstname: '', lastname: '' },
      emailValid: false,
      passwordValid: false,
      usernameValid: false,
      firstnameValid: false,
      lastnameValid: false,
      formValid: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value},
                  () => { this.validateField(name, value) });
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;
    let usernameValid = this.state.usernameValid;
    let firstnameValid = this.state.firstnameValid;
    let lastnameValid = this.state.lastnameValid;

    switch(fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : ' is invalid';
        break;
      case 'password':
        passwordValid = value.length > 0;
        fieldValidationErrors.password = passwordValid ? '': ' need to be present';
        break;
      case 'username':
        usernameValid = value.length > 0;
        fieldValidationErrors.username = usernameValid ? '': ' need to be present';
        break;
      case 'firstname':
        firstnameValid = value.length > 0;
        fieldValidationErrors.firstname = firstnameValid ? '': ' need to be present';
        break;
      case 'lastname':
        lastnameValid = value.length > 0;
        fieldValidationErrors.lastname = lastnameValid ? '': ' need to be present';
        break;
      default:
        break;
    }
    this.setState({ emailValid: emailValid,
                    passwordValid: passwordValid,
                    usernameValid: usernameValid,
                    firstnameValid: firstnameValid,
                    lastnameValid: lastnameValid,
                    formErrors: fieldValidationErrors,
                  }, this.validateForm);
  }

  validateForm() {
    this.setState(
      {
        formValid: this.state.emailValid && this.state.passwordValid && this.state.usernameValid
      }
    );
  }

  handleSubmit(event) {
    event.preventDefault();
    let data = JSON.stringify({
      user: {
        email: this.state.email,
        password: this.state.password,
        username: this.state.username,
        firstname: this.state.firstname,
        lastname: this.state.lastname,
      },
      client_id: 'a4b4c2dfd520d587f2fa2aa20641d7bfd489fff2bd60e62fd3d2700ecbffac22',
      client_secret: '576a063520f7f5c29f9c579b7755f1e0ef4f45f5f380455dd4907b52c2e4e0e7'
  })

    axios.post('http://localhost:3000/api/v1/users', data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      this.toggle();
    })
    .catch(error => {
      console.log(error);
    });
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  render() {
    return (
      <div>
        <Button color="success" onClick={this.toggle}>
          {this.props.buttonLabel}
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
        <Form onSubmit={this.handleSubmit}>
          <ModalHeader toggle={this.toggle}>Registration</ModalHeader>
          <ModalBody>
          <div className="panel panel-default">
          {Object.keys(this.state.formErrors).map((fieldName, i) => {
            if(this.state.formErrors[fieldName].length > 0){
              return (
                <p key={i}>{fieldName} {this.state.formErrors[fieldName]}</p>
              )        
            } else {
              return '';
            }
          })}
        </div>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input id="email" name="email"
                type="email" value={this.state.email} onChange={this.handleUserInput} />
            </FormGroup>

            <FormGroup>
              <Label for="password">Password</Label>
              <Input id="password" name="password"
               type="password" value={this.state.password} onChange={this.handleUserInput} />
            </FormGroup>

            <FormGroup>
              <Label for="firstname">Firstname</Label>
              <Input id="firstname" name="firstname"
                type="text" value={this.state.firstname} onChange={this.handleUserInput} />
            </FormGroup>

            <FormGroup>
              <Label for="lastname">Lastname</Label>
              <Input id="lastname" name="lastname"
                type="text" value={this.state.lastname} onChange={this.handleUserInput} />
            </FormGroup>

            <FormGroup>
              <Label for="username">Username</Label>
              <Input id="username" name="username"
                type="text" value={this.state.username} onChange={this.handleUserInput} />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>{" "}
            <Button color="primary"  disabled={!this.state.formValid}>
              Save
            </Button>
          </ModalFooter>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default RegistrationModal;
