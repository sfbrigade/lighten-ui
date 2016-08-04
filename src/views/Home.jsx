import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import http from 'superagent'
import './Home.scss'

export class Home extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      organizations: []
    }
  }

  componentDidMount () {
    http.get('api/organizations')
      .end((error, response) => {
        if (error) {
          return console.error(error)
        }
        this.setState((state) => {
          return Object.assign({}, state, {
            organizations: response.body
          })
        })
      })
  }

  render () {
    const { organizations } = this.state
    return (
      <div className="Home">
        <h1>Organizations</h1>
        <ul>
          {
            organizations.map(({id, json: {org_name: orgName}}) => {
              return <li key={id}><Link to={id.toString()}>{orgName}</Link></li>
            })
          }
        </ul>
      </div>
    )
  }
}
Home.propTypes = {}

const mapStateToProps = (state) => ({})
export default connect(mapStateToProps, {})(Home)
