import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Logon from './pages/Logon';
import Register from './pages/Register';
import Profile from './pages/Profile';
import NewPerson from './pages/NewPerson';
import AllFamily from './pages/AllFamily';
import AllPerson from './pages/AllPerson';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Logon} />
                <Route path="/register" component={Register} />
                <Route path="/profile" component={Profile} />
                <Route path="/person/new" component={NewPerson} />
                <Route path="/family" component={AllFamily} />
                <Route path="/person" component={AllPerson}/>
            </Switch>
        </BrowserRouter>
    );
} 