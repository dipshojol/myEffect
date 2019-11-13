import React from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom";
import MainNav from '../components/Navigation/MainNav';
import Profile from './Profile'
import Page2 from './Page2'
import Page1 from './Page1'

const Dashboard = () => {
    return (
        <>
            <div>
                <BrowserRouter>
                    <MainNav />
                    <Switch>
                        <Route path="/dashboard/profile" component={Profile} />
                        <Route path="/dashboard/page2" component={Page2} />
                        <Route path="/dashboard/page1" component={Page1} />
                    </Switch>
                </BrowserRouter>

        </div>
        </>
    )
}
export default Dashboard