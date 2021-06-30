import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Homepage from './pages/index';
import Signin from './pages/signin';
import Signup1 from './pages/signup-1'
import Signup2 from './pages/signup-2'
import Forgot from './pages/forgot'
import Reset from './pages/reset'
import Otp1 from './pages/otp-1'
import Otp2 from './pages/otp-2'
import DashBoard from './pages/dashboard'
import Sucess from './pages/sucess'
import Failed from './pages/failed'
import ConfirmEmail from './pages/confirmEmail'
import Reset2 from './pages/reset-2'
import AccountOverview from './pages/account-overview';
import AccountWithdraw from './pages/account-withdraw';
import AccountDeposit from './pages/account-deposit';

class Index extends Component {
    render() {
        return (
            <>
                <BrowserRouter >
                    <div id="main-wrapper">
                        <Switch>
                            <Route path='/' exact component={Homepage} />
                            <Route path='/signin' component={Signin} />
                            <Route path='/signup/createUser' component={Signup1} />
                            <Route path='/signup/personaldetails' component={Signup2} />
                            <Route path='/forgot' component={Forgot} />
                            <Route path='/confirmDataReset' component={Reset} />
                            <Route path='/reset' component={Reset2} />
                            <Route path='/otp-1' component={Otp1} />
                            <Route path='/otp-2' component={Otp2} />
                            <Route path='/dashboard' component={DashBoard}/>
                            <Route path='/sucess' component={Sucess}/>
                            <Route path='/failed'   component={Failed}/>
                            <Route path="/confirmEmail" component={ConfirmEmail}/>
                            <Route path="/account-overview" component={AccountOverview}/>
                            <Route path="/account-withdraw" component={AccountWithdraw}/>
                            <Route path="/account-deposit" component={AccountDeposit}/>
                        </Switch>
                    </div>
                </BrowserRouter>

            </>
        );
    }
}
export default Index;