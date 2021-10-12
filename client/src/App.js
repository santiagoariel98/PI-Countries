import './App.css';
import { Route, Switch } from "react-router";
// components
import LandingPage from "./components/LandingPage/LandingPage.js"
import Home from "./components/Home/Home.js"
import CardDetail from "./components/CardDetail/CardDetail.js"
import FormActivity from "./components/FormActivity/FormActivity.jsx"
import Errors from "./components/Error/Error.js"
//


function App() {
  return (
    <div className="App">
    <Switch>
      <Route exact path="/" component={LandingPage}/>
      <Route exact path="/home" component={Home}/>
      <Route exact path='/country/:id' component={CardDetail}/>
      <Route exact path="/Activity" component={FormActivity}/>
      <Route path="*" component={Errors}></Route>      
    </Switch>
    </div>
  );
}

export default App;
