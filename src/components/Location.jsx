import React, { PropTypes } from 'react'
import DataBlock from '../components/DataBlock'

export default class Location extends React.Component {

  static propTypes = {
    label: PropTypes.string,
    value: PropTypes.node,
    onSave: PropTypes.func.isRequired,
  }

  render () {
    const {value} = this.props

    const address = value.join('\n')
    const uriEncodedAddress = encodeURIComponent(address)
    const googleMapsIframeUrl = [
      'https://www.google.com/maps/embed/v1/place',
      '?key=AIzaSyCLeuAb-KkMbNrB489TN77duPkdsqHCTco',
      '&zoom=14',
      `&q=${uriEncodedAddress}`
    ].join('')

    return (
      <div className='location'>
        <iframe
          width='600'
          height='450'
          frameBorder='0'
          style={{border: 0}}
          src={googleMapsIframeUrl}
          allowFullScreen></iframe>
        <DataBlock
          value={address}
          onSave={this.onSave} />
      </div>
    )
  }

  onSave = (value) => {
    this.props.onSave(value.split('\n'))
  }
}
