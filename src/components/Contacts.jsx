import React, { PropTypes } from 'react'
import _ from 'lodash'
import DataBlock from '../components/DataBlock'
import {contacts} from '../constants/properties'

export default class Contacts extends React.Component {

  static propTypes = {
    organization: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
  }

  render () {
    const {organization, onSave} = this.props

    return (
      <div className='Contacts'>
        <h2>{contacts.label}</h2>
        {
          Object.keys(_.get(organization, contacts.path))
            .filter((contactKey) => contactKey !== 'service_site')
            .map((contactKey) => {
              const path = `${contacts.path}.${contactKey}.value`
              const contact = _.get(organization, path)
              return <DataBlock
                key={contactKey}
                label={contactKey}
                value={contact}
                onSave={onSave(path)} />
            })
        }
      </div>
    )
  }
}
