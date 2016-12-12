import React, {Component, PropTypes} from 'react'
import _get from 'lodash.get'
import styled from 'styled-components'

import DataBlock from './DataBlock'
import {hours} from '../constants/properties'

const Time = styled.input`
  width: 70px;
`
const Td = styled.td`
  padding-right: 8px;
`

export default class Hours extends Component {

  static propTypes = {
    organization: PropTypes.object,
    onSave: PropTypes.func.isRequired,
  }

  constructor (props) {
    super(props)
    this.state = {
      data: _get(props.organization, hours.path)
    }
  }

  render () {
    const {data} = this.state

    return (
      <DataBlock
        label="Hours"
        valueMarkup={this.renderHours(data)}
        editMarkup={this.renderEdit(data)}
        onSave={this.onSave}
      />
    )
  }

  renderHours (data) {
    return <table>
      <tbody>{
        data.map(({day, ranges}, index) => {
          return <tr key={index}>
            <Td>{day}</Td>
            <Td>{ranges.map(({open, close}) => `${open} - ${close}`).join(', ')}</Td>
          </tr>
        })
      }</tbody>
    </table>
  }

  renderEdit (data) {
    return data.map(({day, ranges}, dataIndex) => {
      return <div key={dataIndex}>
        <div>{day}</div>
        <div>{
          ranges.map(({open, close}, rangeIndex) => {
            return <div key={rangeIndex}>
              <Time
                type="text"
                value={open}
                onChange={this.changeRange(dataIndex, rangeIndex, 'open')}
              />
              <Time
                type="text"
                value={close}
                onChange={this.changeRange(dataIndex, rangeIndex, 'close')}
              />
            </div>
          })
        }</div>
      </div>
    })
  }

  changeRange = (dataIndex, rangeIndex, property) => ({target: {value}}) => {
    const data = [...this.state.data]
    data[dataIndex].ranges[rangeIndex][property] = value
    this.setState({data})
  }

  onSave = () => {
    this.props.onSave(hours.path)(this.state.data)
  }
}
