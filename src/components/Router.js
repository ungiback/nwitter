import React from 'react'
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Auth from '../routes/Auth'
import Home from '../routes/Home'
import { Profile } from '../routes/Profile'
import Navigation from './Navigation'

const AppRouter = ({ refreshUser, isLoggedIn, userObj }) => {
    return (
        <Router>
            {isLoggedIn && <Navigation userObj={userObj} />}
            {/* Navigation이 존재하려면, isLoggedIn이 true 여야 한다 */}
            <Switch>
                {isLoggedIn ?
                    <div
                        style={{
                            maxWidth: 890,
                            width: "100%",
                            margin: "0 auto",
                            marginTop: 80,
                            display: "flex",
                            justifyContent: "center",
                        }}>
                        <Route exact path='/'>
                            <Home userObj={userObj} />
                        </Route>
                        <Route exact path='/profile'>
                            <Profile refreshUser={refreshUser} userObj={userObj?userObj:{displayName:"user"}} />
                        </Route>
                    </div> :
                    <>
                        <Route exact path='/'>
                            <Auth />
                        </Route>
                        <Redirect from="*" to="/" />
                    </>}
            </Switch>
        </Router >
    )
}

export default AppRouter;