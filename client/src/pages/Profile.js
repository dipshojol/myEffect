import React, {useState, useEffect} from "react"
import { makeStyles } from '@material-ui/core/styles';
import profileIcon from '../assets/image/icon-profile-large.svg';
import TextField from '@material-ui/core/TextField';
import AuthContext from '../context/AuthContext';
import Button from '@material-ui/core/Button';
import isAuthenticated from "../utils/isAuthenticated";

import './Profile.css'

const useStyles = makeStyles(theme => ({
    profileWrapper: {
        maxWidth: '980px',
        textAlign: 'center',
        margin: '10px auto',
        // padding: '20px',
        borderRadius: '10px',
        boxShadow: '0px 0px 11px -5px rgba(0,0,0,0.75)',
        minHeight: '800px',
        [theme.breakpoints.down(760)]: {
            width: '100%',
            overflow: 'hidden'
        },
    },
    profilePhoto: {
        margin: '20px',
        maxWidth: '25vw'
    },
    textField:{
        width: '80vw',
        maxWidth: '400px'
    },
    profileIconWrapper:{
        display: 'grid',
        justifyItems: 'center',
        // marginTop: '50px',
        height: 'fit-content'

    },
    uploadImg: {
        padding: '20px'
    },
    inputWrapper: {
        marginTop: '25px'
    },
    button: {
        marginTop: '10px'
    },
    about: {
        display: 'grid',
        placeContent: 'center',
        margin: '20px 0 0'
    },
    logout: {
        position: 'absolute',
        right: '0'
    }
}));

const Profile = (props) => {
    const classes = useStyles()
    const [user, setUser] = useState({ username: "" });

    useEffect(() => {
        if (!isAuthenticated()) return props.history.push("/");
        setUser(JSON.parse(sessionStorage.getItem("credentials")));
    }, [props.history]);

    const clearSession = () => {
        return sessionStorage.clear()
    }
    const handleData = (
        <AuthContext.Consumer>
            {context => { 
                return (
                    <div className={classes.profileWrapper}>
                        <div className={classes.profileIconWrapper}>
                            <a className={classes.logout} href="/" onClick={clearSession}>sign out</a>
                            <img className={classes.profilePhoto} src={profileIcon} alt="profileIcon" />
                            {/* <input className={classes.uploadImg} type="file" name="pic" accept="image/*" /> */}
                            {/* <Button className={classes.button} type="file" name="pic">Default</Button> */}
                            <label htmlFor="raised-button-file">
                            <Button variant="raised" component="span" className={classes.button}>
                            <input
                            accept="image/*"
                            className={classes.input}
                            style={{ display: 'none' }}
                            id="raised-button-file"
                            multiple
                            type="file"
                            />Upload Image
                            </Button>
                            </label> 
                        </div>
                        <div className={classes.inputWrapper}>
                            <TextField
                                className={classes.textField}
                                label="Standard"
                                margin="normal"
                                value={context.firstName}
                                fullWidth
                            /><br />
                            <TextField
                                className={classes.textField}
                                label="Standard"
                                margin="normal"
                                type="email"
                                value={context.email}
                                fullWidth
                            /><br />

                            <span className={classes.about}>About</span>
                            <br />
                            <TextField
                                className={classes.textField}
                                label="Standard"
                                margin="normal"
                                fullWidth
                            />
                        </div>
                    </div>
                )
                
            }}
            </AuthContext.Consumer>
    )

            
            return (
                <>
                    {handleData}
                </>
            )
}

export default Profile