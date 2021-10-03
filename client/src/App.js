import './App.css';
import { Route } from "react-router";
// components
import LandingPage from "./components/LandingPage/LandingPage.js"
import Home from "./components/Home/Home.js"
import CardDetail from "./components/CardDetail/CardDetail.js"
import FormActivity from "./components/FormActivity/FormActivity.jsx"
//

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={LandingPage}/>
      <Route exact path="/home" component={Home}/>
      <Route exact path='/country/:id' component={CardDetail}/>
      <Route exact path="/Activity" component={FormActivity}/>
    </div>
  );
}

export default App;
