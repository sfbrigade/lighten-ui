import React from 'react'
import { connect } from 'react-redux'
import http from 'superagent'
import { login } from '../redux/actions/loginAction'

export class Login extends React.Component {

  constructor () {
    super()
    this.state = {
      user: 'superuser',
      password: 'superuser'
    }
  }

  componentWillReceiveProps (nextProps, nextContext) {
    // if token and user exists, then we're already logged in so redirect
    // TODO: validate token
    if (nextProps.user && nextProps.token) {
      // TODO redirect
    }
  }

  setUser = e => {
    this.state.user = e.target.value
  }

  setPassword = e => {
    this.state.password = e.target.value
  }

  // This will be called when the user clicks on the login button
  login = e => {
    e.preventDefault()

    http
      .post('/api-token-auth/')
      .send({ 'username': this.state.user, 'password': this.state.password })
      .end((error, response) => {
        if (error) {
          return console.error(error)
        }

        // TODO: add subscriber that saves the token to local storage
        this.props.dispatch(login(this.state.user, JSON.parse(response.text).token))
      })
  }

  render () {
    return (
      <div>
        <form role="form">
          <div className="form-group">
            <input type="text" placeholder="Username" defaultValue={this.state.user}
              onChange={this.setUser} />
            <input type="password" placeholder="Password" defaultValue={this.state.password}
              onChange={this.setPassword} />

          </div>
          <button type="submit" onClick={this.login}>Submit</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    'user': state.loginReducer.username,
    'token': state.loginReducer.token
  }
}

Login.propTypes = {
  dispatch: React.PropTypes.func
}

export default connect(mapStateToProps, null)(Login)
