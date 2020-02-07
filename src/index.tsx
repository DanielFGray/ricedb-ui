import React from 'react'
import ReactDOM from 'react-dom'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import Main from './Main'
import { store } from './store'
import 'semantic-ui-css/semantic.min.css'
import './style.css'
import ErrorBoundary from './ErrorBoundary'
import Stringify from './Stringify'

const Init = () => (
  <ErrorBoundary onError={Stringify}>
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/:nick" component={Main} />
          <Route path="/" component={Main} />
        </Switch>
      </Router>
    </Provider>
  </ErrorBoundary>
)


document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<Init />, document.getElementById('root'))
})
