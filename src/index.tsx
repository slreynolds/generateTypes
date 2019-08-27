import 'babel-polyfill';

import { AppContainer } from 'react-hot-loader';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from './containers/App/index';

const Root = () => (
  <AppContainer>
      <App />
  </AppContainer>
);

const render = () => {
  ReactDOM.render(
    <Root />,
    document.getElementById('app-main')
  );
  
}

render()

// Hot reloading
if ((module as any).hot) {
  // Reload components
  (module as any).hot.accept('./containers/App/index', () => {
    render()
  })
}
