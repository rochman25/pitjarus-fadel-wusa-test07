var DataTypes = require("sequelize").DataTypes;
var _branch = require("./branch");
var _category = require("./category");
var _product = require("./product");
var _report_display = require("./report_display");
var _store = require("./store");
var _surveyor = require("./surveyor");

function initModels(sequelize) {
  var branch = _branch(sequelize, DataTypes);
  var category = _category(sequelize, DataTypes);
  var product = _product(sequelize, DataTypes);
  var report_display = _report_display(sequelize, DataTypes);
  var store = _store(sequelize, DataTypes);
  var surveyor = _surveyor(sequelize, DataTypes);

  store.belongsTo(branch, { as: "branch", foreignKey: "branch_id"});
  branch.hasMany(store, { as: "stores", foreignKey: "branch_id"});
  product.belongsTo(category, { as: "category", foreignKey: "category_id"});
  category.hasMany(product, { as: "products", foreignKey: "category_id"});
  report_display.belongsTo(category, { as: "category", foreignKey: "category_id"});
  category.hasMany(report_display, { as: "report_displays", foreignKey: "category_id"});
  report_display.belongsTo(store, { as: "store", foreignKey: "store_id"});
  store.hasMany(report_display, { as: "report_displays", foreignKey: "store_id"});
  report_display.belongsTo(surveyor, { as: "surveyor", foreignKey: "surveyor_id"});
  surveyor.hasMany(report_display, { as: "report_displays", foreignKey: "surveyor_id"});

  return {
    branch,
    category,
    product,
    report_display,
    store,
    surveyor,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
