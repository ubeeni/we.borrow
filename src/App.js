import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainUser from './page/MainUser';
import Main from './page/Main';
import Login from './page/Login'



export default function App() { 

  return (
<> 
        <Router> 
          <Switch>
            <Route path="/MainUser" component={MainUser} />
            <Route path="/Main" component={Main} />
            <Route path="/" component={Login} />
            
          </Switch>
        </Router> 
      </>
  );

}
