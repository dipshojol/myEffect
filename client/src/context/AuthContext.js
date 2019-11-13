import React from 'react';

export default React.createContext({
    token: null,
    userId: null,
    firstName: null,
    lastName: null,
    email: null,
    login: (token, userId, firstName, lastName, email, tokenExpiration) => {},
    logout: () => {}
});