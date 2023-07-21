const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return State.init(sequelize, DataTypes);
}

class State extends Sequelize.Model {
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
      allowNull: false,
      unique: "name"
    },
    tax_rate: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    published: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    country_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'country',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'state',
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
        name: "name",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "name" },
        ]
      },
      {
        name: "state_country_id_6b36f831_fk_country_id",
        using: "BTREE",
        fields: [
          { name: "country_id" },
        ]
      },
    ]
  });
  }
}
