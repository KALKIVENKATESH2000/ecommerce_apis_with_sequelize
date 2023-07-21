const DataTypes = require("sequelize").DataTypes;
const _AuthGroup = require("./AuthGroup");
const _AuthGroupPermission = require("./AuthGroupPermission");
const _AuthPermission = require("./AuthPermission");
const _AuthUser = require("./AuthUser");
const _AuthUserGroup = require("./AuthUserGroup");
const _AuthUserUserPermission = require("./AuthUserUserPermission");
const _Banner = require("./Banner");
const _Brand = require("./Brand");
const _BrandsCategory = require("./BrandsCategory");
const _Cart = require("./Cart");
const _Category = require("./Category");
const _Childcategory = require("./Childcategory");
const _City = require("./City");
const _Country = require("./Country");
const _DjangoAdminLog = require("./DjangoAdminLog");
const _DjangoContentType = require("./DjangoContentType");
const _DjangoMigration = require("./DjangoMigration");
const _DjangoSession = require("./DjangoSession");
const _FavouriteProduct = require("./FavouriteProduct");
const _Order = require("./Order");
const _OrderProduct = require("./OrderProduct");
const _ProductVariant = require("./ProductVariant");
const _Product = require("./Product");
const _Review = require("./Review");
const _State = require("./State");
const _Subcategory = require("./Subcategory");
const _UserProfile = require("./UserProfile");
const _Useraddress = require("./Useraddress");
const _User = require("./User");

