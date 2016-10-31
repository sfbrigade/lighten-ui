import _get from 'lodash.get'
import {matchLowercase} from '../../utils'

export const searchOrganizations = (organizations, search) => {
  if (!search) {
    return organizations
  }
  return organizations.filter((organization) => {
    const matches = []

    const name = _get(organization, 'json.name')
    if (name && matchLowercase(name, search)) {
      matches.push(true)
    }

    const locations = _get(organization, 'json.locations')
    locations && locations.forEach((location) => {
      const street = _get(location, 'physical_address.street')
      if (street && matchLowercase(street, search)) {
        matches.push({
          type: 'location',
          value: street
        })
      }
    })

    const services = _get(organization, 'json.services')
    services && services.forEach((service) => {
      if (matchLowercase(service, search)) {
        matches.push({
          type: 'service',
          value: service,
        })
      }
    })

    organization._matches = matches

    return matches.length > 0
  })
}
