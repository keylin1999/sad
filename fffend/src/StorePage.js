import React, { useEffect, useState, useRef } from 'react';
// import './App.css';
import { Container, Button, Grid, Input, Item, Header, Segment, Form, Image, Advertisement } from 'semantic-ui-react';

import { StoreFoods } from "./storeComponents/StoreFoods";
import { StoreTransaction } from "./storeComponents/StoreTransaction"
import { Link } from "react-router-dom";

import {useInterval} from './useInterval'

function StorePage() {
  const [store_id, setStore_id] = useState('1') //預設是1號店家
  const [foods, setFoods] = useState([])
  const [transactions, setTransactions] = useState([])

  // useInterval(getTransactions, 3000);

  useEffect(() => {
    fetch('/get_items/' + store_id)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setFoods(data)
      })
    getTransactions();
  }, [])


  async function getTransactions() {
    const res = await fetch('/get_transactions?store_id=' + store_id)
    const data = await res.json()

    data.forEach(async (x) => {
      const item_res = await fetch('/get_transaction_items?transaction_id=' + x.transaction_id)
      const item_data = await item_res.json()
      x.item = item_data
      x.show = false
    })

    setTransactions([...data])
  }


  useEffect(() => {
    console.log("id", transactions)
  }, [transactions])

  function showAllInfo(index) {
    setTransactions((prev) => {
      prev.forEach(p => {
        p.show = true
      })
      return [...prev]
    })
  }
  function closeAllInfo(index) {
    setTransactions((prev) => {
      prev.forEach(p => {
        p.show = false
      })
      return [...prev]
    })
  }


  // setTimeout(getTransactions, 5000);
  

  return (
    <Container style={{ marginTop: 40 }}>
      <Header as='h1' textAlign='center'>店家訂單系統</Header>
      {/* <StoreFoods foods={foods}></StoreFoods> */}
      {/* <Orders orders={orders}></Orders> */}
      <Button.Group>
        <Button onClick={() => getTransactions()}>更新當前訂單</Button>
        <Button onClick={() => showAllInfo()}>顯示全部</Button>
        <Button onClick={() => closeAllInfo()}>關閉全部</Button>
        <Button><Link to="/">返回首頁</Link></Button>
      </Button.Group>
      <br/><br/>
      <StoreTransaction transactions={transactions} setTransactions={setTransactions} getTransactions={getTransactions}></StoreTransaction>
    </Container>
  );
}

// function useInterval(callback, delay) {
//   const savedCallback = useRef();

//   // 保存新回调
//   useEffect(() => {
//     savedCallback.current = callback;
//   });

//   // 建立 interval
//   useEffect(() => {
//     function tick() {
//       savedCallback.current();
//     }
//     if (delay !== null) {
//       let id = setInterval(tick, delay);
//       return () => clearInterval(id);
//     }
//   }, [delay]);
// }

export default StorePage;