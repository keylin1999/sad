from datetime import datetime
from flask import Flask, request, send_file
from flask.wrappers import Response
from database import *
import json
from sqlalchemy import func

mysql_url = "{drivername}://{user}:{password}@{host}:{port}/{db_name}?charset=utf8mb4".format(
    drivername="mysql+pymysql",
    user="root",
    password="root",
    host="localhost",
    port="3306",
    db_name="sad"
)

app = Flask(__name__)
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config['SQLALCHEMY_DATABASE_URI'] = mysql_url
db.app = app
db.init_app(app)
db.create_all()

@app.route('/')
def index_html():
    index_html_path = 'website/index.html'
    return send_file(index_html_path)

@app.route('/website/<file_name>')
def return_file(file_name):
    file_path = 'website/' + file_name
    return send_file(file_path)

@app.route('/get_store_image/<image_id>')
def get_store_image(image_id):
    img_path = 'store_image/' + str(image_id) + '.jpg'
    return send_file(img_path, mimetype='image/jpeg')

@app.route('/get_item_image/<image_id>')
def get_item_image(image_id):
    img_path = 'item_image/' + str(image_id) + '.jpg'
    return send_file(img_path, mimetype='image/jpeg')

@app.route('/get_stores')
def get_store():
    result_proxy = db.session.query(StoreInformation).all()
    return_dic = []

    for i in result_proxy:
        dic = {}    
        dic['id']             = i.id
        dic['name']           = i.name
        dic['description']    = i.description
        dic['start_time']     = i.start_time.strftime('%H:%M')
        dic['end_time']       = i.end_time.strftime('%H:%M')
        dic['open_days']      = i.open_days
        dic['phone_number']   = i.phone_number
        dic['image_url']      = '/get_store_image/' + str(i.image_id)
        return_dic.append(dic)
    # print(return_dic)
    
    return Response(json.dumps(return_dic), mimetype='application/json')

@app.route('/get_items/<store_id>')
def get_items(store_id):
    result_proxy = db.session.query(SellItem).filter_by(store_id=store_id)

    return_dic = []
    for i in result_proxy:
        dic = {}
        dic['id']             = i.id
        dic['store_id']       = i.store_id
        dic['name']           = i.name
        dic['description']    = i.description
        dic['price']          = i.price
        dic['image_id']       = '/get_item_image/' + str(i.image_id)
        return_dic.append(dic)

    # print(return_dic)
    return Response(json.dumps(return_dic), mimetype='application/json')
    

@app.route('/get_transaction_status')
def get_transaction_status():
    transaction_id = request.args.get('transaction_id', type=str)
    transaction_record = db.session.query(TransactionRecord).filter_by(id=transaction_id).first()
    return_dic = {
        'transaction_id':transaction_record.id,
        'accepted':transaction_record.has_accepted,
        'paid':transaction_record.has_paid,
        'finished':transaction_record.has_completed,
    }
    # print(return_dic)
    return Response(json.dumps(return_dic), mimetype='application/json')

@app.route('/get_transactions')
def get_transactions():
    store_id = request.args.get('store_id', type=str)
    store_transactions = db.session.query(TransactionRecord).filter_by(store_id=store_id)
    return_dic = []
    for i in store_transactions:
        dic = {}
        dic['transaction_id'] = i.id
        dic['price'] = i.price
        dic['date_time'] = i.date_time.strftime('%Y-%m-%d, %H:%M:%S')
        dic['has_accepted'] = i.has_accepted
        dic['has_completed'] = i.has_completed
        dic['has_paid'] = i.has_paid

        return_dic.append(dic)
    # print(return_dic)
    return Response(json.dumps(return_dic), mimetype='application/json')

@app.route('/get_transaction_items')
def get_transaction_items():
    transaction_id = request.args.get('transaction_id', type=str)
    items = db.session.query(SellItem, TransactionItem
            ).filter(
                SellItem.id == TransactionItem.item_id
            ).filter(
                TransactionItem.transaction_id == transaction_id
            ).all()
    # print(items)
    return_dic = []
    for i in items:
        dic = {}
        item, transaction_item = i[0], i[1]
        dic['name'] = item.name
        dic['price'] = item.price
        dic['number'] = transaction_item.number
        return_dic.append(dic)
    
    # print(return_dic)
    
    return Response(json.dumps(return_dic), mimetype='application/json')


