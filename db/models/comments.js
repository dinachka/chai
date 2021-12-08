const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Chai }) {
      // define association here
      Comments.belongsTo(User, {
        foreignKey: 'userId',
      }),
        Comments.belongsTo(Chai, {
          foreignKey: 'chaiId',
        });
    }
  }
  Comments.init({
    text: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    chaiId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Comments',
  });
  return Comments;
};
