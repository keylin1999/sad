import React from 'react';
import {List, Header, Button} from 'semantic-ui-react';


export const Orders = ({orders}) => {
    return(
        <List>
            {orders.map(order => {
                return(
                    <List.Item key={order.name}>
                      <Header>
                        {order.name} : {order.qty} 份
                        {/* <Button onClick={() => addOrders(order.id, order.name)}>+</Button> */}
                        {/* <Button>-</Button>  */}
                      </Header>  
                    </List.Item> 
                )
            })}
        </List>
    )
}