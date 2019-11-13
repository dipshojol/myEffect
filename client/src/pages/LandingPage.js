import React from "react"
import Auth from './Auth'
import './LandingPage.css'
import myEffectLogo from '../assets/image/icon-logo.svg'
import screen1 from '../assets/image/screen1.svg'
import screen2 from '../assets/image/screen2.svg'
import iphoneSilver from '../assets/image/iphone-silver.png'
import AppStore from '../assets/image/icon-download-ios.svg'
import AndroidStore from '../assets/image/icon-download-android.svg'

const LandingPage = () => {
    return (
        <>
            <div className="landing-wrapper">
                <div className="logo-container">
                    <img src={myEffectLogo} alt="icon-logo"/>
                </div>
                <div className="mobile-site">
                    <div>
                        <img src={screen2} alt="" />
                        <img src={iphoneSilver} alt="" />
                    </div>
                    <div>
                        <img src={screen1} alt="" />
                        <img src={iphoneSilver} alt="" />
                    </div>

                </div>
                <div className="sign-up-container">
                    <div className="main-sign-up-wrapper">
                        <div className='sign-up-wrapper'>
                            <Auth />
                        </div>
                        <div className='sign-in-wrapper'>
                            <span>Have an account? <a className="login-text">Log In</a></span>
                        </div>
                        <div className="app-wrapper">
                            <h3>Get the App</h3>
                            <img src={AppStore} alt="" />
                            <img src={AndroidStore} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default LandingPage