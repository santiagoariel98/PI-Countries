const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.



module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Country', {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      validate:{
        len:[3],
        isString(str){
          if(str.match(/\d/g)) throw new new Error("no debe contener numeros")
        }
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    flags: {
      type: DataTypes.STRING,
      allowNull: false
    },
    continent: {
      type: DataTypes.STRING,
      allowNull: false
    },
    capital: {
      type: DataTypes.STRING,
      allowNull: false
    },    
    subregion: {
      type: DataTypes.STRING,
    },
    area: {
      type: DataTypes.INTEGER,
    },
    population: {
      type: DataTypes.INTEGER,
    },
  },
  {
    // timestamps: false
    timestamps: false,
  });
};
