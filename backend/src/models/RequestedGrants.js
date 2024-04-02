const mongoose = require("mongoose");

/**
 * Schema definition for grant details.
 * @typedef {Object} GrantDetails
 * @property {string} email - The name of the granter.

 */
const RequestedGrants = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("grant-details", RequestedGrants);
