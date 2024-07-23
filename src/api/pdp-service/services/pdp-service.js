'use strict';

/**
 * pdp-service service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::pdp-service.pdp-service');
