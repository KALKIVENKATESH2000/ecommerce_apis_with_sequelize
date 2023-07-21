const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return ProductVariant.init(sequelize, DataTypes);
}

class ProductVariant extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    variantName: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    color: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    image: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    originalPrice: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    offerPrice: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    available: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    product_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'products',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'product_variants',
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
        name: "products_productvari_product_id_d9c22902_fk_products_",
        using: "BTREE",
        fields: [
          { name: "product_id" },
        ]
      },
    ]
  });
  }
}
