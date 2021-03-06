import React from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { extendObservable } from 'mobx'
import { observer } from 'mobx-react'
import {Form, Message, Button, Input, Container, Header } from 'semantic-ui-react'


class Login extends React.Component {
  constructor(props) {
    super(props)
    extendObservable(this, {
      email: '',
      password: '',
      errors : {},
    })
  }

  onChange = e => {
    const { name, value } = e.target
    this[name] = value 
  }

  onSubmit = async () => {
    const { email, password } = this 
    const response = await this.props.mutate({
      variables: { email, password }
    })
    const {ok, token, refreshToken, errors} = response.data.login 
    if(ok) {
      localStorage.setItem('token', token)
      localStorage.setItem('refreshToken', refreshToken)
      this.props.history.push('/')
    } else {
      const err = {}
      errors.forEach(({path, message }) => {
        err[`${path}Error`] = message 
      })

      this.errors = err 
    }

  }
  render() {
    const { email, password, errors: { emailError, passwordError } } = this

     const errorList = []

    if(passwordError) {
      errorList.push(passwordError)
    }
    if(emailError) {
      errorList.push(emailError)
    }   


    return (
      <Container text>
        <Header as="h2">Login</Header>
        <Form>
        <Form.Field error = { !!emailError }>
        <Input
          name="email"
          onChange={this.onChange}
          value={email}
          placeholder="email"
          fluid

        />
        </Form.Field>
        <Form.Field error = { !!passwordError }>
        <Input
          name="password"
          type="password"
          onChange={this.onChange}
          value={password}
          placeholder="password"
          fluid
        />
        </Form.Field>
        <Button onClick={this.onSubmit}>Submit</Button>
        </Form>

         {
      (errorList.length) ? (<Message 
      error 
      header="Something went wrong with the submission"
      list= { errorList }

      /> ): null
     }
      </Container>
    )
  }
}

const loginMutation = gql`
    mutation($email: String!, $password: String!) {
  login(email:$email, password:$password) {
    ok
    token
    refreshToken
    errors {
      path
      message
    }
  }
}
`
export default graphql(loginMutation)(observer(Login))