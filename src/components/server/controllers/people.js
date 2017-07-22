const mongoose = require('mongoose');
const Model = require('../models/people');
const utils = require('../utils');

const addOne = function (req, res) {
  Model.create({
    name: req.body.name,
    age: req.body.age,
    gender: req.body.gender,
  }, function (err, item) {
    if (err) {
      return utils.sendJSONresponse(res, 200, err);
    }

    return utils.sendJSONresponse(res, 200, item)
  });
};

const getAll = function (req, res) {
  const query = {};
  console.log('getAll', req.body);
  if (typeof req.body.gender != 'undefined') {
    if (req.body.gender === 'male' || req.body.gender === 'female') {
      query.gender = req.body.gender;
    }
  }
  if (typeof req.body.name != 'undefined') {
    if (req.body.name.trim() !== '') {
      query.name = new RegExp(req.body.name);
    }
  }
  if (typeof req.body.ageMin != 'undefined' && typeof req.body.ageMax != 'undefined') {
    if (req.body.ageMin >= 0 && req.body.ageMin <= 100
      && req.body.ageMax >= 0 && req.body.ageMax <= 100
      && req.body.ageMin <= req.body.ageMax) {
      // query.gender = req.body.gender;
      if (req.body.ageMin !== 100) {
        if (!query.age) {
          query.age = {};
        }
        query.age['$gte'] = req.body.ageMin;
      }
      if (req.body.ageMax !== 100) {
        if (!query.age) {
          query.age = {};
        }
        query.age['$lte'] = req.body.ageMax;
      }
    }
  }
  Model.find(query, function (err, list) {
    if (err) {
      return utils.sendJSONresponse(res, 200, err);
    }

    return utils.sendJSONresponse(res, 200, list);
  })
};

const getOne = function (req, res) {
  Model.findOne({ _id: req.params.id }, function (err, item) {
    if (err) {
      return utils.sendJSONresponse(res, 200, err);
    }

    return utils.sendJSONresponse(res, 200, item);
  });
};

const deleteOne = function (req, res) {
  Model.remove({
    _id: req.params.id
  }, function (err, item) {
    if (err) {
      return utils.sendJSONresponse(res, 200, err);
    }
    return utils.sendJSONresponse(res, 200, {
      message: 'Delete ok!'
    });
  });
};

const updateOne = function (req, res) {
  Model.findOne({ _id: req.params.id }, function (err, item) {
    if (err) {
      return res.send(err);
    }

    for (const prop in req.body) {
      item[prop] = req.body[prop];
    }

    item.save(function (err, item) {
      if (err) {
        return utils.sendJsonResponse(res, 200, err);
      }
      return utils.sendJsonResponse(res, 200, item);
    });
  });
};

module.exports = {
  addOne: addOne,
  updateOne: updateOne,
  deleteOne: deleteOne,
  getOne: getOne,
  getAll: getAll
}
