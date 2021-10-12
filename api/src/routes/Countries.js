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
          capital: e.capital? e.capital[0]: "-",
          subregion: e.subregion || "-",
          area: e.area || 1,
          population: e.population || 0
        }
      })
  }))

router.get("/countries", async (req,res)=>{
  const db = await Country.findAll({
  include: {
    model: Activities
  }
})
  if(db == 0){
      return res.send(restAPI)
  } 
  // query filter
  const name = req.query.name
  
  const order = req.query.order
  // query filter
  if(name){
      let dataQuery = db.filter(e=> e.dataValues.name.toLowerCase().includes(name.toLowerCase()))
      return dataQuery.length? res.json(dataQuery): res.status(404).send({"error": "query error"})
  }
  else{
      res.send(db)
  } 
})



router.get("/countries/:id", async (req,res)=>{
  const { id } = req.params
  if(id.length !== 3 || id.match(/^[0-9]+$/)) return res.status(404).send({"error": "error id"})
  const country = await Country.findByPk(id.toUpperCase(),{
  include: [{
    model: Activities
  }]
});
country? res.json(country): res.status(404).send({"error": "no se encontro al pais"})
})




module.exports = router;
