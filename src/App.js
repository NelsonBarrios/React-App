import Home from "./pages/Home";
import Login from './pages/Login';
import BandDescription from './pages/BandDescription';
import Protected from './pages/Protected';
import './App.css';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  return (
    //Routes Components
    <Router>
      <Switch>
      <Route path='/home' exact>
          <Protected Cmp={Home}/>
        </Route>
        <Route path='/:id' exact>
          <Protected Cmp={BandDescription}/>
        </Route>
        <Route path='/' exact component={Login} />
        <Route path='*' exact component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
