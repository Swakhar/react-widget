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

class CreateOrUpdateWidget extends Component {
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

  componentDidMount() {
    if(this.props.update) {
      return this.updateWidgetsData();
    }
  }

  updateWidgetsData() {
    this.props.widgets.map((item) => {
      if(item.id === parseInt(this.props.match.params.id)) {
        this.setState(
          {
            name: item.name ,
            description: item.description,
            kind: item.kind,
            nameValid: !this.state.nameValid,
            descriptionValid: !this.state.descriptionValid,
            kindValid: !this.state.kindValid,
            formValid: !this.state.formValid,
          }
        )
      }
    })
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

  buttonLabel() {
    if(this.props.update) {
      return 'Update Widget'
    }
    return 'Create Widget'
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

    if(this.props.update) {
      axios.put(`http://localhost:3000/api/v1/widgets/${this.props.match.params.id}`, data, {
        headers: {
          Authorization: 'Bearer ' + this.props.accessToken,
          'Content-Type': 'application/json'
        }
        })
        .then(response => {
          this.setState({responseMessage: 'Widget has been Updated Successfully'})
        })
        .catch(error => {
          console.log(error);
        });
    }
    else {
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
  }

  render() {
    return (
      <div className="App">
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
                <Button color="primary"  disabled={!this.state.formValid}>{this.buttonLabel()}</Button>
              </Form>

              
            </Col>
          </Row>
          <Row>
            {this.props.update && (
              <div><Button color="primary" onClick={this.props.history.goBack}>Go Back</Button></div>
            )}
          </Row>
        </Container>
      </div>
    );
  }
}

export default CreateOrUpdateWidget;
