const express = require('express');
const router = express.Router()
const {User} = require('../models/user');
const mongoose = require('mongoose')

//get all user
router.get('/', async(req, res)=>{
  const users = await User.find({})
  res.status(200).send(users);
})


//get user by id
router.get('/:id', async(req, res)=>{
  if (!mongoose.Types.ObjectId.isValid(req.params.id)){
    return res.status(400).send({status: 400, message: 'invalid userId'});
  }
  let user = await User.findById(req.params.id);
  if (!user) return res.status(404).send({status: 404, message: 'User not Found'});

  res.status(200).send(user)
});

//create user
router.post('/', async (req, res)=>{
  if (!(req.body.name && req.body.age && req.body.address && req.body.dob)){
    return res.status(400).send({status: 400, message: 'Bad Request'})
  }
  let user = new User(req.body)
  await user.save()
  res.status(201).send(user)
})

//  edit user infomation
router.put('/:id', async (req, res)=>{
  if (!mongoose.Types.ObjectId.isValid(req.params.id)){
    return res.status(400).send({status: 400, message: 'invalid userId'});
  }
  let user = await User.findById(req.params.id);
  user.name = req.body.name || user.name;
  user.age = req.body.age || user.age
  user.address = req.body.address || user.address
  user.dob = req.body.dob || user.dob
  await user.save()
  res.status(200).send(user)
})


module.exports = router;