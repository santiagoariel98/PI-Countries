const router = require('express').Router();
const axios = require("axios")
const { Sequelize, Model, DataTypes } = require("sequelize");
const {Country,Activities} = require('../db.js');
const Op = Sequelize.Op;

  let restAPI = axios("https://restcountries.com/v3/all").then((value)=> value.data.map(e=>{
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
      }).then()
  }))

router.get("/countries", async (req,res)=>{
  const db = await Country.findAll({
  include: [{
    model: Activities
  }]
})
  if(db == 0){
      return res.send(restAPI)
  } 
  //query
  const countryName = req.query.name
  if(countryName){
      const condition = countryName ? {
        where:{
          name: {
            [Op.substring]:countryName
          }
        }
      }:{};
      const countries = await Country.findAll(condition);
     return res.json(countries.length ? countries: "no existen paises") 
  }
  else res.send(db)
})

router.get("/countries/:id", async (req,res)=>{
  //Country
  const { id } = req.params
  const country = await Country.findByPk(id.toUpperCase(),{
  include: [{
    model: Activities
  }]
});
  res.send(country)
})




module.exports = router;
