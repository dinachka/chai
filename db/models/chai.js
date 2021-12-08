const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Chai extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Comments, User }) {
      // define association here
      Chai.hasMany(Comments, {
        foreignKey: 'chaiId',
      });
      Chai.belongsTo(User, {
        foreignKey: 'userId'
      })
    }
  }
  Chai.init({
    title: DataTypes.TEXT,
    description: DataTypes.TEXT,
    image: DataTypes.TEXT,
    latitude: DataTypes.TEXT,
    longitude: DataTypes.TEXT,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Chai',
  });
  return Chai;
};
