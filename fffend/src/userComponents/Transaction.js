import React, { useEffect, useState } from 'react';
import {List, Header, Button} from 'semantic-ui-react';



export const Transaction = ({transaction_status}) => {

    function getStatus(x){
        if(x.finished === 1){
            return '已完成交易'
        }
        else if(x.paid === 1){
            return '已付款'
        }
        else if(x.accepted === 1){
            return '已接受訂單'
        }
        else{
            return '尚未處理'
        }
    }

    return(
        <List>
            {transaction_status.map(x => {
                return(
                    <List.Item key={"trans" + x.transaction_id}>
                      <Header>
                        {x.transaction_id}
                        {getStatus(x)}
                        {x.items.map(item => {
                            return(<div>{item.name}:{item.price}元 {item.number}份</div>)
                        })}
                      </Header>  
                    </List.Item> 
                )
            })}
        </List>
    )
}

// /get_transaction_status | method = GET
// usage: /get_transaction_status?transaction_id=1 (1 can be other transaction_id)
// description
// 回傳某筆交易的交易狀態
// return
// {
//   "transaction_id": 1,
//   "accepted": 0,
//   "paid": 0,
//   "finished": 0
// }
  
// /get_transaction_items | method = GET
// usage: /get_transaction_items?transaction_id=1
// description
// 回傳某個交易的交易明細（商品名稱跟商品數量跟商品價格）
// return list of
// {
//     "name": "章魚燒",
//     "price": 60,
//     "number": 2
// }