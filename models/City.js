const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return City.init(sequelize, DataTypes);
}

class City extends Sequelize.Model {
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
    },
    state_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'state',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'city',
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
        name: "city_country_id_ec9de532_fk_country_id",
        using: "BTREE",
        fields: [
          { name: "country_id" },
        ]
      },
      {
        name: "city_state_id_b686921b_fk_state_id",
        using: "BTREE",
        fields: [
          { name: "state_id" },
        ]
      },
    ]
  });
  }
}
