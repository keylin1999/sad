import React, {useEffect, useState} from 'react';
import './App.css';
import { Button, Container } from 'semantic-ui-react';
import { StoreFoods } from "./storeComponents/StoreFoods";
import { StoreOrders } from "./storeComponents/StoreOrders";
import { StoreTransaction} from "./storeComponents/StoreTransaction"
import { Link } from "react-router-dom";

function StorePage() {
  const [store_id, setStore_id] = useState('1') //預設是1號店家
  const [foods, setFoods] = useState([])
  const [ordersList, setOrdersList] = useState([])
  const [transactions, setTransactions] = useState([])
  const [transaction_items, setTransaction_items] = useState([])


  useEffect(() => {
    fetch('/get_items/' + store_id).then(res => 
      res.json().then(data => {
        console.log(data);
        setFoods(data)
      }))
    getTransactions();
  }, [])


  async function getTransactions(){
    const res = await fetch('/get_transactions?store_id=' + store_id)
    const data = await res.json()
    setTransactions([...data])
  }


  useEffect(()=>{
    transactions.forEach(async(x)=>{
      const item_res = await fetch('/get_transaction_items?transaction_id=' + x.transaction_id)
      const item_data = await item_res.json()
      setTransaction_items((prev)=>{
        return [...prev, item_data]
      })
    })
    console.log(transaction_items)
  },[transactions])

  useEffect(()=>{
    console.log("id",transactions)
    console.log('item',transaction_items)
  }, [transaction_items])


  return (
    <Container style={{ marginTop:40 }}>
      <div className="App"> 
        <h2>店家編號:{store_id}(預設一號店，會改掉)</h2>
        <h3>Menu</h3>
        <StoreFoods foods={foods}></StoreFoods>
        {/* <Orders orders={orders}></Orders> */}

        <Button onClick={() => getTransactions()}>更新當前訂單</Button>

        <StoreTransaction transactions={transactions} transaction_items={transaction_items}></StoreTransaction>
    
        <Link to="/">
            <Button>返回首頁</Button>
        </Link>
      </div>
    </Container>
  );
}

export default StorePage;
