const express = require('express');
const router = express.Router();
const getProducts = require("../../services");

router.get('/products', async (req, res, next)=>{
    try {
        console.log("request sent by client", req.query);
        const results = await getProducts(req.query)
        res.status(200).json(results);
    } catch(e) {
        console.log(e);
    }
});

module.exports = router;
