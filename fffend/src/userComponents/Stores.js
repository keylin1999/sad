import React from 'react';
import { Header, List, Button, Grid, Image } from 'semantic-ui-react';

export const Stores = ({ stores, getFoods, storeImg }) => {

    const urls = ['https://leafyeh.com/wp-content/uploads/flickr/42076077425_cb534355bd_o.jpg',
        'https://aniseblog.tw/wp-content/uploads/2019/08/1566147631-3955b0cbeeb7b17e165186d46f3b3cce.jpg',
        'https://s.yimg.com/os/zh-Hant-TW/homerun/yahoo__216/5d4629e2decd0ccfe6f0934e2cac4a76',

        'http://leafyeh.com/wp-content/uploads/flickr/33181710782_3a3ccbabe3_o.jpg',
        'https://image.cache.storm.mg/styles/smg-800x533-fp/s3/media/image/2017/02/09/20170209-043052_U6077_M246043_1a27.jpg?itok=yJDdMkxH',
        'https://images.zi.org.tw/ihappyday/2018/10/12170152/1539334912-f8d96daa5d253fbbc7e597dfb7b84493.jpg'
    ]

    return (
        <Grid columns={3} centered={true} stackable>
            {stores.map(aStore => {
                return (
                    <Grid.Column>
                        <Button onClick={() => getFoods(aStore.id)} color='black' fluid>
                            <Image src={urls[aStore.id - 1]} style={{ width: '30vh', height: '20vh' }} centered />
                            
                            <List>
                                <Header color='pink'>{aStore.name}</Header>
                                <List.Item>營業時間:{aStore.start_time}~{aStore.end_time}</List.Item>
                                <List.Item>電話號碼:{aStore.phone_number}</List.Item>
                            </List>
                        </Button>
                    </Grid.Column>
                )
            })}
        </Grid>
    )
}

// 回傳所有店家的所有資訊
// return list of
// {
//     "id": 1,
//     "name": "store1",
//     "description": "the first store",
//     "start_time": "10:00",
//     "end_time": "23:00",
//     "open_days": "1234567",
//     "phone_number": "098603451",
//     "image_url": "/get_store_image/0"
// }