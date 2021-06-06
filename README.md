usage 是如何使用的範例
return 就是回傳的範例
return list of 就是會回傳一個含有後面範例的 array
description 描述
POST 就是送 JSON 檔給 server 然後方法設成 POST

setup:
(開啟後端)(linux)
virtualenv venv
source venv/bin/activate
pip install -r requirement.txt
python app.py

(開啟前端)(windows)
在fffend資料夾內用cmd
npm install
然後
npm start

<> 裡面的東西就是直接把值打在那個 slash 後面
/get_store_image/<image_id> | method = GET
usage /get_store_image/1
description
回傳店家的圖片給定 store_id (image_id 要填要查的店家的 store_id)
return image (jpg)

/get_item_image/<image_id> | method = GET
usage /get_item_image/1
description
回傳商品圖片給定 item_id (image_id 要填要查的商品的 item_id)
return image (jpg)

/get_stores | method = GET
usage /get_stores
description
回傳所有店家的所有資訊
return list of
{
    "id": 1,
    "name": "store1",
    "description": "the first store",
    "start_time": "10:00",
    "end_time": "23:00",
    "open_days": "1234567",
    "phone_number": "098603451",
    "image_url": "/get_store_image/0"
}

/get_items/<store_id> | method = GET
usage /get_items/1
description
回傳某個店家的所有商品
return list of
{
    "id": 1,
    "store_id": 1,
    "name": "章魚燒",
    "description": "章魚燒描述",
    "price": 60,
    "image_id": "/get_item_image/1"
}

/get_transaction_status | method = GET
usage: /get_transaction_status?transaction_id=1 (1 can be other transaction_id)
description
回傳某筆交易的交易狀態
return
{
  "transaction_id": 1,
  "accepted": 0,
  "paid": 0,
  "finished": 0
}

/get_transactions | method = GET
usage: /get_transactions?store_id=1 //
description
回傳跟某個商店相關的所有交易
return list of
{
    "transaction_id": 1,
    "price": 360,
    "date_time": "2021-05-30, 20:08:22",
    "has_accepted": 0,
    "has_completed": 0,
    "has_paid": 0
}

/get_transaction_items | method = GET
usage: /get_transaction_items?transaction_id=1
description
回傳某個交易的交易明細（商品名稱跟商品數量跟商品價格）
return list of
{
    "name": "章魚燒",
    "price": 60,
    "number": 2
}

/send_transaction | method = POST
usage: post to server with format
description
傳送給伺服器一筆交易
items is all the item that the transaction purchased
{
    "store_id":2,
    "student_id":1,
    "items":[
        {
            "id":3,
            "number":2
        },
        {
            "id":5,
            "number":3
        }
    ]
}

/send_accept_item | method = POST
description
傳送給伺服器交易已接受（老闆送的）
post to server with format
{
    "transaction_id":1
}

/send_receive_cash | method = POST
description
傳送給伺服器交易已收到現金（老闆送的）
post to server with format
{
    "transaction_id":1
}

/send_item_finished | method = POST
description
傳送給伺服器交易已做完（老闆送的）
post to server with format
{
    "transaction_id":1
}
