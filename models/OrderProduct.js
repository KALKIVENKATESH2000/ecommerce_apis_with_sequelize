const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return OrderProduct.init(sequelize, DataTypes);
}

class OrderProduct extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(20,2),
      allowNull: false
    },
    order_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'order',
        key: 'id'
      }
    },
    product_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'products',
        key: 'id'
      }
    },
    productVariant_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'product_variants',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'order_products',
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
        name: "order_products_order_id_b5077dc2_fk_order_id",
        using: "BTREE",
        fields: [
          { name: "order_id" },
        ]
      },
      {
        name: "order_products_product_id_3110c998_fk_products_id",
        using: "BTREE",
        fields: [
          { name: "product_id" },
        ]
      },
      {
        name: "order_products_productVariant_id_0638fe2d_fk_product_variants_id",
        using: "BTREE",
        fields: [
          { name: "productVariant_id" },
        ]
      },
    ]
  });
  }
}
