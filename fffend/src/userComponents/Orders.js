import React from 'react';
import { List, Header, Button, Segment, Table } from 'semantic-ui-react';



export const Orders = ({ orders, sendOrders, rmAllOrders }) => {

    function getPrice(){
        let total = 0
        orders.forEach(order => {
            total = total + order.price * order.qty
        })
        return total
    }

    return (
        <Segment inverted>
            <Header>
                購物車
                <Button floated='right' inverted onClick={() => rmAllOrders()}>
                    清空
                </Button>
            </Header>
            
            <List inverted>
                {orders.map(order => {
                    return (
                        <List.Item key={order.name}>
                            <Header>
                                {order.name}: {order.qty} 份
                        {/* <Button onClick={() => addOrders(order.id, order.name)}>+</Button> */}
                                {/* <Button>-</Button>  */}
                            </Header>
                        </List.Item>
                    )
                })}
                
                <Header textAlign='right' inverted>金額: {getPrice()}</Header>
                <Button attached='bottom' inverted onClick={() => sendOrders()}>送出</Button>
            </List>
        </Segment>


    )
}