'use strict';

const express = require('express');
const router = express.Router();

const dataModules = require('../models');

const basicAuth = require('../middleware/basic.js')
const bearerAuth = require('../middleware/bearer.js')
const permissions = require('../middleware/acl.js')
// const {Customers} = require("../models");
const { Customers } = require("../models/customers/model"); // Import Customers model

router.param('model', (req, res, next) => {
  console.log("check data modules",dataModules["Customers"])
  const modelName = req.params.model;
  console.log("model called:",modelName)
  if (dataModules[modelName]) {
    req.model = dataModules[modelName];
    next();
  } else {
    next('Invalid Model from V1'); // MODED LOG
  }
});


// Your other middleware and route handler imports...


router.get('/inventory', async (req, res, next) => {
  try {
    const customerId = req.query.customerId; // Assuming you pass the customer ID as a query parameter
    const customer = await Customers.findByPk(customerId);

    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    const bikesOwned = await Customers.findBikesOwnedByCustomer(customerId);
    res.status(200).json(bikesOwned);
  } catch (error) {
    next(error); // Forward the error to the error handling middleware
  }
});
// router.get('/:model', permissions("read"),bearerAuth, handleGetAll);
// router.get('/:model/:id',bearerAuth,permissions("read"), handleGetOne);
// router.post('/:model',bearerAuth,permissions("write"), handleCreate);
// router.put('/:model/:id', bearerAuth,permissions("edit"),handleUpdate);
// router.delete('/:model/:id',bearerAuth,permissions("delete"), handleDelete);
router.get('/inventory', async (req, res, next) => {
  try {
    const customerId = req.query.customerId; // Assuming you pass the customer ID as a query parameter
    const bikesOwned = await Customers.findCustomerWithBikeModels(customerId);
    res.status(200).json(bikesOwned);
  } catch (error) {
    next(error); // Forward the error to the error handling middleware
  }
});
router.get('/greet', greet);
router.get('/:model',bearerAuth, handleGetAll);
router.get('/:model/:id',bearerAuth, handleGetOne);
router.post('/:model',bearerAuth,permissions("create"), handleCreate);
router.put('/:model/:id', bearerAuth,permissions("update"),handleUpdate);
router.delete('/:model/:id',bearerAuth,permissions("delete"), handleDelete);

function greet(req,res) {res.send("Welcommen !")}

async function handleGetAll(req, res) {
  let allRecords = await req.model.get();
  res.status(200).json(allRecords);
}

async function handleGetOne(req, res) {
  const id = req.params.id;


  let theRecord = await req.model.get(id)
  res.status(200).json(theRecord);
}

async function handleCreate(req, res) {
  let obj = req.body;
  let newRecord = await req.model.create(obj);
  res.status(201).json(newRecord);
}

async function handleUpdate(req, res) {
  const id = req.params.id;
  const obj = req.body;
  let updatedRecord = await req.model.update(id, obj)
  res.status(200).json(updatedRecord);
}

async function handleDelete(req, res) {
  let id = req.params.id;
  let deletedRecord = await req.model.delete(id);
  res.status(200).json(deletedRecord);
}


module.exports = router;
