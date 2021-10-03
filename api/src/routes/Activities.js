const router = require('express').Router();
const axios = require("axios")
const { Sequelize, Model, DataTypes } = require("sequelize");
const {Country,Activities} = require('../db.js');


router.get("/activities", async (req,res)=>{
  const db = await Activities.findAll({
  include: [{
    model: Country
  }]
})

res.send(db)
})

router.post("/activity", async (req,res)=>{

  const {id,name,dificulty,duration,season} = req.body;
  try {
    const newActivities = await Activities.create({
    // id:req.body.id,
    name:req.body.name,
    dificulty:req.body.dificulty,
    duration:req.body.duration,
    season:req.body.season      
    }, {
        include: [{
          model: Country
        }]
    })
    res.json(newActivities);
  } catch (error) {
    res.send(error);
  }
})


module.exports = router;
