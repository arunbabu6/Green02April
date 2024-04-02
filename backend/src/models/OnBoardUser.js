const mongoose = require('mongoose');

/**
 * Schema definition for client requests.
 * @typedef {Object} ClientRequest
 * @property {string} username - The username of the requester.
 * @property {string} email - The email of the requester.
 * @property {string} description - The description of the request.
 * @property {number} requestedAmount - The amount requested by the client.
 */

const OnBoardUser = new mongoose.Schema({
    role:{
        type: String,
        required: true,
    },
    username: {
        type:String,
        required: true    
    },
    email: {
        type:String,
        required: true        
    },
    picture: {
        type:String,
        required: true        
    },
})

module.exports = mongoose.model('OnBoardUser', OnBoardUser);
