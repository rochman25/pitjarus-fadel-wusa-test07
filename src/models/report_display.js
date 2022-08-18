const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('report_display', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    visit_id: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    store_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        model: 'store',
        key: 'id'
      }
    },
    surveyor_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        model: 'surveyor',
        key: 'id'
      }
    },
    category_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        model: 'category',
        key: 'id'
      }
    },
    json_path: {
      type: DataTypes.STRING(512),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'report_display',
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
        name: "id_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "FK1_idx",
        using: "BTREE",
        fields: [
          { name: "store_id" },
        ]
      },
      {
        name: "FK3_idx",
        using: "BTREE",
        fields: [
          { name: "store_id" },
        ]
      },
      {
        name: "FK2_idx",
        using: "BTREE",
        fields: [
          { name: "surveyor_id" },
        ]
      },
      {
        name: "FK4_idx",
        using: "BTREE",
        fields: [
          { name: "category_id" },
        ]
      },
    ]
  });
};
