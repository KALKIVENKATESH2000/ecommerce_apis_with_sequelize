const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return AuthPermission.init(sequelize, DataTypes);
}

class AuthPermission extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    content_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'django_content_type',
        key: 'id'
      }
    },
    codename: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'auth_permission',
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
        name: "auth_permission_content_type_id_codename_01ab375a_uniq",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "content_type_id" },
          { name: "codename" },
        ]
      },
    ]
  });
  }
}
