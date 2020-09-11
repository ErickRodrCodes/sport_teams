import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const render = () => {
  const App = require('./App').default
  ReactDOM.render(
      <App />,
    document.getElementById('root')
  )

}

render()
//trigger the load of posts at startup...

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./App', render)
}