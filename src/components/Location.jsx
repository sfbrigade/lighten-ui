import React, { PropTypes } from 'react'
import DataBlock from '../components/DataBlock'

export default class Location extends React.Component {

  static propTypes = {
    label: PropTypes.string,
    value: PropTypes.node,
    onSave: PropTypes.func.isRequired,
  }

  constructor (props) {
    super(props)
    this.state = {
      value: props.value
    }
  }

  render () {
    const {value} = this.state

    const address = value.join(', ')
    const uriEncodedAddress = encodeURIComponent(address)
    const googleMapsIframeUrl = [
      'https://www.google.com/maps/embed/v1/place',
      '?key=AIzaSyCLeuAb-KkMbNrB489TN77duPkdsqHCTco',
      '&zoom=14',
      `&q=${uriEncodedAddress}`
    ].join('')

    return (
      <div className="location">
        <iframe
          width="600"
          height="450"
          frameBorder="0"
          style={{border: 0}}
          src={googleMapsIframeUrl}
          allowFullScreen></iframe>
        <DataBlock
          value={address}
          onSave={this.onSave}
          onChange={this.onChange} />
      </div>
    )
  }

  onChange = (value) => {
    this.setState({value: Location.formatValue(value)})
  }

  onSave = (value) => {
    this.props.onSave(Location.formatValue(value))
  }

  static formatValue = (value) => {
    return value.split(', ')
  }
}
