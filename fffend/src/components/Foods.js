import React from 'react';
import {List, Header, Button} from 'semantic-ui-react';


export const Foods = ({ foods }) => {
    return(
        <List>
            {foods.map(food => {
                return(
                    <List.Item key={food.id}>
                      <Header>{food.name} : {food.price} 元</Header>            
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