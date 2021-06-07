import React, { useEffect, useState } from 'react';
// import './App.css';
import { Container, Button, Grid, Input, Item, Header, Segment, Form, Image, Advertisement } from 'semantic-ui-react';

import { Stores } from "./userComponents/Stores";
import { Foods } from "./userComponents/Foods";
import { Orders } from "./userComponents/Orders";
import { Transaction } from "./userComponents/Transaction"
// import pick from 'lodash/pick';
import { Link } from "react-router-dom";
import {useInterval} from './useInterval'

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

  const [showStore, setShowStore] = useState(true)
  const [showMenu, setShowMenu] = useState(true)
  const [showTrans, setShowTrans] = useState(true)

  const [my_trans, setMy_trans] = useState([])



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
      getTrans_by_student("1")
      getTrans_by_student("1")
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

  function rmAllOrders() {
    setOrders([])
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

  function showStoreInfo() {
    if (showStore === true) {
      setShowStore(false)
    }
    else {
      setShowStore(true)
    }
  }
  function showMenuInfo() {
    if (showMenu === true) {
      setShowMenu(false)
    }
    else {
      setShowMenu(true)
    }
  }
  function showTransInfo() {
    if (showTrans === true) {
      setShowTrans(false)
    }
    else {
      setShowTrans(true)
    }
  }

  async function getTrans_by_student(student_id){
    const res = await fetch('/get_transactions_student?student_id=' + student_id)
    const data = await res.json()

    // data.forEach(async(d) => {
    //   const item_res = await fetch('/get_transaction_items?transaction_id=' + d.transaction_id)
    //   const item_data = await item_res.json()
    //   d.items = item_data
    // })
    data.forEach(async(d) => {
      const item_res = await fetch('/get_transaction_items?transaction_id=' + d.transaction_id)
      const item_data = await item_res.json()
      d.items = item_data
    })
    setMy_trans(()=>{
      return [...data]
    })
  }
  

  return (
    <Container style={{ marginTop: 40 }}>
      {/* <Button attached='top' onClick={()=>show()}>顯示店家</Button> */}
      <Grid columns={2}>
        <Button.Group>
          <Button onClick={() => showStoreInfo()}>顯示店家</Button>
          <Button onClick={() => showMenuInfo()}>顯示菜單</Button>
          <Button onClick={() => showTransInfo()}>顯示訂單</Button>
          <Button><Link to="/">返回首頁</Link></Button>
        </Button.Group>

      </Grid>


      {showStore ?
        <Stores stores={stores} getFoods={getFoods} storeImg={storeImg} ></Stores>
        : null}

      {showMenu ?
        <Grid columns={2} stackable>
          <Grid.Column width={8}>
            <Foods foods={foods} orders={orders} setOrders={setOrders} ></Foods>
          </Grid.Column>
          <Grid.Column width={8}>
            <Orders orders={orders} sendOrders={sendOrders} rmAllOrders={rmAllOrders}></Orders>
          </Grid.Column>
        </Grid>
        : null}

      {showTrans ?
        <Transaction transaction_status={transaction_status} my_trans={my_trans}></Transaction>
        : null}
    </Container>
  );
}

export default UserPage;
