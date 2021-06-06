import React, { useEffect, useState } from 'react';
// import './App.css';
import { Container, Button, Grid, Input, Item, Header, Segment, Form, Image, Advertisement } from 'semantic-ui-react';

import { Stores } from "./userComponents/Stores";
import { Foods } from "./userComponents/Foods";
import { Orders } from "./userComponents/Orders";
import { Transaction } from "./userComponents/Transaction"
// import pick from 'lodash/pick';
import { Link } from "react-router-dom";

function UserPage() {

  const [account, setAccount] = useState("b07705099@ntu.edu.tw")
  const [password, setPassword] = useState("12345")

  const [stores, setStores] = useState([])
  const [storeImg, setStoreImg] = useState([])

  const [curStore, setCurStore] = useState("")
  const [foods, setFoods] = useState([])
  const [orders, setOrders] = useState([])

  const [transaction_ids, setTransaction_ids] = useState([])
  const [transaction_status, setTransaction_status] = useState([])



  useEffect(() => {
    fetch('/get_stores')
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setStores(data);

        //先不拿圖片，會塞爆
        //   data.forEach(x => {
        //   getStoreImg(x.id)
        //   })
        //   console.log(storeImg)
        //   console.log(storeImg)

      })

  }, [])


  function getStoreImg(store_id) {
    fetch('/get_store_image/' + store_id)
      .then(res => res.blob())
      .then(image => {
        setStoreImg((prev) => {
          return [...prev, URL.createObjectURL(image)]
        })
      })
  }

  // function getItemImg(item_id)




  async function getFoods(storeId) {
    setCurStore(storeId)
    const res = await fetch('/get_items/' + storeId)
    const foodData = await res.json()
    // console.log(foodData)
    setFoods(foodData)
  }

  async function sendOrders() {
    const order_to_send = {
      "store_id": curStore,
      "student_id": 1,
      "items": orders.map(x => {
        return { 'id': x.id, 'number': x.qty }
      })
    }
    // console.log(order_to_send)
    const res = await fetch('/send_transaction', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(order_to_send)
    })

    if (res.ok) {
      console.log('response worked!');
      const data = await res.json()
      setTransaction_ids((prev) => {
        return [...prev, data.transaction_id]
      })
    }
    else {
      console.log('response fail!')
      alert('訂單失敗，請重試!')
    }
  }

  useEffect(async () => {
    const trans_id = transaction_ids[transaction_ids.length - 1]

    const res = await fetch('/get_transaction_status?transaction_id=' + trans_id)
    const data = await res.json()
    console.log(data)

    const item_res = await fetch('/get_transaction_items?transaction_id=' + trans_id)
    const item_data = await item_res.json()

    data.items = item_data
    setTransaction_status((prev) => {
      return [...prev, data]
    })
    // console.log(transaction_status)

  }, [transaction_ids])

  useEffect(() => {
    console.log('transaction_status', transaction_status)
  }, [transaction_status])


  async function getTrans_status(trans_id) {
    const res = await fetch('/get_transaction_status?transaction_id=' + trans_id)
    const data = await res.json()
    console.log(data)
    setTransaction_status((prev) => {
      return [...prev, data]
    })
  }

  const imgUrl = ['']

  return (
    <Container style={{ marginTop: 40 }}>

      <div>
        <Stores stores={stores} getFoods={getFoods} storeImg={storeImg} ></Stores>

        <Foods foods={foods} orders={orders} setOrders={setOrders} ></Foods>

        <Orders orders={orders}></Orders>

        <Button onClick={() => sendOrders()}>送出</Button>
        {/* <Button onClick={() => getTrans()}>取得訂單</Button> */}
        <Link to="/">
          <Button>返回首頁</Button>
        </Link>

        <Transaction transaction_status={transaction_status}></Transaction>
      </div>
    </Container>
  );
}

export default UserPage;
