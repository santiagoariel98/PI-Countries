const { DataTypes} = require('sequelize');

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.



module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Activities', {

    name: {
      type: DataTypes.STRING,
      validate:{
        len:[5,25],
        isString(str){
          if(str.match(/\d/g)) throw new new Error("no debe contener numeros")
        }
      }
    },
    dificulty: {
      type: DataTypes.INTEGER,
      validate:{
        len: [1,5]
      }
    },
    duration: {
      type: DataTypes.INTEGER,
      validate:{
        len: [1,24]
      }
    }, 
    season: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      validate: {
        arrayValidate(arr) {
          if(!Array.isArray(arr) || !arr.length) throw new Error('No es un array')
            if(arr.length > 4) throw new Error('solo se permite 4 elemento')
            let test = ["Summer","Winter","Autumn","Spring"]
            let filter = arr.filter(e=> test.includes(e))
            if(arr.length !== filter.length) throw new Error('solo se permiten estos valores "Summer, Winter, Autumn, Spring"')
        },
      }
    }  
  },{
    // timestamps: false
    timestamps: false,
  })
};
