STATUS_CHOICES = (
    (1, 'Active'),
    (2, 'Inactive'),
    (3, 'Deleted'),
)

PAYMENT_MODE = (
    ('cod', 'COD'),
    ('online', 'ONLINE'),
    # ('wallet', 'WALLET'),
    # ('wallet_online','WALLET&&ONLINE')
)

Paym_STATUSES = (
    ('Pending', 'Pending'),
    ('Success', 'Success'),
    ('Failed', 'Failed'),
)

ORD_STATUSES = (
    ('Pending', 'Pending'),
    # ('Failed', 'Failed'),
    ('Cancelled','Cancelled'),
    ('Accepted', 'Accepted'),
    # ('Rejected', 'Rejected'),
    # ('Processing', 'Processing'),
    # ('Picked','Picked'),
    ('Delivered','Delivered'),
    # ('ReturnRequest','Return Request'),
    # ('Returned','Returned'),
    # ('ReturnRejected','Return Request Rejected'),
)


Wallet_STATUSES = (
    ('Recharge', 'Recharge'),
    ('Refund', 'Refund'),
    ('Order', 'Order'),
    ('Settlement', 'Settlement'),
)

CR_OR_DR = (
    ('cr', 'Credit'),
    ('dr', 'Debit'),
)

RECHARGE_STATUS = (
    ('Pending', 'Pending'),
    ('Success', 'Success'),
    ('Failed', 'Failed'),
)

GENDER_CHOICES = (
    ('Male', 'Male'),
    ('Female', 'Female'),
)

COUPON_TYPE = (
    ('%', '%'),
    ('RS', 'RS'),
)