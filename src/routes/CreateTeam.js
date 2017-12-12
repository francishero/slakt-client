import React from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { extendObservable } from 'mobx'
import { observer } from 'mobx-react'
import {Form, Message, Button, Input, Container, Header } from 'semantic-ui-react'


class CreateTeam extends React.Component {
  constructor(props) {
    super(props)
    extendObservable(this, {
      name: '',
      errors : {},
    })
  }

  onChange = e => {
    const { name, value } = e.target
    this[name] = value 
  }

  onSubmit = async () => {
    const { name } = this 
    const response = await this.props.mutate({
      variables: { name }
    })
    const {ok , errors} = response.data.createTeam
    if(ok) {
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
    const { name, errors: { nameError } } = this

     const errorList = []

    if(nameError) {
      errorList.push(nameError)
    }
   

    return (
      <Container text>
        <Header as="h2">Login</Header>
        <Form>
      
        <Form.Field error = { !!nameError }>
        <Input
          name="name"
          type="text"
          onChange={this.onChange}
          value={ name }
          placeholder="team name"
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

const createTeamMutation = gql`
  mutation($name: String!) {
  createTeam(name:$name) {
    ok
    errors {
      path
      message
    }
  }
}
`
export default graphql(createTeamMutation)(observer(CreateTeam))