import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import Timer from './components/Timer';
import PopUp from './components/PopUp';
import LogIn from './components/LogIn';
import Register from './components/Register';

function App() {

  return (
    <div className='bg-custom font-color-custom font-custom m-auto relative'>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={PopUp} />
          <Route path='/login' component={LogIn} />
          <Route path='/register' component={Register} />
          <Route path='/home' component={HomePage} />
          <Route path='/loopout' component={Timer} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
