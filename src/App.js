import logo from './logo.svg';
import './App.css';
import Login from './Component/Login';
import {BrowserRouter as Router,Switch,Route } from 'react-router-dom';
import Register from './Component/Register';
import HomePage from './Component/HomePage';

function App() {
  return (
    <div className="App">
      <Router>
          <Switch>
            <Route path='/' exact component={Login}/>
            <Route path='/Register' exact component={Register}/>
            <Route path='/HomePage' exact component={HomePage}/>
          </Switch>
      </Router>
    </div>
  );
}

export default App;
