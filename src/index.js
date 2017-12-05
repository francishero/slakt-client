import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import Routes from './routes'

const App = <Routes />
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
