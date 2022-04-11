'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Casefile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Casefile.init({
    caseID: DataTypes.STRING,
    caseType: DataTypes.STRING,
    client: DataTypes.STRING,
    gender: DataTypes.STRING,
    occupation: DataTypes.STRING,
    brief: DataTypes.STRING,
    letter_of_engagement: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Casefile',
  });
  return Casefile;
};