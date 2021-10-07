const router = require('express').Router();
const axios = require("axios")
const { Sequelize, Model, DataTypes} = require("sequelize");
const { Op } = require("sequelize");
const {Country,Activities} = require('../db.js');


router.get("/activities", async (req,res)=>{

  const db = await Activities.findAll({include: Country})

  res.send(db)
})


router.post("/activity", async (req,res)=>{
  let activity

  const {name,dificulty,duration,season,country, id} = req.body;
  try {
    if(country.length <= 0) return res.json("Country no selected")
    const countries = await Country.findAll({ where: {
      id: {
      [Op.or]: country
      }
    },include: [Activities]
    })
    activity = await Activities.findOne({where:{
        name: name,
        dificulty: dificulty,
        duration:duration,
        season: season,
    }})
    if(activity){
      await activity.addCountry(countries)
      return  res.json("ok");
    }
    activity = await Activities.create({
        name: req.body.name,
        dificulty: req.body.dificulty,
        duration:req.body.duration,
        season: req.body.season,
    })

await activity.addCountry(countries)

    res.json("ok");
  } catch (error) {
    res.send(error);
  }
})


module.exports = router;
