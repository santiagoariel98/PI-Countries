const { DataTypes} = require('sequelize');

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.



module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Activities', {

    name: {
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        len:[5,50]
      }
    },
    dificulty: {
      type: DataTypes.INTEGER,
      allowNull:false,
      validate:{
        len: [1,5]
      }
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull:false,
      validate:{
        len: [1,24]
      }
    }, 
    season: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull:false,
  validate: {
    isLargue(value) {
      if (value.length <= 0) {
        throw new Error('industryOfFocus must only have three items')
      }
    },
    // isIn: [['Summer', 'Spring',"Fall","Winter"]]
  }
    }  
  },{
    // timestamps: false
    timestamps: false,
  })
};
