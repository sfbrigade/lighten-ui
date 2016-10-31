import React from 'react'
import ReactDOM from 'react-dom'
import {Router, useRouterHistory} from 'react-router'
import {createHistory} from 'history'
import routes from './routes'

import './styles/vendor/normalize.css'
import './styles/index.css'

const history = useRouterHistory(createHistory)()

ReactDOM.render(
  <Router history={history}>
    {routes}
  </Router>,
  document.getElementById('root')
)
