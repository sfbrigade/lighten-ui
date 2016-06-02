import React, { PropTypes } from 'react'
import './DataBlock.scss'

export default class DataBlock extends React.Component {

  static propTypes = {
    label: PropTypes.string,
    value: PropTypes.node,
    save: PropTypes.func.isRequired,
  }

  constructor (props) {
    super(props)
    this.state = {
      isEditing: false
    }
  }

  render () {
    const {label, value} = this.props
    const {isEditing} = this.state

    let labelMarkup
    if (label) {
      labelMarkup = <label>{label}</label>
    }

    const valuesMarkup = <div className='value'>{value}</div>

    let buttonMarkup
    if (isEditing) {
      buttonMarkup = <button onClick={this.save}>Save</button>
    } else {
      buttonMarkup = <button onClick={this.edit}>Edit</button>
    }

    return (
      <div className='data-block'>
        {labelMarkup}
        {valuesMarkup}
        {buttonMarkup}
      </div>
    )
  }

  edit = () => {
    this.setState({
      isEditing: true
    })
  }

  save = () => {
    this.props.save()
    this.setState({
      isEditing: false
    })
  }
}
