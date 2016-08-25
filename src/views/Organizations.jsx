import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import http from 'superagent'
import './Organizations.scss'

export class Organizations extends React.Component {

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
    return (
      <div className="Organizations">
        <input className="Organizations-search" type="search" value={search} onChange={this.changeSearch} />
        <h1>Organizations</h1>
        <ul>{
          organizations.filter(({json: {org_name: orgName}}) => {
            return orgName.toLowerCase().match(search.toLowerCase())
          })
            .map(({id, json: {org_name: orgName}}) => {
              return <li key={id}><Link to={`organizations/${id.toString()}`}>{orgName}</Link></li>
            })
        }</ul>
      </div>
    )
  }

  changeSearch = (event) => {
    const {target: {value}} = event
    this.setState({search: value})
  }
}
Organizations.propTypes = {}

const mapStateToProps = (state) => ({})
export default connect(mapStateToProps, {})(Organizations)
