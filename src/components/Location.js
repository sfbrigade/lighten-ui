import React, { PropTypes } from 'react'
import _get from 'lodash.get'

import DataBlock from './DataBlock'

const addressKey = 'physical_address'

export default class Location extends React.Component {

  static propTypes = {
    label: PropTypes.string,
    location: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
  }

  render () {
    const {location} = this.props
    const address = _get(location, addressKey)

    if (!address) return null

    const googleMapsIframeUrl = [
      'https://www.google.com/maps/embed/v1/place',
      '?key=AIzaSyCLeuAb-KkMbNrB489TN77duPkdsqHCTco',
      '&zoom=14',
      `&q=${encodeURIComponent(Location.buildAddressString(address))}`
    ].join('')

    return (
      <div className="Location">
        {this.renderPhysicalAddress(address)}
        <iframe
          width="600"
          height="450"
          frameBorder="0"
          style={{border: 0}}
          src={googleMapsIframeUrl}
          allowFullScreen></iframe>
      </div>
    )
  }

  renderPhysicalAddress (address) {
    return ['street', 'city', 'state', 'zipcode', 'country'].map((key) => (
      <DataBlock
        key={key}
        label={key}
        value={address[key]}
        onSave={this.onSave(key)} />
    ))
  }

  onSave = (key) => (value) => {
    const {path, onSave} = this.props
    onSave(`${path}.${addressKey}.${key}`)(value)
  }

  static buildAddressString = ({street, city, state, zipcode, country}) => `${street} ${city} ${state} ${zipcode} ${country}`
}
