import React from 'react';
import './App.css';
import { Loginreg } from './components/LoginReg';
import {BrowserRouter as Router , Switch , Route , Link} from "react-router-dom" 
import { Userclub } from './components/Userclub';
import { Thecheckercmp } from './components/TheCheckercmp';



function App() {
  return (
    
    <div className="app">
    <Router>
      <Switch>
     
      <Route exact path="/:username" component={Userclub}/>
            
      <Route exact path="/" component={Thecheckercmp}/>
      </Switch>
     </Router>
    </div>
    
  );
}

export default App;
