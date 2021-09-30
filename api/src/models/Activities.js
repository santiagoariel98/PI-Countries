const { DataTypes } = require('sequelize');

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.



module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Activities', {
    // id: {
    //   type: DataTypes.INTEGER,
    //   primaryKey: true
    // },
    name: {
      type: DataTypes.STRING
    },
    dificulty: {
      type: DataTypes.INTEGER,
      validate:{
        len: [1,5]
      }
    },
    duration: {
      type: DataTypes.INTEGER
    }, 
    season: {
      type: DataTypes.STRING,
      validate:{
        isIn: [['Verano', 'Primavera',"Otoño","Invierno"]]
      }
    }  
  },{
    // timestamps: false
    timestamps: false,
  })
};
