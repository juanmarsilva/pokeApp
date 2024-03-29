const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hp: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    attack: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    defense: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    speed: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    height: {
      type: DataTypes.FLOAT,
      allowNull: true,
      get() {
        return this.getDataValue('height') + 'm'
      }
    },
    weight: {
      type: DataTypes.FLOAT,
      allowNull: true,
      get() {
        return this.getDataValue('weight') + 'Kg'
      }
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdInDb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    }
  });
};
