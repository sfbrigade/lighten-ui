import React, { PropTypes } from 'react'
import _ from 'lodash'
import DataBlock from '../components/DataBlock'
import Location from '../components/Location'
import Hours from '../components/Hours'
import http from 'superagent'
import {notes} from '../constants/properties'
import './Organization.scss'

export default class Organization extends React.Component {

  static propTypes = {
    params: PropTypes.object.isRequired,
  }

  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount () {
    http.get(`api/organizations/${this.props.params.organizationId}`)
      .end((error, response) => {
        if (error) {
          return console.error(error)
        }
        this.setState((state) => {
          return {
            ...state,
            organization: response.body
          }
        })
      })
  }

  render () {
    const {organization} = this.state
    if (!organization) return null

    let hoursMarkup
    if (organization.json.hours) {
      hoursMarkup = <Hours data={organization.json.hours} />
    }

    return (
      <div className='Organization'>
        <h1 className='organization-name'>{organization.json.org_name}</h1>
        <p>{organization.json.description}</p>
        <section>
          <h2>To get connected</h2>
          {
            Object.keys(organization.json.contacts)
              .filter((contactKey) => contactKey !== 'service_site')
              .map((contactKey) => {
                const contact = organization.json.contacts[contactKey]
                return <DataBlock
                  key={contactKey}
                  label={contactKey}
                  value={contact.value} />
              })
          }
          {hoursMarkup}
          <DataBlock
            onSave={this.save(notes.path)}
            label={notes.label}
            value={_.get(organization, notes.path)} />
        </section>

        <section>
          <h2>Usage requirements</h2>
          {this.atomsMarkup('json.usage_requirements.usage_requirement_atoms')}
          <DataBlock
            label='Languages spoken'
            values={organization.json.languages_spoken} />
          {this.atomsMarkup('json.accessiblity.accessibility_atoms')}
          <DataBlock
            label='Faith-based'
            value={organization.json.faith_based} />
        </section>

        <section>
          <h2>Service site</h2>
          {<Location location={organization.json.contacts.service_site.value} />}
        </section>

        <section>
          <h2>Services</h2>
        </section>
      </div>
    )
  }

  save = (path) => (value) => {
    const {organization} = this.state
    console.log('before', _.get(organization, path))
    this.setState((state) => {
      _.set(organization, path, value)
      console.log('after', _.get(organization, path))

      http.put(`api/organizations/${this.props.params.organizationId}/`)
        .send(this.state.organization)
        .end((error, response) => {
          if (error) {
            return console.error(error)
          }
        })

      return {
        ...state,
        organization
      }
    })
  }

  atomsMarkup = (pathToAtoms) => {
    const atoms = _.get(this.state.organization, pathToAtoms)
    return atoms.map((atom, index) => <DataBlock
      key={atom.kind}
      label={atom.kind}
      values={atom.keys}
      onSave={this.save(`${pathToAtoms}[${index}].keys`)} />
    )
  }
}
