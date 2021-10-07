const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const Country = require("./Countries.js")
const Activities = require("./Activities.js")

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/", Country)
router.use("/", Activities)
// router.use("/countries", Countries)

module.exports = router;
