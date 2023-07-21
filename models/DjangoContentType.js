const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return DjangoContentType.init(sequelize, DataTypes);
}

class DjangoContentType extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    app_label: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    model: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'django_content_type',
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
        name: "django_content_type_app_label_model_76bd3d3b_uniq",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "app_label" },
          { name: "model" },
        ]
      },
    ]
  });
  }
}
