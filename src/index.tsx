import React from 'react'
import ReactDOM from 'react-dom'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import Main from './Main'
import { store } from './store'
import 'semantic-ui-css/semantic.min.css'
import './style.css'

const Init = () => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/:nick" component={Main} />
      </Switch>
    </Router>
  </Provider>
)


document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<Init />, document.getElementById('root'))
})
