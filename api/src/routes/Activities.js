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
  try {
  let activity
    const {name,dificulty,duration,season,country, id} = req.body;
    
    if(!country.length || !duration || !season.length || !name || !dificulty) return res.sendStatus(400)
    const countries = await Country.findAll(
      { where: {
        id: {[Op.or]: country}
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
      return  res.json(activity);
    }

    activity = await Activities.create({
        name,
        dificulty,
        duration,
        season,
    })

await activity.addCountry(countries)
res.json(activity)

  } catch (err) {
    res.status(400).send({ "error": err.errors[0].message });
  }
})


module.exports = router;
