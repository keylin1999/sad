import React, { useEffect, useState } from 'react';
import { List, Header, Segment, Table, Grid } from 'semantic-ui-react';



export const Transaction = ({ transaction_status, my_trans }) => {

    function getStatus(x) {
        if (x.has_accepted === 1) {
            return '已完成交易'
        }
        else if (x.has_paid === 1) {
            return '已付款'
        }
        else if (x.has_accepted === 1) {
            return '已接受訂單'
        }
        else {
            return '尚未處理'
        }
    }

    // function getPrice(x){
    //     let total = 0
    //     x.items.forEach(item => {
    //         total = total + item.price * item.number
    //     })
    //     return total
    // }

    return (

        <Segment inverted style={{ padding: '10vh', paddingBottom: "50vh" }}>
            <Header>我的訂單</Header>
            <List inverted>
                {my_trans.map(x => {
                    return (
                        <List.Item key={"trans" + x.transaction_id} style={{marginBottom:'10vh'}}>
                            <Grid>
                                <Grid.Column width={3}>
                                    <Header>
                                        編號: {x.transaction_id}<br/>
                                        狀態: {getStatus(x)}<br/>
                                        金額: {x.price}
                                    </Header>
                                </Grid.Column>
                                <Grid.Column width={8}>
                                    <Table inverted>
                                        <Table.Body>
                                            {x.items !== undefined?
                                            x.items.map(item => {
                                                console.log(item)
                                                return (
                                                    // <div>{item.name}:{item.price}元 {item.number}份</div>
                                                    <Table.Row>
                                                        <Table.Cell><Header>{item.name}</Header></Table.Cell>
                                                        <Table.Cell><Header>{item.price} 元</Header></Table.Cell>
                                                        <Table.Cell><Header>{item.number} 份</Header></Table.Cell>
                                                    </Table.Row>
                                                )
                                            })
                                            :null}
                                        </Table.Body>
                                    </Table>
                                </Grid.Column>
                            </Grid>
                        </List.Item>
                    )
                })}
            </List>
        </Segment>

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

// @app.route('/get_transactions_student')
// def get_transation_student():
//     student_id = request.args.get('student_id', type=str)
//     student_transactions = db.session.query(TransactionRecord).filter_by(student_id=student_id)
//     return_dic = []
//     for i in student_transactions:
//         dic = {}
//         dic['transaction_id']   = i.id
//         dic['store_id']         = i.store_id
//         dic['price']            = i.price
//         dic['date_time']        = i.date_time.strftime('%Y-%m-%d, %H:%M:%S')
//         dic['has_accepted']     = i.has_accepted
//         dic['has_completed']    = i.has_completed
//         dic['has_paid']         = i.has_paid
//         return_dic.append(dic)
    
//     return Response(json.dumps(return_dic), mimetype='application/json')