import React from 'react'
import {Link} from 'react-router'
import http from 'superagent'
import styled from 'styled-components'

import {isObject} from '../../utils'
import {searchOrganizations} from './utils'

const Container = styled.div`
  padding: 0 1rem;
`

export default class Organizations extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      organizations: [],
      search: '',
    }
  }

  componentDidMount () {
    http.get('/api/organizations/')
      .end((error, response) => {
        if (error) {
          return console.error(error)
        }
        this.setState((state) => {
          return Object.assign({}, state, {
            organizations: response.body.results
          })
        })
      })
  }

  render () {
    const {organizations, search} = this.state
    console.log(organizations)

    return (
      <Container>
        <input type="search" value={search} onChange={this.changeSearch} />
        <h1>Organizations</h1>
        <ul>{
          searchOrganizations(organizations, search).map(({uuid, json: {name}, _matches}) => {
            return <li key={uuid}>
              <Link to={`/organizations/${uuid.toString()}`}>{name}</Link>
              {search && _matches && _matches.reduce((acc, match, index) => {
                if (isObject(match)) {
                  acc.push(<div key={index}>{match.type}: {match.value}</div>)
                }
                return acc
              }, [])}
            </li>
          })
        }</ul>
      </Container>
    )
  }

  changeSearch = (event) => {
    const {target: {value}} = event
    this.setState({search: value})
  }
}
