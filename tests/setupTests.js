import '@testing-library/jest-dom';

global.BASE_URL = `http://localhost:${process.env.PORT || 8000}`;
global.USERNAME = 'admin';
global.PASSWORD = process.env.PASS || 'Admin@12345';
