const { urlencoded } = require('express');
const express = require('express');
const { order } = require('../models/order');
const router = express.Router();

const app = express()
app.use(urlencoded({ extended : true }))
app.use(express.json())



router.get('/:id',async (request,response)=>{
    let data = order.findByPk(request.params.id)
    response.json({
        "message":"success",
        "order":data
    })
})

module.exports = router;