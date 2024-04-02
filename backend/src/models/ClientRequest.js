const mongoose = require("mongoose");

/**
 * Schema definition for client requests.
 * @typedef {Object} ClientRequest
 * @property {string} username - The username of the requester.
 * @property {string} email - The email of the requester.
 * @property {string} description - The description of the request.
 * @property {number} requestedAmount - The amount requested by the client.
 */

const clientRequestSchema = new mongoose.Schema({
  granterName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  requestedAmount: {
    type: Number,
    required: true,
  },
  grantStatus: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("ClientRequest", clientRequestSchema);
