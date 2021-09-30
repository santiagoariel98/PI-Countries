import './App.css';
import { Route } from "react-router";
// components
import Home from "./components/Home/Home.js"
import Countries from "./components/Countries/Countries.js"

//

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Home}/>
      <Route exact path="/countries" component={Countries}/>
    </div>
  );
}

export default App;
