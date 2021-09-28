import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Main from './page/Main';
import Login from './page/Login'



export default function App() { 

  return (
<> 
        <Router> 
          <Switch>
            <Route path="/" component={Login} />
            <Route path="/Main" component={Main} />
              

          </Switch>
        </Router> 
      </>
  );

}
