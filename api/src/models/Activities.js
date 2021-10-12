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
        arrayValidate(arr) {
          if(!Array.isArray(arr) || !arr.length) throw new Error('No es un array')
            if(arr.length > 4) throw new Error('array muy largo')
            let test = ["Summer","Winter","Fall","Spring"]
            let filter = arr.filter(e=> test.includes(e))
            if(arr.length !== filter.length) throw new Error('solo se permiten estos valores "Summer,Winter,Fall,Spring"')
        },
      }
    }  
  },{
    // timestamps: false
    timestamps: false,
  })
};
