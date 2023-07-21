const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Childcategory.init(sequelize, DataTypes);
}

class Childcategory extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    image: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    published: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    subcategory_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'subcategories',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'childcategories',
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
        name: "categories_childcate_subcategory_id_4919bb4a_fk_categorie",
        using: "BTREE",
        fields: [
          { name: "subcategory_id" },
        ]
      },
    ]
  });
  }
}
