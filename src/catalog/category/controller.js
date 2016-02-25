'use strict';

function CategoryController (db) {
  this.database = db;
  this.model = db.Category;
}

CategoryController.prototype = {
  list,
  read,
  create,
  update,
  destroy
};

module.exports = CategoryController;

// [GET] /category
function list (request, reply) {
  this.model
  .scope({
    method: ['user', request.auth.credentials.id]
  })
  .findAndCountAll({
    attributes: ['id', 'description'],
    order: 'description'
  })
  .then((result) => { 
    reply({
      data: result.rows,
      count: result.count
    })
  }).catch((err) => reply.badImplementation(err.message));
}

// [GET] /category/{id}
function read (request, reply) {
  const id = request.params.id;

  this.model
  .scope({
    method: ['user', request.auth.credentials.id]
  })
  .findOne({
    attributes: ['id', 'description'],
    where: {id: id}
  })
  .then((category) => {
    if (!category) {
      return reply.notFound();
    }
    reply(category);
  }).catch((err) => reply.badImplementation(err.message));
}

// [POST] /category
function create (request, reply) {
  let payload = request.payload;
  payload.user = request.auth.credentials.id;

  this.model.create(payload)
  .then((category) => reply(category).code(201))
  .catch((err) => reply.badImplementation(err.message));
}

// [PUT] /category
function update (request, reply) {
  const id = request.params.id;
  const payload = request.payload;

  this.model
  .scope({
    method: ['user', request.auth.credentials.id]
  })
  .findOne({
    where: {id: id}
  })
  .then((category) => {
    if (!category) {
      return reply.notFound();
    }
    return category.update(payload, {where: {id: id}});
  })
  .then(category => reply(category))
  .catch((err) => reply.badImplementation(err.message));
}

// [DELETE] /category
function destroy (request, reply) {
  const id = request.params.id;

  this.model
  .scope({
    method: ['user', request.auth.credentials.id]
  })
  .findOne({
    where: {id: id}
  })
  .then((category) => {
    if (!category) {
      return reply.notFound();
    }
    return category.destroy().then(() => reply())
  }).catch((err) => reply.badImplementation(err.message));
}
