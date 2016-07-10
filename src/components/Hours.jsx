import React, { PropTypes } from 'react'
import DataBlock from '../components/DataBlock'

export default class Hours extends React.Component {

  static propTypes = {
    data: PropTypes.object,
  }

  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    const { data } = this.props
    return (
      <div className='DataBlock'>
        {
          Object.keys(data).map(key => {
            const hours = data[key]
            const displayLabel = key || 'hours'
            return <DataBlock
              key={displayLabel}
              label={displayLabel}
              value={Hours.createHoursMarkup(hours.hours_atoms)} />
          })
        }
      </div>
    )
  }

  static createHoursMarkup = (hoursAtoms) => {
    // create a key:value pair of day:hours
    const dayHoursMap = hoursAtoms.reduce((acc, atom) => {
      if (!Array.isArray(acc[atom.day])) {
        acc[atom.day] = []
      }
      acc[atom.day].push(`${atom.open} - ${atom.close}`)
      return acc
    }, {})
    return Object.keys(dayHoursMap).map((day) => {
      return <div key={day}>{`${day}: ${dayHoursMap[day].join(', ')}`}</div>
    })
  }
}