function initModels(sequelize) {
  const AuthGroup = _AuthGroup(sequelize, DataTypes);
  const AuthGroupPermission = _AuthGroupPermission(sequelize, DataTypes);
  const AuthPermission = _AuthPermission(sequelize, DataTypes);
  const AuthUser = _AuthUser(sequelize, DataTypes);
  const AuthUserGroup = _AuthUserGroup(sequelize, DataTypes);
  const AuthUserUserPermission = _AuthUserUserPermission(sequelize, DataTypes);
  const Banner = _Banner(sequelize, DataTypes);
  const Brand = _Brand(sequelize, DataTypes);
  const BrandsCategory = _BrandsCategory(sequelize, DataTypes);
  const Cart = _Cart(sequelize, DataTypes);
  const Category = _Category(sequelize, DataTypes);
  const Childcategory = _Childcategory(sequelize, DataTypes);
  const City = _City(sequelize, DataTypes);
  const Country = _Country(sequelize, DataTypes);
  const DjangoAdminLog = _DjangoAdminLog(sequelize, DataTypes);
  const DjangoContentType = _DjangoContentType(sequelize, DataTypes);
  const DjangoMigration = _DjangoMigration(sequelize, DataTypes);
  const DjangoSession = _DjangoSession(sequelize, DataTypes);
  const FavouriteProduct = _FavouriteProduct(sequelize, DataTypes);
  const Order = _Order(sequelize, DataTypes);
  const OrderProduct = _OrderProduct(sequelize, DataTypes);
  const ProductVariant = _ProductVariant(sequelize, DataTypes);
  const Product = _Product(sequelize, DataTypes);
  const Review = _Review(sequelize, DataTypes);
  const State = _State(sequelize, DataTypes);
  const Subcategory = _Subcategory(sequelize, DataTypes);
  const UserProfile = _UserProfile(sequelize, DataTypes);
  const Useraddress = _Useraddress(sequelize, DataTypes);
  const User = _User(sequelize, DataTypes);

  AuthGroupPermission.belongsTo(AuthGroup, { foreignKey: "group_id"});
  AuthGroup.hasMany(AuthGroupPermission, { foreignKey: "group_id"});
  AuthUserGroup.belongsTo(AuthGroup, { foreignKey: "group_id"});
  AuthGroup.hasMany(AuthUserGroup, { foreignKey: "group_id"});
  AuthGroupPermission.belongsTo(AuthPermission, { foreignKey: "permission_id"});
  AuthPermission.hasMany(AuthGroupPermission, { foreignKey: "permission_id"});
  AuthUserUserPermission.belongsTo(AuthPermission, { foreignKey: "permission_id"});
  AuthPermission.hasMany(AuthUserUserPermission, { foreignKey: "permission_id"});
  AuthUserGroup.belongsTo(AuthUser, { foreignKey: "user_id"});
  AuthUser.hasMany(AuthUserGroup, { foreignKey: "user_id"});
  AuthUserUserPermission.belongsTo(AuthUser, { foreignKey: "user_id"});
  AuthUser.hasMany(AuthUserUserPermission, { foreignKey: "user_id"});
  Cart.belongsTo(AuthUser, { foreignKey: "user_id"});
  AuthUser.hasMany(Cart, { foreignKey: "user_id"});
  DjangoAdminLog.belongsTo(AuthUser, { foreignKey: "user_id"});
  AuthUser.hasMany(DjangoAdminLog, { foreignKey: "user_id"});
  FavouriteProduct.belongsTo(AuthUser, { foreignKey: "user_id"});
  AuthUser.hasMany(FavouriteProduct, { foreignKey: "user_id"});
  Order.belongsTo(AuthUser, { foreignKey: "user_id"});
  AuthUser.hasMany(Order, { foreignKey: "user_id"});
  Review.belongsTo(AuthUser, { foreignKey: "user_id"});
  AuthUser.hasMany(Review, { foreignKey: "user_id"});
  UserProfile.belongsTo(AuthUser, { foreignKey: "user_id"});
  AuthUser.hasOne(UserProfile, { foreignKey: "user_id"});
  Useraddress.belongsTo(AuthUser, { foreignKey: "user_id"});
  AuthUser.hasMany(Useraddress, { foreignKey: "user_id"});
  BrandsCategory.belongsTo(Brand, { foreignKey: "brand_id"});
  Brand.hasMany(BrandsCategory, { foreignKey: "brand_id"});
  Product.belongsTo(Brand, { foreignKey: "brand_id"});
  Brand.hasMany(Product, { foreignKey: "brand_id"});
  BrandsCategory.belongsTo(Category, { foreignKey: "category_id"});
  Category.hasMany(BrandsCategory, { foreignKey: "category_id"});
  Product.belongsTo(Category, { foreignKey: "category_id"});
  Category.hasMany(Product, { foreignKey: "category_id"});
  Subcategory.belongsTo(Category, { foreignKey: "category_id"});
  Category.hasMany(Subcategory, { foreignKey: "category_id"});
  Product.belongsTo(Childcategory, { foreignKey: "childcategory_id"});
  Childcategory.hasMany(Product, { foreignKey: "childcategory_id"});
  City.belongsTo(Country, { foreignKey: "country_id"});
  Country.hasMany(City, { foreignKey: "country_id"});
  State.belongsTo(Country, { foreignKey: "country_id"});
  Country.hasMany(State, { foreignKey: "country_id"});
  AuthPermission.belongsTo(DjangoContentType, { foreignKey: "content_type_id"});
  DjangoContentType.hasMany(AuthPermission, { foreignKey: "content_type_id"});
  DjangoAdminLog.belongsTo(DjangoContentType, { foreignKey: "content_type_id"});
  DjangoContentType.hasMany(DjangoAdminLog, { foreignKey: "content_type_id"});
  OrderProduct.belongsTo(Order, { foreignKey: "order_id"});
  Order.hasMany(OrderProduct, { foreignKey: "order_id"});
  Cart.belongsTo(ProductVariant, { foreignKey: "product_variant_id"});
  ProductVariant.hasMany(Cart, { foreignKey: "product_variant_id"});
  OrderProduct.belongsTo(ProductVariant, { foreignKey: "productVariant_id"});
  ProductVariant.hasMany(OrderProduct, { foreignKey: "productVariant_id"});
  Cart.belongsTo(Product, { foreignKey: "product_id"});
  Product.hasMany(Cart, { foreignKey: "product_id"});
  FavouriteProduct.belongsTo(Product, { foreignKey: "product_id"});
  Product.hasMany(FavouriteProduct, { foreignKey: "product_id"});
  OrderProduct.belongsTo(Product, { foreignKey: "product_id"});
  Product.hasMany(OrderProduct, { foreignKey: "product_id"});
  ProductVariant.belongsTo(Product, { foreignKey: "product_id"});
  Product.hasMany(ProductVariant, { foreignKey: "product_id"});
  Review.belongsTo(Product, { foreignKey: "product_id"});
  Product.hasMany(Review, { foreignKey: "product_id"});
  City.belongsTo(State, { foreignKey: "state_id"});
  State.hasMany(City, { foreignKey: "state_id"});
  Childcategory.belongsTo(Subcategory, { foreignKey: "subcategory_id"});
  Subcategory.hasMany(Childcategory, { foreignKey: "subcategory_id"});
  Product.belongsTo(Subcategory, { foreignKey: "subcategory_id"});
  Subcategory.hasMany(Product, { foreignKey: "subcategory_id"});
  Order.belongsTo(Useraddress, { foreignKey: "address_id"});
  Useraddress.hasMany(Order, { foreignKey: "address_id"});

  return {
    AuthGroup,
    AuthGroupPermission,
    AuthPermission,
    AuthUser,
    AuthUserGroup,
    AuthUserUserPermission,
    Banner,
    Brand,
    BrandsCategory,
    Cart,
    Category,
    Childcategory,
    City,
    Country,
    DjangoAdminLog,
    DjangoContentType,
    DjangoMigration,
    DjangoSession,
    FavouriteProduct,
    Order,
    OrderProduct,
    ProductVariant,
    Product,
    Review,
    State,
    Subcategory,
    UserProfile,
    Useraddress,
    User,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
