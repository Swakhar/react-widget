import React, { Component } from "react";
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

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { saveLoginCredential } from '../actions';

class LoginModalContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      email: '',
      password: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value});
  }

  handleSubmit(event) {
    event.preventDefault();
    let data = JSON.stringify({
      grant_type: "password",
      email: this.state.email,
      password: this.state.password,
      client_id: "e34f876cec711c5a4b63c5edc1093651b61cd57f2fc5ed864f559b0df80fd332",
      client_secret: "ade78ffa9f5f5341a45df49e489aa0cfa0b875c5a903fbd7eaafaff122e3bf24",
  })

    axios.post('http://localhost:3000/oauth/token', data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      let loginResponse = response.data;
      loginResponse.email = this.state.email;
      this.props.saveLoginCredential(loginResponse);
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
        <Button color="info" onClick={this.toggle}>
          {this.props.buttonLabel}
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <Form onSubmit={this.handleSubmit}>
            <ModalHeader toggle={this.toggle}>Login</ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input id="email" name="email" type="email" value={this.state.email} onChange={this.handleUserInput} />
              </FormGroup>

              <FormGroup>
                <Label for="password">Password</Label>
                <Input id="password" name="password" type="password" value={this.state.password} onChange={this.handleUserInput} />
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={this.toggle}>
                Cancel
              </Button>{" "}
              <Button color="primary" >Login</Button>
            </ModalFooter>
          </Form>
        </Modal>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ saveLoginCredential: saveLoginCredential }, dispatch);
}

export default connect(null, mapDispatchToProps)(LoginModalContainer);
