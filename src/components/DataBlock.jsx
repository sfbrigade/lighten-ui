import React, { PropTypes } from 'react'
import './DataBlock.scss'

export default class DataBlock extends React.Component {

  static propTypes = {
    label: PropTypes.string,
    value: PropTypes.node,
    values: PropTypes.node,
    type: PropTypes.string.isRequired,
    onSave: PropTypes.func.isRequired,
  }

  static defaultProps = {
    type: 'text',
  }

  constructor (props) {
    super(props)
    this.state = {
      isEditing: false,
      value: props.value,
      values: props.values,
    }
  }

  render () {
    const {label, type} = this.props
    const {isEditing, value, values} = this.state

    let labelMarkup
    if (label) {
      labelMarkup = <label>{label}</label>
    }

    let valueMarkup
    if (isEditing) {
      if (values) {
        valueMarkup = <div>{
          values.map((value, i) => {
            return <input key={i} type={type} value={value} onChange={this.changeValueinValues(i)} />
          })
        }</div>
      } else {
        valueMarkup = <input type={type} value={value} onChange={this.changeValue} />
      }
    } else {
      if (values) {
        valueMarkup = <div>{
          values.map((value, i) => {
            return <div key={i} className='value'>{value}</div>
          })
        }</div>
      } else {
        valueMarkup = <div className='value'>{value}</div>
      }
    }

    let buttonMarkup
    if (isEditing) {
      buttonMarkup =
        <div className='buttons'>
          <button onClick={this.save}>Save</button>
          <button onClick={this.cancel}>Cancel</button>
        </div>
    } else {
      buttonMarkup =
        <div className='buttons'>
          <button onClick={this.edit}>Edit</button>
        </div>
    }

    return (
      <div className='DataBlock'>
        {labelMarkup}
        {valueMarkup}
        {buttonMarkup}
      </div>
    )
  }

  changeValue = (event) => {
    const {value} = event.target
    this.setState((state) => {
      return {
        ...state,
        value,
      }
    })
  }

  changeValueinValues = (index) => (event) => {
    const values = this.state.values.slice()
    values[index] = event.target.value
    this.setState((state) => {
      return {
        ...state,
        values,
      }
    })
  }

  edit = () => {
    this.setState((state) => {
      return {
        ...state,
        isEditing: true
      }
    })
  }

  cancel = () => {
    this.setState((state, props) => {
      return {
        ...state,
        isEditing: false,
        value: props.value,
        values: props.values,
      }
    })
  }

  save = () => {
    this.props.onSave(this.state.value || this.state.values)
    this.setState((state) => {
      return {
        ...state,
        isEditing: false
      }
    })
  }
}
