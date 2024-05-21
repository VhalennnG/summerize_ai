'use strict';

/**
 * `is-owner` middleware
 */

module.exports = (config, { strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    strapi.log.info('In is-owner middleware.');

    await next();
  };
};
