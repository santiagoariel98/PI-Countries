const router = require('express').Router();
const axios = require("axios")
const { Sequelize, Model, DataTypes } = require("sequelize");
const {Country,Activities} = require('../db.js');
const Op = Sequelize.Op;

  let restAPI = axios("https://restcountries.com/v3/all").then((e)=> e.data.map(e=>{
    
      Country.findOrCreate({
        where: {id: e.cca3},
        defaults: {
          id: e.cca3,
          name: e.name.common,
          flags: e.flags[0],
          continent: e.region,
          capital: e.capital? e.capital[0]: "none",
          subregion: e.subregion || "none",
          area: e.area || 1,
          population: e.population || 0
        }
      })
  }))

router.get("/countries", async (req,res)=>{
  console.log("entra aca")
  const db = await Country.findAll({
  include: {
    model: Activities
  }
})
  if(db == 0){
      return res.send(restAPI)
  } 
  // query filter
  const countryFilterByName = req.query.name
  // query order
  const countryOrder = req.query.order
  // query filter
  if(countryFilterByName){
      let dataQuery = db.filter(e=> e.dataValues.name.toLowerCase().includes(countryFilterByName.toLowerCase()))
      return res.json(dataQuery.length? dataQuery: "no existen paises con ese nombre")
  }
  // query order
  else if(countryOrder){
    if(!db.some(e=> e[countryOrder])) return res.json(`no se puede ordenar por ${countryOrder.toUpperCase()} `)
    let dataQuery = db.sort((a,b)=>{
      if (a[countryOrder] < b[countryOrder]) return -1;
      if (a[countryOrder] > b[countryOrder]) return 1;
      return 0;
    })
    return res.json(dataQuery.length? dataQuery: "error")
  }
  else{
      res.send(db)
  } 
})



router.get("/countries/:id", async (req,res)=>{
  //Country
  const { id } = req.params
  if(id.length >3 || typeof id == "number") return res.json("la id debe ser de 3 letras y no contener numero ej: 'ARG'")

  const country = await Country.findByPk(id.toUpperCase(),{
  include: [{
    model: Activities
  }]
});
  res.json(country? country: "no hay paises que mostrar")
})




module.exports = router;
