import React from 'react';
import {List, Header, Button} from 'semantic-ui-react';


export const Stores = ({ stores, getFoods}) => {
    return(
        <List>
            {stores.map(aStore => {
                return(
                    <List.Item key={aStore.id}>
                        <button onClick={() => getFoods(aStore.id)}>
                            <Header>{aStore.id} : {aStore.name}</Header>
                        </button>
                    </List.Item> 
                )
            })}
        </List>
    )
}