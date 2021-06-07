import React, { useEffect, useState } from 'react';
import { Container, Button, Grid, Input, Item, Header, Segment, List, Menu, Table } from 'semantic-ui-react';


export const StoreTransaction = ({ transactions, setTransactions, getTransactions }) => {

    const [showTransCols, setShowTransCols] = useState([true, true, true])

    function getStatus(x) {
        if (x.has_completed === 1) {
            return '已完成'
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

    async function accept_item(trans_id) {
        const res = await fetch('/send_accept_item', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ "transaction_id": trans_id })
        })
    }
    async function receive_cash(trans_id) {
        const res = await fetch('/send_receive_cash', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ "transaction_id": trans_id })
        })
    }
    async function item_finished(trans_id) {
        const res = await fetch('/send_item_finished', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ "transaction_id": trans_id })
        })
    }


    function showInfo(index) {
        if (transactions[index].show === false) {
            setTransactions((prev) => {
                prev[index].show = true
                return [...prev]
            })
        }
        else {
            setTransactions((prev) => {
                prev[index].show = false
                return [...prev]
            })
        }
    }

    function showTransColsInfo(x) {
        console.log(showTransCols[x])
        if (showTransCols[x] === true) {
            setShowTransCols((prev) => {
                prev[x] = false
                return [...prev]
            })
        }
        else {
            setShowTransCols((prev) => {
                prev[x] = true
                return [...prev]
            })
        }
    }


const Results = ({ id, index, status }) => {
    const trans_items = transactions[index].item
    return (

        <div>
            <Table>
                <Table.Body>
                    {trans_items.map(item => {
                        return (
                            // <div>{item.name}:{item.price}元 {item.number}份</div>
                            <Table.Row>
                                <Table.Cell><Header>{item.name}</Header></Table.Cell>
                                <Table.Cell><Header>{item.price} 元</Header></Table.Cell>
                                <Table.Cell><Header>{item.number} 份</Header></Table.Cell>
                            </Table.Row>
                        )
                    })}
                </Table.Body>
            </Table>
            <Button.Group attached='bottom'>
                {status === "尚未處理"?
                <Button onClick={() => {accept_item(id); getTransactions();}}>接受訂單</Button>
                :null}
                {/* <Button onClick={() => receive_cash(id)}>已付款</Button> */}
                {status === "已接受訂單"?
                <Button onClick={() => {item_finished(id); getTransactions();}}>已完成</Button>
                :null}
            </Button.Group>
        </div>
    )
}


function listTrans(statusStr) {
    return (
        transactions.map(x => {
            const index = transactions.indexOf(x)
            const id = x.transaction_id
            const status = getStatus(x)
            return (
                status === statusStr ?
                    <List.Item key={"trans" + x.transaction_id} >
                        <Menu vertical stackable style={{ width: '50vh'}}>
                            <Menu.Item onClick={() => showInfo(index)}>
                                <Header>
                                    交易編號: {x.transaction_id}
                                        金額: {x.price}
                                </Header>
                                <Header>時間: {x.date_time}</Header>
                                <Header>狀態: {status}</Header>
                            </Menu.Item>
                            <Menu.Item>
                                {x.show ? <Results id={id} index={index} status={status}/> : null}
                            </Menu.Item>
                        </Menu>
                    </List.Item>
                    : null
            )
        })
    )
}

return (
    <Grid columns={3} stackable>
        <Grid.Column>
            <Menu vertical stackable style={{ width: '50vh' }}>
                <Menu.Item onClick={() => showTransColsInfo(0)}>
                <Header>尚未處理訂單</Header>
                </Menu.Item>
                {showTransCols[0]?
                <Menu.Item>
                    <List>
                    {listTrans('尚未處理')}
                    </List>
                    </Menu.Item>
                : null}
            </Menu>
        </Grid.Column>
        <Grid.Column>
        <Menu vertical stackable style={{ width: '50vh' }}>
                <Menu.Item onClick={() => showTransColsInfo(1)}>
                <Header>已接受訂單</Header>
                </Menu.Item>
                {showTransCols[1]?
                <Menu.Item>
                    <List>
                    {listTrans('已接受訂單')}
                    </List>
                    </Menu.Item>
                : null}
            </Menu>
        </Grid.Column>
        <Grid.Column>
        <Menu vertical stackable style={{ width: '50vh' }}>
                <Menu.Item onClick={() => showTransColsInfo(2)}>
                    <Header>已完成訂單</Header>
                </Menu.Item>
                {showTransCols[2]?
                <Menu.Item>
                    <List>
                    {listTrans('已完成')}
                    </List>
                    </Menu.Item>
                : null}
            </Menu>
        </Grid.Column>

    </Grid>
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
