import React from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { extendObservable } from 'mobx'
import { observer } from 'mobx-react'
import { Button, Input, Container, Header } from 'semantic-ui-react'


class Login extends React.Component {
  constructor(props) {
    super(props)
    extendObservable(this, {
      email: '',
      password: '',
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
    }
  }
  render() {
    const { email, password } = this
    return (
      <Container text>
        <Header as="h2">Login</Header>
        <Input
          name="email"
          onChange={this.onChange}
          value={email}
          placeholder="username"
          fluid

        />
        <Input
          name="password"
          type="password"
          onChange={this.onChange}
          value={password}
          placeholder="password"
          fluid
        />
        <Button onClick={this.onSubmit}>Submit</Button>
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