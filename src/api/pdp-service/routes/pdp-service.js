'use strict';

/**
 * pdp-service router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::pdp-service.pdp-service');
