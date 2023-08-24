const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Order.init(sequelize, DataTypes);
}

class Order extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    totalAmount: {
      type: DataTypes.DECIMAL(20,2),
      allowNull: false,
      defaultValue: 0
    },
    delivery_charge: {
      type: DataTypes.DECIMAL(20,2),
      allowNull: false,
      defaultValue: 0
    },
    packing_charge: {
      type: DataTypes.DECIMAL(20,2),
      allowNull: false,
      defaultValue: 0
    },
    address_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'useraddress',
        key: 'id'
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'auth_user',
        key: 'id'
      }
    },
    order_status: {
      type: DataTypes.STRING(15),
      allowNull: false,
      defaultValue: 'Pending'
    },
    payment_mode: {
      type: DataTypes.STRING(15),
      allowNull: false,
      defaultValue: 'cod'
    },
    payment_status: {
      type: DataTypes.STRING(15),
      allowNull: false,
      defaultValue: 'Pending'
    },
    finalAmount: {
      type: DataTypes.DECIMAL(20,2),
      allowNull: false,
      defaultValue: 0
    },
    taxAmount: {
      type: DataTypes.DECIMAL(20,2),
      allowNull: false,
      defaultValue: 0
      
    },
    discountAmount: {
      type: DataTypes.DECIMAL(20,2),
      allowNull: false,
      defaultValue: 0
      
    },
    order_cancel_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    sequelize,
    tableName: 'order',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "order_address_id_0d5da290_fk_useraddress_id",
        using: "BTREE",
        fields: [
          { name: "address_id" },
        ]
      },
      {
        name: "order_user_id_e323497c_fk_auth_user_id",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
  }
}
