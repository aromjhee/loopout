import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import Timer from './components/Timer';

function App() {
  return (
    <div className='bg-custom font-color-custom font-custom m-auto'>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/loopout' component={Timer} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
