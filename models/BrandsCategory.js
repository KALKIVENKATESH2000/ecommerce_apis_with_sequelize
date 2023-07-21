const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return BrandsCategory.init(sequelize, DataTypes);
}

class BrandsCategory extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    brand_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'brands',
        key: 'id'
      }
    },
    category_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'categories',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'brands_category',
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
        name: "categories_brand_category_brand_id_category_id_cff85e6e_uniq",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "brand_id" },
          { name: "category_id" },
        ]
      },
      {
        name: "categories_brand_cat_category_id_adf2e122_fk_categorie",
        using: "BTREE",
        fields: [
          { name: "category_id" },
        ]
      },
    ]
  });
  }
}
