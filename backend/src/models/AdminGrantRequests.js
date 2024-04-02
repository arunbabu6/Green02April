const mongoose = require('mongoose');

/**
 * Schema definition for admin grant requests.
 * @typedef {Object} AdminGrantRequests
 * @property {Object} id - The ID of the grant request.
 * @property {string} granterName - The name of the granter.
 * @property {string} name - The name of the requester.
 * @property {string} email - The email of the requester.
 * @property {number} grantAmount - The amount of the grant.
 * @property {string} description - The description of the grant request.
 */
const AdminGrantRequests = new mongoose.Schema({
    id: {
        type:Object,
        required: true,
        alias: '_id'   
    },
    granterName:{
        type:String,
        required: true 
    },
    name: {
        type:String,
        required: true        
    },
    email: {
        type:String,
        required: true        
    },
    grantAmount: {
        type:Number,
        required: true        
    },
    description: {
        type:String,
        required: true       
    },
})

module.exports = mongoose.model('admin-client-grant-request', AdminGrantRequests);