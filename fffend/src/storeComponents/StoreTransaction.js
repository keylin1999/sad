import React, { useEffect, useState } from 'react';
import {List, Header, Button} from 'semantic-ui-react';


export const StoreTransaction = ({transactions, transaction_items}) => {

    const [show, setShow] = useState([])

    function getStatus(x){
        if(x.has_completed === 1){
            return '已完成交易'
        }
        else if(x.has_paid === 1){
            return '已付款'
        }
        else if(x.has_accepted === 1){
            return '已接受訂單'
        }
        else{
            return '尚未處理'
        }
    }

    async function accept_item(trans_id){
        const res = await fetch('/send_accept_item',{
          method: 'POST',
          headers:{
            'Content-type': 'application/json'
          },
          body: JSON.stringify({"transaction_id": trans_id})
        })
    }
    async function receive_cash(trans_id){
        const res = await fetch('/send_receive_cash',{
          method: 'POST',
          headers:{
            'Content-type': 'application/json'
          },
          body: JSON.stringify({"transaction_id": trans_id})
        })
    }
    async function item_finished(trans_id){
        const res = await fetch('/send_item_finished',{
          method: 'POST',
          headers:{
            'Content-type': 'application/json'
          },
          body: JSON.stringify({"transaction_id": trans_id})
        })
    }


    async function showTransInfo(id, index){
        setShow((prev)=>{
            return [...prev, id]
        })
        console.log("show",show)
        console.log("in",show.includes(id))
    }

    const Results = ({id, index}) =>{
        const trans_items = transaction_items[index]
        return(
            <div>
            {trans_items.map(item => {
                return(
                <div>
                    {item.name}:{item.price}元 {item.number}份
                </div>
                )
            })}
                <Button onClick={() => accept_item(id)}>接受訂單</Button>
                <Button onClick={() => receive_cash(id)}>已付款</Button>
                <Button onClick={() => item_finished(id)}>已完成</Button>
            </div>
        )}
    

    return(
        <List>
            {transactions.map(x => {
                const index = transactions.indexOf(x)
                const id = x.transaction_id
                return(
                    <List.Item key={"trans" + x.transaction_id}>
                      <Header>
                          交易編號: {x.transaction_id}
                          金額: {x.price}
                          時間: {x.date_time}
                          狀態: {getStatus(x)}
                          <Button onClick={() => showTransInfo(id, index)}>查看</Button>
                          {show.includes(id) ? <Results id={id} index={index} /> : null }
                          {/* <Results id={id} index={index} /> */}
                      </Header>  
                    </List.Item> 
                )
            })}
        </List>
    )
}

// /get_transactions | method = GET
// usage: /get_transactions?store_id=1 //
// description
// 回傳跟某個商店相關的所有交易
// return list of
// {
//     "transaction_id": 1,
//     "price": 360,
//     "date_time": "2021-05-30, 20:08:22",
//     "has_accepted": 0,
//     "has_completed": 0,
//     "has_paid": 0
// }


// /send_accept_item | method = POST
// description
// 傳送給伺服器交易已接受（老闆送的）
// post to server with format
// {
//     "transaction_id":1
// }

// /send_receive_cash | method = POST
// description
// 傳送給伺服器交易已收到現金（老闆送的）
// post to server with format
// {
//     "transaction_id":1
// }

// /send_item_finished | method = POST
// description
// 傳送給伺服器交易已做完（老闆送的）
// post to server with format
// {
//     "transaction_id":1
// }
