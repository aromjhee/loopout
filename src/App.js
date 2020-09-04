import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import Timer from './components/Timer';
import PopUp from './components/PopUp';
import LogIn from './components/LogIn';
import Register from './components/Register';

function App() {
  const [token, setToken] = useState('')
  const [userId, setUserId] = useState(0)

  if (localStorage.getItem('LOOPOUT_TOKEN')) {
    setToken(localStorage.getItem('LOOPOUT_TOKEN'))
    const { userId: id } = token
    setUserId(id)
  }

  return (
    <div className='bg-custom font-color-custom font-custom m-auto relative'>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={PopUp} />
          <Route path='/login' component={LogIn} setUserId={setUserId} />
          <Route path='/register' component={Register} setUserId={setUserId} />
          <Route path='/home' component={HomePage} />
          <Route path='/loopout' component={Timer} userId={userId} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
