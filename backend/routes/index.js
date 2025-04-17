/**
 * Export all route modules
 */
const artistRoutes = require('./artists');
const eventRoutes = require('./events');
const contactRoutes = require('./contact');

module.exports = {
  artistRoutes,
  eventRoutes,
  contactRoutes
};
