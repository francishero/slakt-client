import React from 'react'
import {Message, Button, Input, Container, Header } from 'semantic-ui-react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class Register extends React.Component {
  state = {
    username: '',
    email: '',
    password: '',
    usernameError: '',
    emailError: '',
    passwordError: ''
  }
  onSubmit = async () => {

    // clear the sunmit errors 
    this.setState({
      usernameError: '',
      passwordError: '',
      emailError: ''
    })

    const { username, email, password } = this.state 
    const response = await this.props.mutate({
      variables: { username, email, password }
    })
    const { ok, errors } = response.data.register 
    if(ok) {
      this.props.history.push('/')
    } else {
      const err = {}
      errors.forEach(({path, message }) => {
        err[`${path}Error`] = message 
      })

      this.setState(err)
    }

  }

  onChange = e => {
    const { name, value } = e.target 
    this.setState({
      [name]: value 
    })
  }
  render() {
    const { username, email, password, usernameError,passwordError,emailError } = this.state 
    const errorList = []
    if(usernameError) {
      errorList.push(usernameError)
    }
    if(passwordError) {
      errorList.push(passwordError)
    }
    if(emailError) {
      errorList.push(emailError)
    }
    return (
  <Container text>
    <Header as='h2'>Register</Header>
    <Input name="username" onChange = {this.onChange } value={username}placeholder="username" fluid
    error = { !!usernameError } />
    <Input name="email" onChange = {this.onChange } value={email}placeholder="Email" fluid 
    error = { !!emailError} />
    <Input name="password" type="password" onChange = {this.onChange }
     value={password} placeholder="password" fluid 
     error = { !!passwordError }/>
     <Button onClick= {this.onSubmit }>Submit</Button>
     {
      (usernameError || passwordError || emailError) ? (<Message 
      error 
      header="Something went wrong with the submission"
      list= { errorList }

      /> ): null
     }
  </Container>
  )
  }
}

const registerMutation = gql`
mutation($username: String!, $email: String!, $password: String!){
  register(username:$username,email:$email, password:$password) {
    ok
    errors {
      path 
      message 
    }
  }
}
`

export default graphql(registerMutation)(Register)

