import React from 'react';
import {List, Header, Button} from 'semantic-ui-react';



export const Foods = ({ foods, orders, setOrders }) => {
    
    function addOrders(id, name){
        if(orders.length === 0){
            setOrders(function(prevOrders){
                return[...prevOrders, { id:id, name:name, qty:1 }]
            })
        }
        else{
            let index = orders.map(anOrder => anOrder.name).indexOf(name);
            if(index === -1){
                setOrders(function(prevOrders){
                    return[...prevOrders, { id:id, name:name, qty:1 }]
                })
            }
            else{
                let newOrders = [...orders]
                let qty = newOrders[index].qty
                newOrders[index].qty = qty + 1
                setOrders([...newOrders])
            }
            // else{
            //     setOrders(function(prevOrders){
            //         let newOrders = [...prevOrders]
            //         newOrders[index].qty = prevOrders[index].qty+1
            //         return [...newOrders]
            //     })
            // }
            //這個寫法會直接爆死，還不知道為啥，de了一個多小時，有時間之後要figure out一下
        }
    }

    function rmOrders(id, name){
        let index = orders.map(anOrder => anOrder.name).indexOf(name);
        if(index === -1){
            console.log('購物車不存在此品項')
        }
        else if(orders[index].qty === 1){
            setOrders(orders.filter(order => order.name !== name))
        }
        else{
            let newOrders = [...orders]
            let qty = newOrders[index].qty
            newOrders[index].qty = qty - 1
            setOrders([...newOrders])
        }
    }


    return(
        <List>
            {foods.map(food => {
                return(
                    <List.Item key={food.id}>
                      <Header>
                        {food.name} : {food.price} 元
                        <Button onClick={() => addOrders(food.id, food.name)}>+</Button>
                        <Button onClick={() => rmOrders(food.id, food.name)}>-</Button> 
                      </Header>  
                    </List.Item> 
                )
            })}
        </List>
    )
}

// {
//     "id": 1,
//     "store_id": 1,
//     "name": "章魚燒",
//     "description": "章魚燒描述",
//     "price": 60,
//     "image_id": "/get_item_image/1"
// }