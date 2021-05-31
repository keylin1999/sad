from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class StoreInformation(db.Model):

    __tablename__ = "store_information"

    id            = db.Column(db.Integer, primary_key=True)
    name          = db.Column(db.String(30))
    description   = db.Column(db.String(200))
    start_time    = db.Column(db.DateTime)
    end_time      = db.Column(db.DateTime)
    open_days     = db.Column(db.String(7))
    phone_number  = db.Column(db.String(10))
    image_id      = db.Column(db.Integer)

    def __init__(
        self,
        name,
        description,
        start_time,
        end_time,
        open_days,
        phone_number,
        image_id,
        id=None
    ) -> None:
        self.id             = None
        self.name           = name
        self.description    = description
        self.start_time     = start_time
        self.end_time       = end_time
        self.open_days      = open_days
        self.phone_number   = phone_number
        self.image_id       = image_id


class StoreAccount(db.Model):

    __tablename__ = "store_account"

    id              = db.Column(db.Integer, primary_key=True)
    store_id        = db.Column(db.Integer)
    email           = db.Column(db.String(100))
    password        = db.Column(db.String(15))
    front_name      = db.Column(db.String(10))
    last_name       = db.Column(db.String(10))
    phone_number    = db.Column(db.String(10))

    def __init__(
        self, email, password, front_name, last_name, phone_number, id=None
    ) -> None:
        self.id           = id
        self.email        = email
        self.password     = password
        self.front_name   = front_name
        self.last_name    = last_name
        self.phone_number = phone_number


class StudentAccount(db.Model):

    __tablename__ = "student_account"

    id                  = db.Column(db.Integer, primary_key=True)
    email               = db.Column(db.String(100))
    password            = db.Column(db.String(15))
    transaction_times   = db.Column(db.Integer)
    bad_trans_times     = db.Column(db.Integer)

    def __init__(self, email, password, transaction_times, bad_trans_times, id=None) -> None:
        self.id                   = id
        self.email                = email
        self.password             = password
        self.transaction_times    = transaction_times
        self.bad_trans_times      = bad_trans_times


class SellItem(db.Model):

    __tablename__ = "sell_item"

    id          = db.Column(db.Integer, primary_key=True)
    store_id    = db.Column(db.Integer)
    name        = db.Column(db.String(20))
    description = db.Column(db.String(100))
    price       = db.Column(db.Integer)
    image_id    = db.Column(db.Integer)

    def __init__(self, store_id, name, description, price, image_id, id=None) -> None:
        self.id             = id
        self.store_id       = store_id
        self.name           = name
        self.description    = description
        self.price          = price
        self.image_id       = image_id


class TransactionRecord(db.Model):

    __tablename__ = "transaction_record"

    id            = db.Column(db.Integer, primary_key=True)
    store_id      = db.Column(db.Integer)
    student_id    = db.Column(db.Integer)
    price         = db.Column(db.Integer)
    date_time     = db.Column(db.DateTime)
    has_accepted  = db.Column(db.Integer)
    has_completed = db.Column(db.Integer)
    has_paid      = db.Column(db.Integer)

    def __init__(
        self, store_id, student_id, price, date_time, has_accepted, has_completed, has_paid, id=None
    ) -> None:
        self.id               = id
        self.store_id         = store_id
        self.student_id       = student_id
        self.price            = price
        self.date_time        = date_time
        self.has_accepted     = has_accepted
        self.has_completed    = has_completed
        self.has_paid         = has_paid


class TransactionItem(db.Model):

    __tablename__ = "transaction_item"

    primary_id        = db.Column(db.Integer, primary_key=True)
    transaction_id    = db.Column(db.Integer)
    item_id           = db.Column(db.Integer)
    number            = db.Column(db.Integer)

    def __init__(self, transaction_id, item_id, number, primary_id=None) -> None:
        self.primary_id       = primary_id
        self.transaction_id   = transaction_id
        self.item_id          = item_id
        self.number           = number
