import React from 'react'
import { Button, Input, Container, Header } from 'semantic-ui-react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class Register extends React.Component {
  state = {
    username: '',
    email: '',
    password: '',
  }
  onSubmit = async () => {
    this.props.mutate({
      variables: this.state
    })
  }

  onChange = e => {
    const { name, value } = e.target 
    this.setState({
      [name]: value 
    })
  }
  render() {
    const { username, email, password } = this.state 
    return (
  <Container text>
    <Header as='h2'>Register</Header>
    <Input name="username" onChange = {this.onChange } value={username}placeholder="username" fluid />
    <Input name="email" onChange = {this.onChange } value={email}placeholder="Email" fluid />
    <Input name="password" type="password" onChange = {this.onChange }
     value={password} placeholder="password" fluid />
     <Button onClick= {this.onSubmit }>Submit</Button>
  </Container>
  )
  }
}

const registerMutation = gql`
mutation($username: String!, $email: String!, $password: String!){
  register(username:$username,email:$email, password:$password)
}
`

export default graphql(registerMutation)(Register)

