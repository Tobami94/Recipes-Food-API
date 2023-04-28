import './App.css';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

//components
import LandingPage from './components/LandingPage/LandingPage';
import HomePage from './components/HomePage/HomePage';
import DetailsPage from './components/DetailsPage/DetailsPage'
import FormPage from './components/FormPage/FormPage';





function App() {


  return (
    <BrowserRouter>
  <div className='App' style={{ padding: '0px' }}>
  
    <Switch>
    <Route exact path="/welcome" component={LandingPage}/>
    <Route exact path="/home" component={HomePage}/>
    <Route path="/:id" component={DetailsPage}/>
    <Route exact path="/" component={FormPage}/>
    </Switch>
  
    </div>
   </BrowserRouter>
    
  );
}

export default App;
