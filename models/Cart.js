const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Cart.init(sequelize, DataTypes);
}

class Cart extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    qunantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    added_date: {
      type: DataTypes.DATE(6),
      allowNull: false
    },
    product_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'products',
        key: 'id'
      }
    },
    product_variant_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'product_variants',
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
    }
  }, {
    sequelize,
    tableName: 'cart',
    timestamps: false,
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
        name: "cart_product_id_508e72da_fk_products_id",
        using: "BTREE",
        fields: [
          { name: "product_id" },
        ]
      },
      {
        name: "cart_user_id_1361a739_fk_auth_user_id",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "cart_product_variant_id_0b820267_fk_product_variants_id",
        using: "BTREE",
        fields: [
          { name: "product_variant_id" },
        ]
      },
    ]
  });
  }
}
