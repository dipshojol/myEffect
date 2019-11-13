import React, { Component } from "react"
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Button from '@material-ui/core/Button';
import AuthContext from '../context/AuthContext';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

import './Auth.css'

class AuthPage extends Component {
    state = {
        isLogin: true,
        user: {
            email: '',
            password: '',
            repeatPassword: '',
        }
    };
    componentDidMount() {
        // custom rule will have name 'isPasswordMatch'
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
            let sL = value.length;
            let i = 0;
            if (value !== this.state.user.password) {
                return false;
                console.log('uppercase:',value.charAt(i));
            }
            return true;
        });
        
    }

    componentWillUnmount() {
        // remove rule when it is not needed
        ValidatorForm.removeValidationRule('isPasswordMatch');
    }

    handleChange = (event) => {
        const { user } = this.state;
        user[event.target.name] = event.target.value;
        this.setState({ user });
    }
    
    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.firstNameEl = React.createRef();
        this.lastNameEl = React.createRef();
        this.emailEl = React.createRef();
        this.passwordEl = React.createRef();
    }
    
    ProtectedComponent = (props) => {
        return props.history.push('/dashboard')
    }

    submitHandler = (event) => {
        event.preventDefault();
        const firstName = this.firstNameEl.current.value;
        const lastName = this.lastNameEl.current.value;
        const email = this.emailEl.current.value;
        const password = this.passwordEl.current.value;

        let requestBodyLogin = {
            query: `
                query {
                    login(email: "${email}", password: "${password}") {
                    userId
                    firstName
                    lastName
                    email
                    token
                    tokenExpiration
                    }
                }
            `
        };
        
        let requestBody = {
            query: `
            mutation {
                createUser(userInput: {firstName: "${firstName}",lastName: "${lastName}",email: "${email}", password: "${password}"}) {
                _id
                firstName
                lastName
                email
                }
            }
            `
        };

        //(post api call) send sign up data to backend
        fetch('http://localhost:8000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if (res.status !== 200 && res.status !== 201) {
                    throw new Error('Failed!');
                }
                console.log(res);
                return res.json();
            })
            .then(resData => {
                console.log(resData);
                if (resData.errors) {
                    alert(resData.errors[0].message)
                } else {
                    // when user logged in then send a query to get user data
                    fetch('http://localhost:8000/graphql', {
                        method: 'POST',
                        body: JSON.stringify(requestBodyLogin),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then(res => {
                        if (res.status !== 200 && res.status !== 201) {
                            throw new Error('Failed!');
                        }
                        return res.json();
                    })
                    .then(response => {
                        if (response.data.login.token) {
                            localStorage.setItem('Token:', response.data.login.token)
                            sessionStorage.setItem("authToken", response.data.login.token);
                            sessionStorage.setItem("credentials", JSON.stringify(response.data.login));
                            console.log(response.data.login);
                            this.context.login(response.data.login.token, response.data.login.userId, response.data.login.firstName, response.data.login.lastName, response.data.login.email, response.data.login.tokenExpiration,   )
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
                }
                
            })
                
            .catch(err => {
                console.log(err);
            });
    };
    
    render() {
        const { user } = this.state;

        return (
            <>
                <ValidatorForm onSubmit={this.submitHandler}>
                {/* <ValidatorForm
                onSubmit={this.submitHandler}
            > */}
                        <h1>Welcome</h1>
                        <div className="form-control">
                            <TextField
                                name="firstNameEl"
                                id="firstNameEl"
                                inputRef={this.firstNameEl}
                                className="outlined-basic"
                                // className={classes.textField}
                                label="First Name"
                                margin="dense"
                                variant="outlined"
                                type="input"
                            required
                            />
    
                        </div>
                        <div className="form-control">
                            {/* <label htmlFor="lastName">Last Name</label>
                        <input type="last-name" id="last-name" ref={lastNameEl} /> */}
                            <TextField
                                className="outlined-basic"
                                // className={classes.textField}
                                label="Last Name"
                                margin="dense"
                                variant="outlined"
                                inputRef={this.lastNameEl}
                                required
                            />
                            <br />
                        
                        </div>
                        <div className="form-control">
                            <TextValidator
                                name="email"
                                label="Email"
                                validators={['required', 'isEmail']}
                                errorMessages={['', '']}
                                type="text" 
                                value={user.email}
                                onChange={this.handleChange}
                                className="outlined-basic"
                                margin="dense"
                                variant="outlined"
                                inputRef={this.emailEl}
                                required
                            />
                        </div>
                        <div className="form-control">
                            <TextValidator
                                className="outlined-basic"
                                // className={classes.textField}
                                label="Password"
                                margin="dense"
                                variant="outlined"
                                name="password"
                                type="password"
                                onChange={this.handleChange}                            
                                inputRef={this.passwordEl}
                                validators={['required', 'trim', 'minStringLength:5']}
                                errorMessages={['']}
                                value={user.password}
                                required
                            />
                        </div>
                        <div className="form-control">
                            <TextValidator
                                className="outlined-basic"
                                // className={classes.textField}
                                label="Confirm Password"
                                margin="dense"
                                variant="outlined"
                                type="password"
                                name="repeatPassword"
                                onChange={this.handleChange}
                                inputRef={this.cpasswordEl}
                                validators={['isPasswordMatch', 'required', 'trim', 'minStringLength:5']}
                                errorMessages={['', '','']}
                                value={user.repeatPassword}
                                required
                            />
                        </div>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    // checked={state.checkedF}
                                    // onChange={this.handleChange('checkedF')}
                                    icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                    checkedIcon={<CheckBoxIcon fontSize="small" />}
                                    value="checkedI"
                                    className="checkbox1"
                                    
                                />
                            }
                            label="Sign up your organization?"
                        />
                        <div className="form-actions">
                            {/* <button type="submit">ACCEPT &amp; SIGN UP</button> */}
                            <Button type="submit" size="medium" className=''>
                                ACCEPT &amp; SIGN UP
                        </Button>
                            <br />
                            <div className="terms-checkbox">
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                            checkedIcon={<CheckBoxIcon fontSize="small" />}
                                            value="checkedI"
                                            required
                                        />
                                    }
                                />
                                <div className="terms">
                                    <span className="terms1">By continuing, you agree to</span>
                                    <br />
                                    <span className="terms2">MyEffect's Conditions and Privacy Policy</span>
                                </div>
                            </div>
                        </div>
                    </ValidatorForm>
                
            </>
        );
    }
}
export default AuthPage