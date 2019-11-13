import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import LandingPage from './pages/LandingPage';
import AuthContext from './context/AuthContext';
import Dashboard from './pages/Dashboard';
// import FormValidation from './utils/FormValidation'
import isAuthenticated from "./utils/isAuthenticated";

class App extends Component {
  state = {
    token: null,
    userId: null,
    firstName: null,
    lastName: null,
    email: null,
  };

  login = (token, userId, firstName, lastName, email, tokenExpiration) => {
    this.setState({ token: token, userId: userId, firstName: firstName, lastName: lastName, email: email, tokenExpiration: tokenExpiration });
  };

  logout = () => {
    this.setState({ token: null, userId: null });
  };

componentDidMount() {
  if (!isAuthenticated()) return;
  let userData = JSON.parse(sessionStorage.getItem("credentials"))
  this.setState({ token: userData.token, userId: userData.userId, firstName: userData.firstName, lastName: userData.lastName, email: userData.email, tokenExpiration: userData.tokenExpiration });
  console.log(userData)
};


  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <AuthContext.Provider 
          value={{ 
            token: this.state.token, 
            userId: this.state.userId, 
            firstName: this.state.firstName, 
            lastName: this.state.lastName,
            email: this.state.email,
            tokenExpiration: this.state.tokenExpiration, 
            login: this.login, 
            logout: this.logout 
            }}>
            <main className="main-content">
              <Switch>
                <React.Fragment>
                  {!this.state.token && <Redirect from="/" to="/landingpage" exact />}
                  {this.state.token && <Redirect from="/" to="/dashboard/profile" exact />}
                  {!this.state.token && (<Route path="/landingpage" component={LandingPage} exact />)}
                  {this.state.token && (<Route path="/dashboard/profile" component={Dashboard} exact />)}
                </React.Fragment>
              </Switch>
            </main>
          </AuthContext.Provider>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;