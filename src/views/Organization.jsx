import React, { PropTypes } from 'react'
import _ from 'lodash'
import DataBlock from '../components/DataBlock'
import Location from '../components/Location'
import Contacts from '../components/Contacts'
import Hours from '../components/Hours'
import http from 'superagent'
import {
  notes,
  usageRequirements,
  languagesSpoken,
  faithBased,
  serviceSite,
} from '../constants/properties'
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

    console.log(organization.json)

    return (
      <div className="Organization">
        <h1 className="organization-name">{organization.json.org_name}</h1>
        <p>{organization.json.description}</p>
        <section>
          <Contacts
            organization={organization}
            onSave={this.onSave} />
          <Hours
            organization={organization}
            onSave={this.onSave}
          />
          <DataBlock
            InputTag="textarea"
            onSave={this.onSave(notes.path)}
            label={notes.label}
            value={_.get(organization, notes.path)} />
        </section>

        <section>
          <h2>{usageRequirements.label}</h2>
          {this.atomsMarkup(usageRequirements.path)}
          <DataBlock
            label={languagesSpoken.label}
            values={_.get(organization, languagesSpoken.path)}
            onSave={this.onSave(languagesSpoken.path)} />
          {this.atomsMarkup('json.accessiblity.accessibility_atoms')}
          <DataBlock
            label={faithBased.label}
            value={_.get(organization, faithBased.path)}
            onSave={this.onSave(languagesSpoken.path)} />
        </section>

        <section>
          <h2>{serviceSite.label}</h2>
          <Location
            value={_.get(organization, serviceSite.path)}
            onSave={this.onSave(serviceSite.path)} />
        </section>

        <section>
          <h2>Services</h2>
        </section>
      </div>
    )
  }

  onSave = (path) => (value) => {
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
    return atoms.reduce((acc, atom, i) => {
      atom.kind && acc.push(<DataBlock
        key={atom.kind}
        label={atom.kind}
        values={atom.keys}
        onSave={this.onSave(`${pathToAtoms}[${i}].keys`)} />)
      return acc
    }, [])
  }
}
