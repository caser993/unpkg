import React from 'react';
import ReactDOM from 'react-dom';

import App from './browse/App.js';

const props = window.__DATA__ || {};

ReactDOM.hydrateRoot(document.getElementById('root'), <App {...props} />);
