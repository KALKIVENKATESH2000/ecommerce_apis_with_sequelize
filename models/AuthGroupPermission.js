const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return AuthGroupPermission.init(sequelize, DataTypes);
}

class AuthGroupPermission extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    group_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'auth_group',
        key: 'id'
      }
    },
    permission_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'auth_permission',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'auth_group_permissions',
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
        name: "auth_group_permissions_group_id_permission_id_0cd325b0_uniq",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "group_id" },
          { name: "permission_id" },
        ]
      },
      {
        name: "auth_group_permissio_permission_id_84c5c92e_fk_auth_perm",
        using: "BTREE",
        fields: [
          { name: "permission_id" },
        ]
      },
    ]
  });
  }
}
