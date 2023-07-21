const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Product.init(sequelize, DataTypes);
}

class Product extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(400),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    richDescription: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    image: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    images: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    countInStock: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    rating: {
      type: DataTypes.DECIMAL(5,2),
      allowNull: false
    },
    numReviews: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    reviews: {
      type: DataTypes.STRING(400),
      allowNull: false
    },
    isFeatured: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    isPopular: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    published: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    brand_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
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
    },
    childcategory_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'childcategories',
        key: 'id'
      }
    },
    subcategory_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'subcategories',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'products',
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
        name: "products_product_brand_id_3e2e8fd1_fk_categories_brand_id",
        using: "BTREE",
        fields: [
          { name: "brand_id" },
        ]
      },
      {
        name: "products_product_category_id_9b594869_fk_categories_category_id",
        using: "BTREE",
        fields: [
          { name: "category_id" },
        ]
      },
      {
        name: "products_product_childcategory_id_29ab5aab_fk_categorie",
        using: "BTREE",
        fields: [
          { name: "childcategory_id" },
        ]
      },
      {
        name: "products_product_subcategory_id_b28a1e3b_fk_categorie",
        using: "BTREE",
        fields: [
          { name: "subcategory_id" },
        ]
      },
    ]
  });
  }
}
