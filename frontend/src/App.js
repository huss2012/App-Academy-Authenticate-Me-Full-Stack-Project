import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import LoginFormPage from "./store/components/LoginFormPage";
import SignupFormPage from './store/components/SingupFormPage';
import * as sessionAction from "./store/session";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionAction.restoreUserSession()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return isLoaded && (
    <Switch>
      <Route path='/login' render={() => <LoginFormPage />} />
      <Route path='/signup' render={() => <SignupFormPage />} />
    </Switch>
  );
}

export default App;
