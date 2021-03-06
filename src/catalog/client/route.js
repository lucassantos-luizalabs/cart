'use strict';

const Controller = require('./controller');
const Validator = require('./validation');

exports.register = (server, options, next) => {
  // instantiate controller
  const controller = new Controller(server.database);

  server.bind(controller);
  server.route([
    {
      method: 'GET',
      path: '/client',
      config: {
        handler: controller.list,
        validate: Validator.list()
      }
    },
    {
      method: 'GET',
      path: '/client/{id}',
      config: {
        handler: controller.read,
        validate: Validator.read()
      }
    },
    {
      method: 'POST',
      path: '/client',
      config: {
        handler: controller.create,
        validate: Validator.create()
      }
    },
    {
      method: 'PUT',
      path: '/client/{id?}',
      config: {
        handler: controller.update,
        validate: Validator.update()
      }
    },
    {
      method: 'DELETE',
      path: '/client/{id?}',
      config: {
        handler: controller.destroy,
        validate: Validator.destroy()
      }
    }
  ]);

  next();
};

exports.register.attributes = {
  name: 'client',
  version: '1.0.0'
};

