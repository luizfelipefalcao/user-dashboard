import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route} from 'react-router-dom';

import UserDashboard from './components/UserDashboard';
import UserDetail from './components/UserDetail';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={UserDashboard} />
          <Route exact path="/user-details" component={UserDetail} />
          <Route exact path="*" component={UserDashboard} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