@app.route('/send_transaction', methods=['POST'])
def send_transaction():
    content = request.get_json()
    # content = x
    student_id = content['student_id']
    store_id = content['store_id']
    items = content['items']
    price = 0
    max_id = db.session.query(func.max(TransactionRecord.id)).scalar()
    if max_id is None:
        max_id = 1
    else:
        max_id += 1

    # print(max_id)

    for i in items:
        item = db.session.query(SellItem).filter_by(id=i['id']).first()
        price = price + item.price * i['number']
        transaction_item = TransactionItem(transaction_id=max_id,
                                           item_id=item.id,
                                           number=i['number'])
        db.session.add(transaction_item)

    now = datetime.now()
    transaction = TransactionRecord(id=max_id, store_id=store_id, student_id=student_id, date_time=now,
                                    price=price, has_accepted=0, has_completed=0, has_paid=0)
    db.session.add(transaction)
    db.session.commit()

    # socket io send to store

    return Response(json.dumps({
        'transaction_id': max_id
    }), mimetype='application/json')

@app.route('/send_accept_item', methods=['POST'])
def send_accept_item():
    content = request.get_json()
    transaction_id = content['transaction_id']
    transaction_record = db.session.query(TransactionRecord).filter_by(id=transaction_id).first()
    transaction_record.has_accepted = 1
    db.session.commit()

    # socket io send to client
    return Response(json.dumps({}), mimetype='application/json')

@app.route('/send_receive_cash', methods=['POST'])
def send_receive_cash():
    content = request.get_json()
    transaction_id = content['transaction_id']
    transaction_record = db.session.query(TransactionRecord).filter_by(id=transaction_id).first()
    transaction_record.has_paid = 1
    db.session.commit()

    # socket io send to client
    return Response(json.dumps({}), mimetype='application/json')

@app.route('/send_item_finished', methods=['POST'])
def send_item_finished():
    content = request.get_json()
    transaction_id = content['transaction_id']
    transaction_record = db.session.query(TransactionRecord).filter_by(id=transaction_id).first()
    transaction_record.has_completed = 1
    db.session.commit()
    # socket io send to client
    # send notification to user
    return Response(json.dumps({}), mimetype='application/json')

def initialization():
    ## store initialization
    store1 = StoreInformation(name='store1', description='the first store'
    , start_time='2020-02-02 10:00:00', end_time='2020-02-02 23:00:00', 
    open_days="1234567", phone_number='098603451', image_id='0')

    store2 = StoreInformation(name='store2', description='the second store'
    , start_time='2020-02-02 09:00:00', end_time='2020-02-02 22:00:00', 
    open_days="123467", phone_number='0983348971', image_id='1')

    db.session.add(store1)
    db.session.add(store2)
    db.session.commit()

    ## store item initialization
    item1 = SellItem(store_id=1, name='章魚燒', description='章魚燒描述', price=60, image_id=1)
    item2 = SellItem(store_id=1, name='雞排', description='雞排描述', price=80, image_id=2)
    item3 = SellItem(store_id=2, name='珍珠奶茶', description='珍珠奶茶描述', price=50, image_id=3)
    item4 = SellItem(store_id=2, name='魷魚', description='魷魚描述', price=50, image_id=4)
    item5 = SellItem(store_id=2, name='鹹酥雞', description='鹹酥雞描述', price=10, image_id=5)

    db.session.add_all([item1, item2, item3, item4, item5])
    db.session.commit()

    ## user initialization

    student1 = StudentAccount(email='b07705099@ntu.edu.tw', password='12345', transaction_times=0,
                              bad_trans_times=0)

    ## transaction initialization
    transaction_item1 = TransactionItem(transaction_id=1, item_id=1, number=2)
    transaction_item2 = TransactionItem(transaction_id=1, item_id=2, number=3)

    transaction_record1 = TransactionRecord(store_id=1, student_id=1, price=360, 
                                            date_time='2021-05-30 20:08:22',has_accepted=0,
                                            has_completed=0, has_paid=0)
    ## store account initialization
    ## 暫且不需要

    db.session.add(student1)
    db.session.add(transaction_item1)
    db.session.add(transaction_item2)
    db.session.add(transaction_record1)
    db.session.commit()

if __name__ == '__main__':
    num_of_user = db.session.query(StudentAccount).count()
    if num_of_user == 0:
        initialization()
    app.run(debug=True)


