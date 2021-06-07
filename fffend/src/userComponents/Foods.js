import React from 'react';
import { List, Header, Button, Table } from 'semantic-ui-react';



export const Foods = ({ foods, orders, setOrders }) => {

    function addOrders(id, name, price) {
        if (orders.length === 0) {
            setOrders(function (prevOrders) {
                return [...prevOrders, { id: id, name: name, qty: 1, price: price }]
            })
        }
        else {
            let index = orders.map(anOrder => anOrder.name).indexOf(name);
            if (index === -1) {
                setOrders(function (prevOrders) {
                    return [...prevOrders, { id: id, name: name, qty: 1, price: price }]
                })
            }
            else {
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

    function rmOrders(id, name) {
        let index = orders.map(anOrder => anOrder.name).indexOf(name);
        if (index === -1) {
            console.log('購物車不存在此品項')
        }
        else if (orders[index].qty === 1) {
            setOrders(orders.filter(order => order.name !== name))
        }
        else {
            let newOrders = [...orders]
            let qty = newOrders[index].qty
            newOrders[index].qty = qty - 1
            setOrders([...newOrders])
        }
    }

    return (
        <Table celled inverted selectable textAlign='center' unstackable>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell width={6}>食物</Table.HeaderCell>
                    <Table.HeaderCell width={6}>價格</Table.HeaderCell>
                    <Table.HeaderCell width={4}></Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {foods.length === 0 ?
                    <Table.Row>
                        <Table.Cell textAlign='center'>請點選店家</Table.Cell>
                    </Table.Row>
                    : null}
                {
                    foods.map(food => {
                        return (
                            <Table.Row>
                                <Table.Cell>{food.name}</Table.Cell>
                                <Table.Cell>{food.price} 元</Table.Cell>
                                <Table.Cell>
                                    <Button basic color='orange' onClick={() => addOrders(food.id, food.name, food.price)}>+</Button>
                                    <Button basic color='orange' onClick={() => rmOrders(food.id, food.name)}>-</Button>
                                </Table.Cell>

                            </Table.Row>
                        )
                    })
                }
            </Table.Body>
        </Table>
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