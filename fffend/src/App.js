import React, {useEffect, useState} from 'react';
import './App.css';
import { HashRouter, Route, Switch, Link } from "react-router-dom";


import UserPage from './UserPage'
import StorePage from './StorePage'
import HomePage from './HomePage'

function App() {
  // const [stores, setStores] = useState([])

  // useEffect(() => {
  //   fetch('/get_stores').then(res => 
  //     res.json().then(data => {
  //       console.log(data);
  //       setStores(data);
  //     }))
  // }, [])



  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" component={HomePage}/>
        <Route exact path="/user" component={UserPage}/>
        <Route exact path="/store" component={StorePage}/>
      </Switch>
    </HashRouter>
  );
}

export default App;
