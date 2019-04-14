import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  Button,
  Form, 
  FormGroup, 
  Label, 
  Input 
} from "reactstrap";
import axios from 'axios';

class CreateWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      kind: '',
      formErrors: { name: '', description: '', kind: '' },
      nameValid: false,
      descriptionValid: false,
      kindValid: false,
      formValid: false,
      responseMessage: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value},
                  () => { this.validateField(name, value) });
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let nameValid = this.state.nameValid;
    let descriptionValid = this.state.descriptionValid;
    let kindValid = this.state.kindValid;

    switch(fieldName) {
      case 'name':
        nameValid = value.length > 0;
        fieldValidationErrors.name = nameValid ? '' : '  need to be present';
        break;
      case 'description':
        descriptionValid = value.length > 0;
        fieldValidationErrors.description = descriptionValid ? '': ' need to be present';
        break;
      case 'kind':
        kindValid = ['visible', 'hidden'].includes(value);
        fieldValidationErrors.kind = kindValid ? '': ' need to be either visible or hidden';
        break;
      default:
        break;
    }
    this.setState({ nameValid: nameValid,
                    descriptionValid: descriptionValid,
                    kindValid: kindValid,
                    formErrors: fieldValidationErrors,
                  }, this.validateForm);
  }

  validateForm() {
    this.setState(
      {
        formValid: this.state.nameValid && this.state.descriptionValid && this.state.kindValid
      }
    );
  }

  handleSubmit(event) {
    event.preventDefault();
    let data = JSON.stringify({
      widget: {
        name: this.state.name,
        description: this.state.description,
        kind: this.state.kind,
      }
  })

    axios.post('http://localhost:3000/api/v1/widgets', data, {
      headers: {
        Authorization: 'Bearer ' + this.props.accessToken,
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      this.setState({responseMessage: 'Widget has been Created Successfully'})
    })
    .catch(error => {
      console.log(error);
    });
  }

  render() {
    return (
      <Container>
        <Row>
          <Col md="8">
            <Form onSubmit={this.handleSubmit}>
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
                {this.state.responseMessage}
              </div>
              <FormGroup>
                <Label for="name">Name</Label>
                <Input id="name" name="name"
                  type="text" value={this.state.name} onChange={this.handleUserInput} />
              </FormGroup>

              <FormGroup>
                <Label for="description">Description</Label>
                <Input id="description" name="description"
                  type="textarea" value={this.state.description} onChange={this.handleUserInput} />
              </FormGroup>

              <FormGroup>
                <Label for="kind">Kind</Label>
                <Input id="kind" name="kind"
                  type="text" value={this.state.kind} onChange={this.handleUserInput} />
              </FormGroup>
              <Button color="primary"  disabled={!this.state.formValid}>Save Widget</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default CreateWidget;
