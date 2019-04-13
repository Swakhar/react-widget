import React from "react";
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

class RegistrationModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      email: '',
      password: '',
      username: '',
      formErrors: { email: '', password: '', username: '' },
      emailValid: false,
      passwordValid: false,
      usernameValid: false,
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
    let usernameValid = this.state.username;

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
      default:
        break;
    }
    this.setState({ emailValid: emailValid,
                    passwordValid: passwordValid,
                    usernameValid: usernameValid,
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
      },
      client_id: 'e34f876cec711c5a4b63c5edc1093651b61cd57f2fc5ed864f559b0df80fd332',
      client_secret: 'ade78ffa9f5f5341a45df49e489aa0cfa0b875c5a903fbd7eaafaff122e3bf24'
  })

    axios.post('http://localhost:3000/api/v1/users', data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      console.log(response.data.message);
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
        <Button color="danger" onClick={this.toggle}>
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
              <Label for="username">Username</Label>
              <Input id="username" name="username"
                type="text" value={this.state.username} onChange={this.handleUserInput} />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>{" "}
            <Button color="primary"  disabled={!this.state.formValid}>
              Send data!
            </Button>
          </ModalFooter>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default RegistrationModal;
