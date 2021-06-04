import React, {useEffect, useState} from 'react';
import './App.css';
import { Stores } from "./components/Stores"
import { Foods } from "./components/Foods"
import { Container } from 'semantic-ui-react'
import { Orders } from "./components/Orders"



function App() {
  const [stores, setStores] = useState([])
  const [foods, setFoods] = useState([])
  const [orders,setOrders] = useState([])

  useEffect(() => {
    fetch('/get_stores').then(res => 
      res.json().then(data => {
        console.log(data);
        setStores(data);
      }))
  }, [])



  async function getFoods(storeId) {
    const res = await fetch('/get_items/'+storeId)
    const foodData = await res.json()
    // console.log(foodData)
    setFoods(foodData)
  }

  return (
    <Container style={{ marginTop:40 }}>
      <div className="App">
        <Stores stores={stores} getFoods={getFoods} ></Stores>
        <Foods foods={foods} orders={orders} setOrders={setOrders} ></Foods>
        <Orders orders={orders}></Orders>
      </div>
    </Container>
  );
}

export default App;
