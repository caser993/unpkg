require('dotenv').config();
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('NPM_REGISTRY_URL:', process.env.NPM_REGISTRY_URL);

require('./server');
